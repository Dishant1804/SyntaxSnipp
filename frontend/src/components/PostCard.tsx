import { faBookmark as faBookmarkRegular, faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as faBookmarkSolid, faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchPostsWithId } from "../redux/slice/posts/postsWithIdSlice";
import { setBookmark } from "../redux/slice/bookmark/bookmarkSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface PostcardProps {
  id: string,
  title: string,
  bookmark: boolean,
  authorName: string,
  description: string,
}

const PostCard = ({ id, title, description, bookmark }: PostcardProps) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const bookmarkData = useSelector((state: RootState) => state.bookmark.data);
  const isBookmarked = bookmarkData.find((b) => b.id === id)?.bookmark || bookmark;

  useEffect(() => {
    console.log(`Post ${id} bookmark status: ${isBookmarked}`);
  }, [isBookmarked, id]);

  const handleDivClick = () => {
    dispatch(fetchPostsWithId(id));
    navigate(`/post/${id}`);
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    setIsLiked(!isLiked);
    e.stopPropagation();
  }

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setBookmark({ bookmark: !isBookmarked, id }));
  }

  return (
    <div onClick={handleDivClick} className="max-w-sm w-full h-full p-6 bg-white border hover:shadow-lg hover:shadow-slate-400 duration-200 cursor-pointer border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
      <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h5>
      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{description}</p>
      <div className="mt-auto flex justify-end items-center">
        <div className="flex">
          <FontAwesomeIcon
            icon={isLiked ? faHeartSolid : faHeartRegular}
            onClick={handleHeartClick}
            className={`text-white p-2 rounded-md hover:text-red-500 duration-200 ${isLiked ? 'text-red-500' : ''}`}
          />
          <FontAwesomeIcon
            icon={isBookmarked ? faBookmarkSolid : faBookmarkRegular}
            onClick={handleBookmarkClick}
            className={`text-white p-2 rounded-md hover:text-blue-500 duration-200 ${isBookmarked ? 'text-blue-500' : ''}`}
          />
        </div>
      </div>
    </div>
  );
}

export default PostCard;
