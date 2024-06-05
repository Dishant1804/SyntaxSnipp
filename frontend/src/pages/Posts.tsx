import PostCard from "../components/PostCard";
import Sidebar from "../components/Sidebar";
import { usePosts } from '../hooks/usePosts'


const Posts = () => {
  const { skeleton, posts } = usePosts();

  if (skeleton) {
    return <div>
      Loading...
    </div>
  }

  return <div className="flex flex-row w-full  ">
    <div className="w-[275px] mr-4 ">
      <Sidebar />
    </div>
    <div className="grid grid-cols-1 p-4 gap-3 md:grid-cols-2 lg:grid-cols-4 h-screeb w-screen place-items-center ">
      {posts.map((post) => <PostCard
        key={post.id}
        id={post.id}
        title={post.title}
        content={post.content}
        bookmark={post.bookmark}
        authorName={post.author.name || "Anonymous"}
      />)}
    </div>
  </div>
}

export default Posts;