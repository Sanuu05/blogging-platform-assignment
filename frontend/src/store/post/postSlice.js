import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postApiService } from './postApi';

// Async thunks
export const createPost = createAsyncThunk(
  'post/create',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await postApiService.createPost(postData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create post');
    }
  }
);

export const fetchPosts = createAsyncThunk(
  'post/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await postApiService.getAllPosts();
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch posts');
    }
  }
);

export const fetchPostById = createAsyncThunk(
  'post/fetchById',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await postApiService.getPostById(postId);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch post');
    }
  }
);

export const fetchMyPosts = createAsyncThunk(
  'post/fetchMyPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await postApiService.getMyPosts();
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch your posts');
    }
  }
);

export const updatePost = createAsyncThunk(
  'post/update',
  async ({ postId, postData }, { rejectWithValue }) => {
    try {
      const response = await postApiService.updatePost(postId, postData);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update post');
    }
  }
);

export const deletePost = createAsyncThunk(
  'post/delete',
  async (postId, { rejectWithValue }) => {
    try {
      await postApiService.deletePost(postId);
      return postId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete post');
    }
  }
);

const initialState = {
  posts: [],
  myPosts: [],
  selectedPost: null,
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedPost: (state) => {
      state.selectedPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Post
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = [action.payload.data, ...state.posts];
        state.myPosts = [action.payload.data, ...state.myPosts];
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch All Posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Post By Id
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch My Posts
      .addCase(fetchMyPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.myPosts = action.payload;
      })
      .addCase(fetchMyPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Post
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
        state.myPosts = state.myPosts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
        state.selectedPost = action.payload;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Post
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post._id !== action.payload);
        state.myPosts = state.myPosts.filter((post) => post._id !== action.payload);
        if (state.selectedPost?._id === action.payload) {
          state.selectedPost = null;
        }
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSelectedPost } = postSlice.actions;

export default postSlice.reducer; 