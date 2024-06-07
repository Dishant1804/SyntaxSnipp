import { configureStore } from "@reduxjs/toolkit";
import postSlice  from "./slice/posts/postSlice";
import postsWithIdSlice  from "./slice/posts/postsWithId";


export const store = configureStore({
  reducer:{
    post : postSlice,
    postWithId : postsWithIdSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch       