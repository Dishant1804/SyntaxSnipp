import Sidebar from "./Sidebar";

const Navbar = ({ toggleSidebar, showSidebar } : { toggleSidebar : ()=> void, showSidebar : boolean }) => {
  return (
    <div className="flex">
      <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 z-10 w-full lg:relative">
        <div className="max-w-screen grid grid-cols-3 mx-auto p-3">
          <span className="text-2xl font-semibold whitespace-nowrap pl-0 lg:pl-16 dark:text-white">
            Syntax Snipp
          </span>
          <div className="hidden justify-center md:flex">
            <input
              type="text"
              placeholder="Search..."
              className="rounded-md pl-2 max-w-sm bg-slate-700 text-white"
            />
            <button className="text-white pl-3 hover:underline">Search</button>
          </div>
          <button
            className="flex items-center justify-end lg:hidden col-start-3 "
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-current text-white"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </nav>

      <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Navbar;