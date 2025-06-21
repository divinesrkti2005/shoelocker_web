import React, { useEffect, useState } from "react";
import { FaBars, FaHeart, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Get token from local storage
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Decode token (if needed) and set user
        const decodedUser = JSON.parse(atob(token.split(".")[1])); // Decode JWT
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token");
        localStorage.removeItem("token"); // Remove if invalid
      }
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50 border-b border-blue-100">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">SL</span>
            </div>
            <span className="text-2xl font-bold text-blue-800">ShoeLocker</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
          <Link to="/packages" className="text-gray-700 hover:text-blue-600 transition-colors">Sneakers</Link>
          <Link to="/review" className="text-gray-700 hover:text-blue-600 transition-colors">Reviews</Link>
          {user && (
            <Link to="/mybooking" className="text-gray-700 hover:text-blue-600 transition-colors">My Orders</Link>
          )}
          <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
          <Link to="/aboutus" className="text-gray-700 hover:text-blue-600 transition-colors">About Us</Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <Link to="/favorite" className="relative text-gray-700 hover:text-blue-600 transition-colors">
            <FaHeart size={22} />
            {/* <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">3</span> */}
          </Link>

          {/* If user is logged in */}
          {user ? (
            <div className="flex space-x-4">
              <Link to="/myprofile" className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-md text-sm hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-md">My Account</Link>
              <button onClick={handleLogout} className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-700 transition-colors">
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex space-x-3">
              <Link to="/login" className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-md text-sm hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-md">Login</Link>
              <Link to="/register" className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-md text-sm hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-md">Sign Up</Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full py-4 border-b border-blue-100">
          <Link to="/" className="block px-6 py-2 text-gray-700 hover:bg-blue-50 transition-colors">Home</Link>
          <Link to="/packages" className="block px-6 py-2 text-gray-700 hover:bg-blue-50 transition-colors">Sneakers</Link>
          <Link to="/review" className="block px-6 py-2 text-gray-700 hover:bg-blue-50 transition-colors">Reviews</Link>
          {user && (
            <Link to="/mybooking" className="block px-6 py-2 text-gray-700 hover:bg-blue-50 transition-colors">My Orders</Link>
          )}
          <Link to="/contact" className="block px-6 py-2 text-gray-700 hover:bg-blue-50 transition-colors">Contact</Link>
          <Link to="/aboutus" className="block px-6 py-2 text-gray-700 hover:bg-blue-50 transition-colors">About Us</Link>

          {user ? (
            <>
              <Link to="/myprofile" className="block bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-center px-6 py-2 rounded-md text-sm hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 mx-6 mt-2">My Account</Link>
              <button onClick={handleLogout} className="block w-full text-center bg-gray-600 text-white px-6 py-2 rounded-md text-sm hover:bg-gray-700 transition-colors mx-6 mt-2">
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-center px-6 py-2 rounded-md text-sm hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 mx-6 mt-2">Login</Link>
              <Link to="/register" className="block bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-center px-6 py-2 rounded-md text-sm hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 mx-6 mt-2">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
