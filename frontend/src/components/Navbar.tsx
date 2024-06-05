/**
 * change the colours 
 */

const Navbar = () => {
  return <>
    <nav className="bg-white border-gray-200 dark:bg-gray-900 sticky top-0 ">
      <div className="max-w-screen grid grid-cols-3 mx-auto p-3">
        <span className="text-2xl font-semibold whitespace-nowrap pl-0 lg:pl-16 dark:text-white">Syntax Snipp</span>
        <div className="hidden justify-center md:flex ">
          <input type="text" placeholder="Search..." className="rounded-md pl-2 max-w-sm bg-slate-700 text-white " />
          <button className="text-white pl-3 hover:underline ">Search</button>
        </div>
      </div>
    </nav>

  </>
}

export default Navbar