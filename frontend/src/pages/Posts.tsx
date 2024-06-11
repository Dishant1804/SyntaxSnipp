import PostCard from "../components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { fetchPosts } from "../redux/slice/posts/postSlice";
import CreatePost from "../components/CreatePost";

const Posts = () => {
  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: RootState) => state.post);

  useEffect(() => {
    if (!state.posts) {
      dispatch(fetchPosts());
    }
  }, []);

  if (state.isLoading) {
    return <div>Loading...</div>;
  }

  if (state.isError) {
    return <div>Error loading posts.</div>;
  }

  return (
      <div className="grid grid-cols-1 p-4 gap-3 md:grid-cols-2 lg:grid-cols-4 h-full w-screen place-items-center">
        <div>
        {state.posts &&
          state.posts.map((post) => {
            return (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                bookmark={post.bookmark}
                authorName={post.author.name || "Anonymous"}
              />
            );
          })}
        </div>
        <div>
          <CreatePost/>
        </div>
      </div>
  );
};

export default Posts;
