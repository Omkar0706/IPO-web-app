import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { GoArrowUpRight } from "react-icons/go";
import { FiMenu, FiX } from "react-icons/fi"; // For mobile menu toggle

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className='flex flex-col md:flex-row justify-between items-center p-4 w-full h-auto bg-white border-b border-gray-200'>
      <div className='flex justify-between items-center w-full md:w-auto'>
        <div className='flex items-center gap-2 text-2xl font-bold'>
          <img
            src="/logo.png"
            alt="Bluestock Logo"
            className="h-7 w-auto object-contain md:ml-10"
          />
        </div>

        {/* Mobile menu button */}
        <button 
          className='md:hidden text-gray-600 focus:outline-none'
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Desktop Navigation */}
      <div className='hidden md:flex gap-6 uppercase text-sm font-medium'>
        <Link to="/" className='text-gray-400 hover:text-blue-600'>ipo</Link>
        <Link to="/community" className='text-gray-400 hover:text-blue-600'>community</Link>
        <Link to="/products" className='text-gray-400 hover:text-blue-600'>products</Link>
        <Link to="/brokers" className='text-gray-400 hover:text-blue-600 flex gap-0.5'>brokers{ <GoArrowUpRight /> }</Link>
        <Link to="/livenews" className='text-gray-400 hover:text-blue-600 flex gap-0.5'>live news<div className='text-xs bg-[#3f52ff] text-white px-2 py-0.5 rounded -translate-y-1.5'>new</div></Link>
      </div>
      
      {/* Desktop Auth Buttons */}
      <div className='hidden md:flex gap-4 items-center'>
        <Link to="/signin" className='text-gray-400 hover:text-blue-600'>Sign In</Link>
        <Link to="/signup" className='bg-[#3f52ff] text-white px-4 py-2 rounded hover:bg-blue-700'>Sign Up Now</Link>
      </div>

      {/* Mobile Menu - shown when isMobileMenuOpen is true */}
      {isMobileMenuOpen && (
        <div className='md:hidden w-full flex flex-col items-center mt-4 space-y-4'>
          <Link to="/" className='text-gray-400 hover:text-blue-600' onClick={toggleMobileMenu}>ipo</Link>
          <Link to="/community" className='text-gray-400 hover:text-blue-600' onClick={toggleMobileMenu}>community</Link>
          <Link to="/products" className='text-gray-400 hover:text-blue-600' onClick={toggleMobileMenu}>products</Link>
          <Link to="/brokers" className='text-gray-400 hover:text-blue-600 flex gap-0.5' onClick={toggleMobileMenu}>brokers{ <GoArrowUpRight /> }</Link>
          <Link to="/livenews" className='text-gray-400 hover:text-blue-600 flex gap-0.5' onClick={toggleMobileMenu}>
            live news<div className='text-xs bg-[#3f52ff] text-white px-2 py-0.5 rounded -translate-y-1.5'>new</div>
          </Link>
          
          <div className='flex gap-4 items-center mt-4'>
            <Link to="/signin" className='text-gray-400 hover:text-blue-600' onClick={toggleMobileMenu}>Sign In</Link>
            <Link to="/signup" className='bg-[#3f52ff] text-white px-4 py-2 rounded hover:bg-blue-700' onClick={toggleMobileMenu}>Sign Up Now</Link>
          </div>
        </div>
      )}
    </div>
  )
}   

export default Navbar;
