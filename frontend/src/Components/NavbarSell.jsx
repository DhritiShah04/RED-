import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../public/Images/logo.jpg";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation(); // Get current location to check active path

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path ? "text-blue-500" : "text-gray-700 dark:text-white";

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-md relative z-50">
      <div className="max-w-screen-xl w-full px-8 flex items-center justify-between py-4">
        {/* LEFT: Logo + Nav Links */}
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center space-x-4 rtl:space-x-reverse">
            <img src={logo} className="h-16 w-19" alt="Logo" />
            <span className="text-3xl font-semibold whitespace-nowrap dark:text-white">
              ECO-CART
            </span>
          </Link>

          <ul className="hidden md:flex gap-8 text-lg font-medium">
            <li>
              <Link to="/seller/dashboard" className={`hover:text-blue-500 ${isActive('/')}`}>Dashboard</Link>
            </li>
            <li>
              <Link to="/seller/add-product" className={`hover:text-blue-500 ${isActive('/aboutus')}`}>Add Products</Link>
            </li>
            <li>
              <Link to="/seller/stats" className={`hover:text-blue-500 ${isActive('/shopping')}`}>Statistics</Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-6">
          {/* Profile or Auth Buttons */}
          <div className="relative" ref={dropdownRef}>
            {isAuthenticated ? (
              <>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-10 h-10 rounded-full"
                    src="/docs/images/people/profile-picture-3.jpg"
                    alt="user"
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg z-50 divide-y divide-gray-100 dark:divide-gray-600">
                    <div className="px-4 py-3">
                      <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                      <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                        name@flowbite.com
                      </span>
                    </div>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                      <li>
                        <button
                          onClick={() => {
                            localStorage.removeItem("token");
                            setIsAuthenticated(false);
                            setDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Log out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div className="flex gap-4">
                <Link
                  to="/login"
                  className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="text-white border border-blue-600 hover:bg-blue-600 px-4 py-2 rounded-md"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
