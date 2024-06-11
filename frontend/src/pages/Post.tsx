const Post = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full px-4 md:w-5/6">
        <div className="flex flex-col w-full sm:w-3/4 md:w-2/3 mt-8">
          <label htmlFor="title" className="text-2xl pl-2">
            Title
          </label>
          <input
            type="text"
            placeholder="Title"
            maxLength={100}
            className="rounded-md h-[50px] w-full px-4 text-black border border-slate-500"
          />
        </div>
        <div className="flex flex-col mt-4 w-full sm:w-3/4 md:w-2/3">
          <label htmlFor="description" className="text-2xl pl-2">
            Description
          </label>
          <textarea
            rows={2}
            placeholder="Description"
            maxLength={200}
            className="p-2 rounded-md h-[75px] w-full px-4 text-black border border-slate-500 resize-none"
          />
        </div>
        <div className="flex flex-col mt-4 w-full sm:w-3/4 md:w-2/3">
          <label htmlFor="content" className="text-2xl pl-2">
            Content
          </label>
          <textarea
            maxLength={10000}
            placeholder="Write the code Snippet here..."
            className="p-2 rounded-md h-[400px] w-full px-4 text-black border border-slate-500 resize-none"
          />
        </div>
        <button className="w-full sm:w-3/4 md:w-2/3 mt-4 bg-gray-800 text-white p-1 rounded-md">
          Publish
        </button>
      </div>
    </>
  );
};

export default Post;