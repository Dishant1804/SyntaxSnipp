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
      <div className="flex flex-row w-screen overflow-x-hidden">
        <div className="w-1/6 mr-4">
          <Sidebar />
        </div>
        <div className="flex w-5/6">
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
      </div >
    </>
  );
}

export default App;