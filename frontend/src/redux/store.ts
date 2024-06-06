import { configureStore } from "@reduxjs/toolkit";
import postSlice  from "./slice/posts/postSlice";


export const store = configureStore({
  reducer:{
    post : postSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch       