import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from '../../../config';

interface BookmarkState {
  data: { id: string; bookmark: boolean }[];
}

const initialState: BookmarkState = {
  data: [],
};

export const setBookmark = createAsyncThunk('setBookmark', async ({ id, bookmark }: { id: string, bookmark: boolean }) => {
  await axios.patch(`${BACKEND_URL}/api/v1/post/bookmark`, { id, bookmark }, {
    headers: {
      Authorization: localStorage.getItem('token'),
    }
  })
  return { id, bookmark };
})

const setBookmarkSlice = createSlice({
  name: 'setbookmark',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setBookmark.fulfilled, (state, action: PayloadAction<{ id: string, bookmark: boolean }>) => {
      const index = state.data.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.data[index].bookmark = action.payload.bookmark;
      } else {
        state.data.push(action.payload);
      }
    })
  }
})

export default setBookmarkSlice.reducer;