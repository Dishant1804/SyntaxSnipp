import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../../../config";

export const fetchPostsWithId = createAsyncThunk('fetchPostsWithId', async (id : string) => {
  const response = await axios.get(`${BACKEND_URL}/api/v1/post/${id}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  return response.data;
});

interface singlePost {
  id: string;
  title: string;
  content: string;
  bookmark: boolean;
  author: {
    name: string;
  };
}

interface postWithId {
  isLoading : boolean,
  isError : boolean,
  data : singlePost | null,
}

const PostWithIdInitialState : postWithId = {
    isLoading: false,
    isError: false,
    data: null,
}

export const postsWithIdSlice = createSlice({
  name: 'fetchPostsWithId',
  initialState:PostWithIdInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostsWithId.pending, (state, _action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchPostsWithId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.post
    });
    builder.addCase(fetchPostsWithId.rejected, (state, _action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default postsWithIdSlice.reducer;