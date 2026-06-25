import React from 'react'
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <div>
      <footer className="bg-[#0B0B3B] text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">

        {/* COMPANY INFO */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">
            JobPortal
          </h2>
          <p className="text-sm mb-4">
            Connecting talent with the right opportunities. Find jobs, hire talent,
            and grow your career with us.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-4 mt-4">
            <Facebook className="cursor-pointer hover:text-white" />
            <Twitter className="cursor-pointer hover:text-white" />
            <Instagram className="cursor-pointer hover:text-white" />
            <Linkedin className="cursor-pointer hover:text-white" />
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer"><Link to="/home" className="cursor-pointer hover:text-purple-600">
              Home
            </Link></li>
            <li className="hover:text-white cursor-pointer"><Link to="/home" className="cursor-pointer hover:text-purple-600">
              Jobs
            </Link></li>
            <li className="hover:text-white cursor-pointer"><Link to="/home" className="cursor-pointer hover:text-purple-600">
              About Us
            </Link></li>
            <li className="hover:text-white cursor-pointer"><Link to="/home" className="cursor-pointer hover:text-purple-600">
              Blogs
            </Link></li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Nagpur, Maharashtra, India
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +91 93090 16267
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@jobportal.com
            </li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Subscribe
          </h3>
          <p className="text-sm mb-4">
            Get latest job updates and career tips directly in your inbox.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-l-lg text-black bg-white outline-none"
            />
            <button className="bg-purple-600 px-4 rounded-r-lg text-white hover:bg-purple-700">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} JobPortal. All rights reserved.
      </div>
    </footer>
    </div>
  )
}

export default Footer
