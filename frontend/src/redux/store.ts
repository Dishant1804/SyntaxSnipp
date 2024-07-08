import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./slice/posts/postSlice";
import postsWithIdSlice from "./slice/posts/postsWithIdSlice";
import createPostSlice from "./slice/posts/createPostSlice";
import fetchbookmarkSlice from "./slice/bookmark/fetchbookmarkSlice";
import setBookmarkSlice from "./slice/bookmark/setBookmarkSlice";


export const store = configureStore({
  reducer: {
    post: postSlice,
    postWithId: postsWithIdSlice,
    createPost: createPostSlice,
    fetchbookmark: fetchbookmarkSlice,
    setBookmark : setBookmarkSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch       