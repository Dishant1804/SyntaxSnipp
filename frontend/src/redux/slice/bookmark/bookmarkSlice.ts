import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../../../config";

interface Data {
  bookmark: boolean;
  id: string;
}

export const setBookmark = createAsyncThunk('bookmark/setBookmark', async (data: Data) => {
  const response = await axios.patch(`${BACKEND_URL}/api/v1/post`, data, {
    headers: {
      Authorization: localStorage.getItem("token"),
    }
  });
  console.log('Response from backend:', response.data);
  return response.data;
});

interface InitialState {
  data: Data[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  data: [],
  loading: false,
  error: null,
};

export const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setBookmark.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setBookmark.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.data[index].bookmark = action.payload.bookmark;
        } else {
          state.data.push(action.payload);
        }
      })
      .addCase(setBookmark.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to set bookmark';
      });
  },
});

export default bookmarkSlice.reducer;
