import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Posts from "./pages/Posts";
import Navbar from "./components/Navbar";
import ExpandedPost from "./pages/ExpandedPost";
import Sidebar from "./components/Sidebar";
import Post from "./pages/Post";
import { useState } from "react";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <BrowserRouter>
      <Navbar toggleSidebar={toggleSidebar} showSidebar={showSidebar} />
      <div className="flex flex-row w-screen overflow-hidden">
        <div className="hidden lg:flex w-1/6 mr-4">
          <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
        </div>
        <div className="flex justify-center lg:w-5/6 w-full">
          <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/post/:id" element={<ExpandedPost />} />
            <Route path="/createpost" element={<Post />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;