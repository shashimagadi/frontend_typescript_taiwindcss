


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useConfirmModal } from "./context/Modals/ConfirmModal";



const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { showModal } = useConfirmModal();

  // const handleLogout = () => {
  //   localStorage.removeItem("authToken");
  //   console.log("Token removed:", localStorage.getItem("authToken"));
  //   navigate("/"); // Redirect to login page
  // };
  const handleLogout = () => {
    showModal("Are you sure you want to logout?", () => {
      localStorage.removeItem("authToken");
      navigate("/");
    });
  };

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white p-4 shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* App Name (Remove if not needed) */}
          <Link to='/home' className="text-xl font-bold">
            User Info
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/userDetails" className="p-2 hover:bg-gray-700 rounded text-white">
              UserDetails
            </Link>
            <Link to="/userForm" className="p-2 hover:bg-gray-700 rounded text-white">
              Create User
            </Link>

            {/* Admin Icon & Logout */}
            <div className="flex items-center space-x-4">
              <UserCircleIcon className="h-6 w-6 cursor-pointer hover:text-gray-400" />
              <button
                className="flex items-center bg-red-600 px-3 py-1 rounded-md hover:bg-red-700"
                onClick={handleLogout}
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" /> Logout
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation (Slide Down Menu) */}
        {/* {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-gray-800 text-white p-4 shadow-lg">
            <div className="flex flex-col space-y-3">
              <Link to="/userDetails" className="p-2 hover:bg-gray-700 rounded">
                UserDetails
              </Link>
              <Link to="/userForm" className="p-2 hover:bg-gray-700 rounded">
                Create User
              </Link>

              <div className="flex flex-col space-y-2 mt-2">
                <UserCircleIcon className="h-6 w-6 cursor-pointer hover:text-gray-400 mx-auto" />
                <button
                  className="flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  onClick={handleLogout}
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" /> Logout
                </button>
              </div>
            </div>
          </div>
        )} */}
  {isOpen && (
  <div className="md:hidden absolute top-full left-0 w-full bg-gray-800 text-white p-4 shadow-lg">
    <div className="w-64">
      <div className="flex flex-col space-y-3">
        <Link to="/userDetails" className="p-2 hover:bg-gray-700 rounded">
          UserDetails
        </Link>
        <Link to="/userForm" className="p-2 hover:bg-gray-700 rounded">
          Create User
        </Link>

        {/* Admin Icon & Logout */}
        <div className="flex flex-col space-y-2 mt-2">
          <div className="flex items-center space-x-2 mb-3">
            <UserCircleIcon className="h-6 w-6 cursor-pointer hover:text-gray-400" />
            <span>Admin</span>
          </div>
          <button
            className="flex items-center bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 w-fit "
            onClick={handleLogout}
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" /> Logout
          </button>
        </div>
      </div>
    </div>
  </div>
)}
      </nav>

      {/* Add padding to push content below navbar */}
      <div className="pt-16"></div>
    </>
  );
};

export default Navbar;
