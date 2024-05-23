import React from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { isLoggedIn, user, toggleSidebar } = useAuth();

  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
      <div className="flex items-center">
        {/* Toggle sidebar button for mobile screen */}
        {isLoggedIn && (
          <div className="block lg:hidden mx-4 mt-2">
            <button
              onClick={toggleSidebar}
              className="text-white focus:outline-none"
            >
              <FaBars size={24} />
            </button>
          </div>
        )}
        <div className="flex items-center flex-shrink-0 text-white mr-6 uppercase">
          <Link to="/" className="font-semibold text-xl tracking-tight">
            Vehicle App
          </Link>
        </div>
      </div>

      <div className="flex items-center w-auto">
        <div className="text-sm flex-grow"></div>
        {!isLoggedIn ? (
          <>
            <div className="ml-4">
              <Link
                to="/login"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0"
              >
                Login
              </Link>
            </div>
            <div className="ml-4">
              <Link
                to="/signup"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0"
              >
                Register
              </Link>
            </div>
          </>
        ) : (
          <div className="ml-4">
            <Link className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0">
              {user.username}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
