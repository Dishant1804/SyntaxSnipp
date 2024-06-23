import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./slice/posts/postSlice";
import postsWithIdSlice from "./slice/posts/postsWithIdSlice";
import createPostSlice  from "./slice/posts/createPostSlice";
import bookmarkSlice from "./slice/bookmark/bookmarkSlice";


export const store = configureStore({
  reducer: {
    post: postSlice,
    postWithId: postsWithIdSlice,
    createPost: createPostSlice,
    bookmark : bookmarkSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch       