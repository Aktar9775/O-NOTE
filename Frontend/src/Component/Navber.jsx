import React from "react";
import { Link } from "react-router-dom";
import "./Navber.css";

function Navbar() {
  return (
    <nav className="container mx-auto px-6 text-gray-200 py-2 flex items-center justify-between bg-white/1 shadow-md rounded-2xl border border-gray-800 backdrop-filter backdrop-blur-lg">
      {/* Logo */}
      <div className=" text-2xl font-bold">O`Note</div>
      
      {/* Navigation Links */}
      <ul className="hidden md:flex space-x-6 font-medium">
        <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
        <li><Link to="/feature" className="hover:text-blue-600">Features</Link></li>
        <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
      </ul>
      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center">
        <button className="focus:outline-none" id="menu-toggle">
          ☰
        </button>
      </div>

      {/* Buttons */}
      <div className="hidden md:flex">
        <Link to='/Login' className="px-6 py-2 border border-gray-400 rounded-xl hover:bg-gray-600 hover:text-white transition">
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
