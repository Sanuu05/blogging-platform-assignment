import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Create axios instance with default config
const postApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
postApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const postApiService = {
  // Create a new post
  createPost: (postData) => {
    return postApi.post('/posts', postData);
  },

  // Get all posts
  getAllPosts: () => {
    return postApi.get('/posts');
  },

  // Get a post by id
  getPostById: (postId) => {
    return postApi.get(`/posts/${postId}`);
  },

  // Get user's posts
  getMyPosts: () => {
    return postApi.get('/posts/my-posts');
  },

  // Update a post
  updatePost: (postId, postData) => {
    return postApi.put(`/posts/${postId}`, postData);
  },

  // Delete a post
  deletePost: (postId) => {
    return postApi.delete(`/posts/${postId}`);
  },
}; 