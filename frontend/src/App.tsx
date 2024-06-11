import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Posts from "./pages/Posts";
import Navbar from "./components/Navbar";
import ExpandedPost from "./pages/ExpandedPost";
import Sidebar from "./components/Sidebar";
import Post from "./pages/Post";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row w-full">
        <div className="md:w-1/4 md:block hidden">
          <Sidebar />
        </div>
        <div className="flex-1">
          <BrowserRouter>
            <Routes>
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/post/:id" element={<ExpandedPost />} />
              <Route path="/createpost" element={<Post />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;