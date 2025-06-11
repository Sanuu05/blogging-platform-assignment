import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import BlogCard from '../components/BlogCard';
import PostModal from '../components/PostModal';
import { fetchPosts, updatePost, deletePost } from '../store/post/postSlice';

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleEdit = (post) => {
    setSelectedPost(post);
    setEditModalOpen(true);
  };

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost(postId));
    }
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setSelectedPost(null);
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '60vh' 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error.message}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom
        sx={{ 
          fontWeight: 600,
          mb: 4,
          color: 'text.primary',
        }}
      >
        All Posts
      </Typography>

      {posts.length === 0 ? (
        <Typography variant="h6" color="text.secondary" align="center">
          No posts found
        </Typography>
      ) : (
        posts.map((post) => (
          <BlogCard
            key={post._id}
            post={post}
            isAuthor={post.author._id === user?._id}
            onEdit={() => handleEdit(post)}
            onDelete={handleDelete}
          />
        ))
      )}

      <PostModal
        open={editModalOpen}
        handleClose={handleCloseModal}
        initialData={selectedPost}
      />
    </Container>
  );
};

export default Posts;