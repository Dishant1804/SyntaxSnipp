import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Posts from "./pages/Posts"
import Navbar from "./components/Navbar"
import ExpandedPost from "./pages/ExpandedPost"
import Sidebar from "./components/Sidebar"


function App() {

  return (
    <>
      <Navbar />
      <div className="flex flex-row w-full">
        <div className="w-[275px] mr-4">
          <Sidebar />
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/post/:id" element={<ExpandedPost />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
