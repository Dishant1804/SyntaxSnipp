import { faBookmark, faHeart, faHouse, faSquarePlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = ({ showSidebar, toggleSidebar } : { showSidebar : boolean , toggleSidebar : ()=> void}  ) => {
  return (
    <div className={`fixed z-20 inset-0 overflow-y-auto bg-gray-900 bg-opacity-50 lg:relative lg:bg-transparent lg:block ${showSidebar ? 'block' : 'hidden'}`}>
      <div className="flex flex-col h-screen fixed p-3 w-60 lg:w-64 bg-gray-50 text-gray-800 shadow-md z-[10]">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="flex-none text-2xl font-semibold mt-2" aria-label="Dashboard">Dashboard</h1>
            <button
              className="p-2 lg:hidden"
              onClick={toggleSidebar}
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
          <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
            <ul className="space-y-1.5">
              <li>
                <a className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-base text-gray-700 rounded-lg hover:bg-gray-100" href="#">
                  <FontAwesomeIcon icon={faHouse} className="text-lg" />
                  Home
                </a>
              </li>

              <li className="hs-accordion" id="users-accordion">
                <button type="button" className="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-base text-gray-700 rounded-lg hover:bg-gray-100">
                  <FontAwesomeIcon icon={faBookmark} className="text-lg" />
                  Bookmarks
                </button>
              </li>

              <li className="hs-accordion" id="account-accordion">
                <button type="button" className="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-base text-gray-700 rounded-lg hover:bg-gray-100">
                  <FontAwesomeIcon icon={faUser} className="text-lg" />
                  Account
                </button>

                <div id="account-accordion" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
                </div>
              </li>

              <li className="hs-accordion" id="projects-accordion">
                <button type="button" className="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-base text-gray-700 rounded-lg hover:bg-gray-100">
                  <FontAwesomeIcon icon={faHeart} className="text-lg" />
                  Liked Posts
                </button>

                <div id="projects-accordion" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
                </div>
              </li>

              <li><a className="flex items-center gap-x-3.5 py-2 px-2.5 text-base text-gray-700 rounded-lg hover:bg-gray-100" href="#">
                <FontAwesomeIcon icon={faSquarePlus} className="text-lg" />
                Create Post
              </a></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;