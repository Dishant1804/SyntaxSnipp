import { faBookmark, faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { BACKEND_URL } from "../config";
import ExpandedPost from "../pages/ExpandedPost";
import { Link, useNavigate } from "react-router-dom";

interface PostcardProps {
  title: string,
  content: string,
  bookmark: boolean,
  id: string,
  authorName: string,
}

const PostCard = ({ title, content, bookmark, authorName, id }: PostcardProps) => {

  const handleDivClick = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/post/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  return <>
    <div onClick={handleDivClick} className="max-w-sm w-full h-full p-6 bg-white border hover:shadow-lg hover:shadow-slate-400 duration-200 cursor-pointer border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h5>
      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{content}</p>
      <div className="mt-8 flex flex-row-reverse items-center ">
        <div>
          <FontAwesomeIcon icon={faHeart} className="text-white m-3 rounded-md hover:bg-white/15 duration-200" />
          <FontAwesomeIcon icon={faBookmark} className="text-white m-3 rounded-md hover:bg-white/15 duration-200" />
        </div>
      </div>
    </div>
  </>
}

export default PostCard;