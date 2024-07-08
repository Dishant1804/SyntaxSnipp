import PostCard from "../components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { fetchPosts } from "../redux/slice/posts/postSlice";

const Posts = () => {
  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: RootState) => state.post);

  useEffect(() => { 
    if (!state.posts) {
      dispatch(fetchPosts());
    }
  }, [dispatch, state.posts]);

  if (state.isLoading) {
    return <div>Loading...</div>;
  }

  if (state.isError) {
    return <div>Error loading posts.</div>;
  }

  return (
    <div className="mt-4 flex flex-col justify-center items-center h-full w-screen ">
      {state.posts &&
        state.posts.map((post) => {
          return (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              description={post.description}
              authorName={post.author.name || "Anonymous"}
            />
          );
        })}
    </div>
  );
};

export default Posts;
