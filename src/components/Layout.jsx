import { Link } from "react-router-dom";

const A_TAG =
  "font-bold p-2 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-103 transition duration-300 ease-in-out";

export default ({ children, className, ...rest }) => {
  return (
    <div className={`flex flex-col min-h-screen ${className}`} {...rest}>
      <header className="sticky top-0 z-10 flex flex-row justify-between bg-gray-800 text-white p-4">
        <h1 className="text-lg font-bold">Employee Management</h1>
        <div className="flex items-center gap-2 justify-center text-black">
          <Link to="/add" className={`bg-amber-400 ${A_TAG}`}>
            Add Employee
          </Link>
          <Link to="/list" className={`bg-lime-400 ${A_TAG}`}>
            See All Employees
          </Link>
        </div>
      </header>
      <main className="flex-grow p-4 overflow-y-auto">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; {new Date().getFullYear()} Employee Management System
      </footer>
    </div>
  );
};