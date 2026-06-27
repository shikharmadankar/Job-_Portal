import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-4">
      {/* Glass Black Navbar */}
      <div className="max-w-7xl mx-auto flex items-center justify-between backdrop-blur-xl bg-black/40 border border-white/20 shadow-lg rounded-xl px-4 md:px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xl font-bold text-white tracking-tight">
            Jobtale
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-gray-200 font-medium">
          <Link to="/" className="hover:text-purple-400 transition">
            Home
          </Link>
          <Link to="/jobb" className="hover:text-purple-400 transition">
            Jobs
          </Link>
          <Link to="/aboutus" className="hover:text-purple-400 transition">
            About Us
          </Link>
          <Link to="/blogs" className="hover:text-purple-400 transition">
            Blogs
          </Link>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
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

        {/* Mobile Toggle Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-purple-400 transition p-1"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 backdrop-blur-2xl bg-black/90 border border-white/20 shadow-2xl rounded-2xl p-6 flex flex-col gap-6 animate-fade-in">
          <div className="flex flex-col gap-4 text-gray-200 font-medium">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="hover:text-purple-400 transition py-2 border-b border-white/10"
            >
              Home
            </Link>
            <Link
              to="/jobb"
              onClick={() => setIsOpen(false)}
              className="hover:text-purple-400 transition py-2 border-b border-white/10"
            >
              Jobs
            </Link>
            <Link
              to="/aboutus"
              onClick={() => setIsOpen(false)}
              className="hover:text-purple-400 transition py-2 border-b border-white/10"
            >
              About Us
            </Link>
            <Link
              to="/blogs"
              onClick={() => setIsOpen(false)}
              className="hover:text-purple-400 transition py-2"
            >
              Blogs
            </Link>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 rounded-xl border border-white/30 bg-white/10 text-white hover:bg-white/20 transition font-medium"
            >
              Login
            </Link>

            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:opacity-90 transition font-bold"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
