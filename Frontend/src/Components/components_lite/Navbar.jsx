import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
      <div className="fixed top-0 left-0 w-full z-50 px-6 py-4">
      
      {/* Glass Black Navbar */}
      <div className="max-w-7xl mx-auto flex items-center justify-between backdrop-blur-xl bg-black/40 border border-white/20 shadow-lg rounded-xl px-6 py-3">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          {/* <img
            src={logo}
            alt="logo"
            className="w-10 h-10 object-contain"
          /> */}
          <span className="text-xl font-semibold text-white">
            Jobtale
          </span>
        </div>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-8 text-gray-200 font-medium">
          <Link to="/" className="hover:text-purple-700 transition">
            Home
          </Link>
          <Link to="/jobb" className="hover:text-purple-700 transition">
            Jobs
          </Link>
          <Link to="/aboutus" className="hover:text-purple-700 transition">
            About Us
          </Link>
          <Link to="/blogs" className="hover:text-purple-700 transition">
            Blogs
          </Link>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-1.5 rounded-lg border border-white/30 bg-white/10 text-white hover:bg-white/20 transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:opacity-90 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>

    
  );
};

export default Navbar;
