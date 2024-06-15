import { faBookmark, faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchPostsWithId } from "../redux/slice/posts/postsWithIdSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

interface PostcardProps {
  id: string,
  title: string,
  content: string,
  bookmark: boolean,
  authorName: string,
  description : string,
}

const PostCard = ({ title, content, bookmark, authorName, id , description}: PostcardProps) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: RootState) => state.postWithId);

  const handleDivClick = () => {
    dispatch(fetchPostsWithId(id))
    navigate(`/post/${id}`);

  };

  const handleHeartClick = (e: any) => {
    console.log("Liked")
    e.stopPropagation();
  }

  const handleBookmarkClick = (e: any) => {
    console.log("Bookmark clicked")
    e.stopPropagation();
  }

  return <div onClick={handleDivClick} className="max-w-sm w-full h-full p-6 bg-white border hover:shadow-lg hover:shadow-slate-400 duration-200 cursor-pointer border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h5>
    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{description}</p>
    <div className="mt-auto flex justify-end items-center ">
      <div>
        <FontAwesomeIcon icon={faHeart} onClick={handleHeartClick} className="text-white p-2 rounded-md hover:bg-white/15 duration-200" />
        <FontAwesomeIcon icon={faBookmark} onClick={handleBookmarkClick} className="text-white p-2 rounded-md hover:bg-white/15 duration-200" />
      </div>
    </div>
  </div>
}

export default PostCard;