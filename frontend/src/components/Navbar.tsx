import { useState } from 'react';

const NavbarWithSidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

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

      <div className={`fixed z-20 inset-0 overflow-y-auto bg-gray-900 bg-opacity-50 lg:relative lg:bg-transparent lg:block ${showSidebar ? 'block' : 'hidden'}`}>
        <div className="flex flex-col h-screen fixed p-3 w-60 lg:w-64 bg-gray-50 text-gray-800 shadow-md z-[10]">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Dashboard</h2>
              <button
                className="p-2 lg:hidden"
                onClick={() => setShowSidebar(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current text-gray-800"
                >
                  <rect width="352" height="32" x="80" y="96"></rect>
                  <rect width="352" height="32" x="80" y="240"></rect>
                  <rect width="352" height="32" x="80" y="384"></rect>
                </svg>
              </button>
            </div>
            <div className="flex-1">
              <ul className="pt-2 pb-4 space-y-1 text-sm">
                {/* ... */}
              </ul>
            </div>
          </div>
          <div className="flex items-center p-2 mt-12 space-x-4 justify-self-end">
            <img
              src="https://source.unsplash.com/100x100/?portrait"
              alt=""
              className="w-12 h-12 rounded-lg bg-gray-500"
            />
            <div>
              <h2 className="text-lg font-semibold">Leroy Jenkins</h2>
              <span className="flex items-center space-x-1">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs hover:underline text-gray-600"
                >
                  View profile
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarWithSidebar;
