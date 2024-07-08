import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_URL } from '../../../config';

interface BookmarkState {
  data: { id: string; bookmark: boolean }[];
}

const initialState: BookmarkState = {
  data: [],
};

export const fetchBookmarks = createAsyncThunk(
  'bookmarks/fetchBookmarks',
  async (userId: string) => {
    const response = await axios.get(`${BACKEND_URL}/api/v1/post/bookmarks`, { params: { userId } , headers : {
      Authorization : localStorage.getItem('token'),
    } });
    return response.data as { id: string; bookmark: boolean }[];
  }
);

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBookmarks.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default bookmarkSlice.reducer;
