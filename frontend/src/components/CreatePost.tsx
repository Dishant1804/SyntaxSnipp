import { useNavigate } from "react-router-dom";


const CreatePost = () => {
  const navigate = useNavigate();
  const handleClick = () =>{
    navigate("/createpost");
  }

  return <button className="absolute bottom-0 right-0 p-4" onClick={handleClick}>    
    create post 
  </button>
}

export default CreatePost;