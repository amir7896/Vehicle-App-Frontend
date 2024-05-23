import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaChartLine,
  FaSignOutAlt,
  FaCar,
  FaClipboard,
  FaTimes,
} from "react-icons/fa";
import LocalStorage from "../../managers/LocalStorage";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/logo/Car.jpg";

const Sidebar = () => {
  const user = LocalStorage.getUser();
  const { signout, isSidebarOpen, setIsSidebarOpen, toggleSidebar } = useAuth();

  const handleLogout = () => {
    signout();
    setIsSidebarOpen(false);
    toast.success("Logout successfully");
  };

  const linkClasses =
    "text-white hover:text-blue-500 hover:bg-gray-700 px-4 py-2 block flex items-center mb-4";
  const activeLinkClasses = "bg-blue-500 text-white";

  return (
    <div
      className={`fixed lg:relative bg-gray-800 h-full w-64 lg:w-48 flex flex-col transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 transition-transform duration-200 ease-in-out z-50`}
    >
      <div className="lg:hidden p-4 text-right">
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          <FaTimes size={24} />
        </button>
      </div>
      {/* Logo */}
      <div className="flex justify-center items-center mt-3">
        <img src={logo} alt="Logo" className="h-16 w-20" />
      </div>
      {/* Dashboard */}
      <div className="mt-2">
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
              }
            >
              <FaChartLine className="mr-2" />
              Dashboard
            </NavLink>
          </li>
        </ul>
      </div>
      {/* Categories */}
      <div className="mt-2">
        <ul>
          <li>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
              }
            >
              <FaClipboard className="mr-2" />
              Categories
            </NavLink>
          </li>
        </ul>
      </div>
      {/* Vehicles */}
      <div className="mt-2">
        <ul>
          <li>
            <NavLink
              to="/vehicles"
              className={({ isActive }) =>
                isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
              }
            >
              <FaCar className="mr-2" />
              Vehicles
            </NavLink>
          </li>
        </ul>
      </div>
      {user && (
        <div className="mt-auto justify-center items-center">
          <ul>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
                }
                onClick={handleLogout}
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
