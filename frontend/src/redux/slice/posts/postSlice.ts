import { createAsyncThunk, createSlice  } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../../../config";

export const fetchPosts = createAsyncThunk('fetchPosts', async () => {
  const response = await axios.get(`${BACKEND_URL}/api/v1/post/bulk`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    }
  });
  return response.data;
});

interface singlePost {
  id: string;
  title: string;
  content: string;
  description: string;
  bookmark: boolean;
  author: {
    name: string;
  };
}

interface PostState {
  isLoading: boolean;
  isError: boolean;
  posts: singlePost[] | null;
}

const initialState: PostState = {
  isLoading: false,
  isError: false,
  posts: null,
};

export const postSlice = createSlice({
  name: 'posts',
  initialState : initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload.posts;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  }
});

export default postSlice.reducer;
