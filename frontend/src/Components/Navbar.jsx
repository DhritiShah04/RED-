import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../public/Images/logo.jpg";
import axios from "axios";
import config from '../config.js';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [buyerDetails, setBuyerDetails] = useState(null); // State to store buyer details
  const location = useLocation(); // Get current location to check active path

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const buyer_id = localStorage.getItem("buyer_id");
    const token = localStorage.getItem("token");
      axios
        .get(`${config.API_BASE_URL}/buyers/${buyer_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Add token in Authorization header
          },
        })
        .then((response) => {
          setBuyerDetails(response.data); 
          console.log(response.data); // Log the buyer details to console
        })
        .catch((error) => {
          console.error("Error fetching buyer details:", error);
        });
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
    <nav className="bg-gradient-to-r from-green-900 to-black border-gray-200 dark:bg-green-950 shadow-md relative z-50">
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
              <Link to="/" className={`hover:text-blue-500 ${isActive('/')}`}>Home</Link>
            </li>
            <li>
              <Link to="/aboutus" className={`hover:text-blue-500 ${isActive('/aboutus')}`}>About Us</Link>
            </li>
            <li>
              <Link to="/shopping" className={`hover:text-blue-500 ${isActive('/shopping')}`}>Shopping</Link>
            </li>
          </ul>
        </div>

        {/* RIGHT: Cart, Wishlist, Profile/Login */}
        <div className="flex items-center gap-6">
          {/* Cart */}
          <Link to="/cart">
            <i className="fa-solid fa-cart-shopping text-2xl text-white"></i>
          </Link>

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
                  <span className="w-10 h-10 text-white text-2xl">🌳</span> {/* Tree emoji */}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg z-50 divide-y divide-gray-100 dark:divide-gray-600">
                    <div className="px-4 py-3">
                      {/* Show buyer's name and email if buyerDetails is available */}
                      {buyerDetails ? (
                        <>
                          <span className="block text-sm text-gray-900 dark:text-white">{buyerDetails.buyer_name}</span>
                          <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{buyerDetails.buyer_email}</span>
                        </>
                      ) : (
                        // Fallback if buyerDetails is not yet available
                        <>
                          <span className="block text-sm text-gray-900 dark:text-white">Loading...</span>
                          <span className="block text-sm text-gray-500 truncate dark:text-gray-400">Please wait...</span>
                        </>
                      )}
                    </div>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("buyer_id"); // Remove buyer_id as well
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
                  Log In / Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
