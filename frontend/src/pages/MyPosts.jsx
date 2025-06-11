import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import BlogCard from '../components/BlogCard';
import PostModal from '../components/PostModal';
import { fetchMyPosts, updatePost, deletePost } from '../store/post/postSlice';

const MyPosts = () => {
  const dispatch = useDispatch();
  const { myPosts, loading, error } = useSelector((state) => state.post);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    dispatch(fetchMyPosts());
  }, [dispatch]);

  const handleEdit = (post) => {
    console.log('Edit clicked for post:', post); // Debug log
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
        My Posts
      </Typography>

      {myPosts.length === 0 ? (
        <Typography variant="h6" color="text.secondary" align="center">
          You haven't created any posts yet
        </Typography>
      ) : (
        myPosts.map((post) => (
          <BlogCard
            key={post._id}
            post={post}
            onEdit={() => handleEdit(post)}
            onDelete={handleDelete}
            isAuthor={true}
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

export default MyPosts;