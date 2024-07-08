import { fetchPostsWithId } from "../redux/slice/posts/postsWithIdSlice";
import { useDispatch} from "react-redux";
import { AppDispatch} from "../redux/store";
import { useNavigate } from "react-router-dom";

interface PostcardProps {
  id: string,
  title: string,
  authorName: string,
  description: string,
}

const PostCard = ({ id, title, description }: PostcardProps) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleDivClick = () => {
    dispatch(fetchPostsWithId(id));
    navigate(`/post/${id}`);
  };

  return (
    <div onClick={handleDivClick} className="max-w-4xl w-full h-[100px] p-6 my-1 bg-white border hover:shadow-lg hover:shadow-slate-400 duration-200 cursor-pointer border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
      <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h5>
      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
}

export default PostCard;
