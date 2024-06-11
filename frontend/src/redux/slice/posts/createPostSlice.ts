import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../../../config";

export const sendPost = createAsyncThunk('sendPost' , async (data : PostData)=>{
  const response = await axios.post(`${BACKEND_URL}/api/v1/post` , data , {
    headers : {
      Authorization : localStorage.getItem("token")
    }
  })
  return response.data;
})


export interface PostData {
  title : string;
  content : string;
  description : string;
}

interface InitialState {
  isError : boolean;
  isLoading : boolean;
  data : PostData | null;
}

const initialState : InitialState = {
  isError : false,
  isLoading : false,
  data : null,
}

export const createPostSlice = createSlice({
  name : 'createpost',
  initialState: initialState,
  reducers : {},
  extraReducers : (builder) =>[
    builder.addCase(sendPost.pending , (state , _action)=>{
      state.isLoading = true;
    }),
    builder.addCase(sendPost.fulfilled , (state , action)=>{
      state.data = action.payload;
    }),
    builder.addCase(sendPost.rejected , (state , _action)=>{
      state.isError = true;
    })
  ]
})

export default createPostSlice.reducer ;
