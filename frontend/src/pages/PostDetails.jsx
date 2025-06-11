import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
  Avatar,
  Chip,
  Divider,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { formatDistanceToNow, format } from 'date-fns';
import { fetchPostById } from '../store/post/postSlice';

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedPost: post, loading, error } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [dispatch, id]);

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

  if (!post) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="info">Post not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back to Posts
      </Button>

      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar 
            sx={{ 
              bgcolor: 'primary.main',
              width: 50,
              height: 50,
              mr: 2,
            }}
          >
            {post.author?.name?.charAt(0) || 'A'}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {post.author?.name || 'Anonymous'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })} • {format(new Date(post.createdAt), 'MMMM d, yyyy')}
            </Typography>
          </Box>
        </Box>

        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 600,
            mb: 3,
            color: 'text.primary',
          }}
        >
          {post.title}
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Chip 
            label="Blog" 
            color="primary" 
            variant="outlined" 
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography 
          variant="body1" 
          sx={{ 
            lineHeight: 1.8,
            whiteSpace: 'pre-wrap',
          }}
        >
          {post.content}
        </Typography>
      </Box>
    </Container>
  );
};

export default PostDetails; 