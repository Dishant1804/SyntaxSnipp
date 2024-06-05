import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

interface Posts {
  title : string,
  content : string,
  bookmark : true,
  id : string
  author : {
    name : string
  }
}

export const usePosts = () => {
  const [skeleton, setSkeleton] = useState<boolean>(true);
  const [posts, setPosts] = useState<Posts[]>([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/post/bulk` , {
      headers : {
        Authorization : localStorage.getItem("token")
      }
    })
      .then(response => {
        setPosts(response.data.posts);
        setSkeleton(false);
      })
  }, [])

  return {skeleton , posts}
}

