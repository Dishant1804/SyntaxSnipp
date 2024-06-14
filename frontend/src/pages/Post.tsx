import { useDispatch } from "react-redux";
import { sendPost } from "../redux/slice/posts/createPostSlice";
import { useState } from "react";
import { PostData } from "../redux/slice/posts/createPostSlice";
import { AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import MDEditor, { commands } from "@uiw/react-md-editor";

const Post = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleTitle = (e: any) => {
    setTitle(e.target.value);
  };
  const handleDescription = (e: any) => {
    setDescription(e.target.value);
  };
  const handleContent = (value?: string) => {
    setContent(value || "");
  };

  const handleClick = () => {
    if (!title || !description || !content) {
      setError("All fields are required.");
      return;
    }
    const postData: PostData = {
      title,
      description,
      content,
    };
    dispatch(sendPost(postData));
    setTitle("");
    setContent("");
    setDescription("");
    setError("");
    navigate("/posts");
  };

  const customCommands = [
    commands.bold,
    commands.codeBlock,
    commands.comment,
    commands.code,
    commands.quote,
  ];

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full px-4 md:w-5/6">
        <div className="flex flex-col w-full sm:w-3/4 md:w-2/3 mt-8">
          <label htmlFor="title" className="text-2xl pl-2">
            Title
          </label>
          <input
            onChange={handleTitle}
            required
            type="text"
            placeholder="Title"
            maxLength={100}
            className="rounded-md h-[50px] w-full px-4 text-black border border-slate-500"
            value={title}
          />
        </div>
        <div className="flex flex-col mt-4 w-full sm:w-3/4 md:w-2/3">
          <label htmlFor="description" className="text-2xl pl-2">
            Description
          </label>
          <textarea
            onChange={handleDescription}
            rows={2}
            placeholder="Description"
            maxLength={200}
            className="p-2 rounded-md h-[75px] w-full px-4 text-black border border-slate-500 resize-none"
            value={description}
          />
        </div>
        <div className="flex flex-col mt-4 w-full sm:w-3/4 md:w-2/3">
          <label htmlFor="content" className="text-2xl pl-2">
            Content
          </label>
          <MDEditor
            value={content}
            onChange={handleContent}
            height={400}
            commands={customCommands}
            textareaProps={{
              placeholder: "Enter the code snippet here",
              maxLength: 10000
            }}
            className="rounded-md border border-slate-500"
          />
        </div>
        {error && (
          <div className="text-red-500 text-center mt-4">{error}</div>
        )}
        <button
          className="w-full sm:w-3/4 md:w-2/3 mt-4 bg-gray-800 text-white p-1 rounded-md"
          onClick={handleClick}
        >
          Publish
        </button>
      </div>
    </>
  );
};

export default Post;
