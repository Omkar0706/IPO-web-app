import React from 'react'
import { Link } from 'react-router-dom'
// import { GoArrowUpRight } from "react-icons/go";   icon does't load properly, so not using it for now

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-4 w-full h-auto bg-white border-b border-gray-200'>
      <div className='text-2xl font-bold'>
        <i></i> BLUESTOCK
      </div>
      
      <div className='flex gap-6 uppercase text-sm font-medium'>
        <Link to="/ipo" className='text-gray-400 hover:text-blue-600'>ipo</Link>
        <Link to="/community" className='text-gray-400 hover:text-blue-600'>community</Link>
        <Link to="/products" className='text-gray-400 hover:text-blue-600'>products</Link>
        <Link to="/brokers" className='text-gray-400 hover:text-blue-600 flex gap-0.5'>brokers{/* <GoArrowUpRight /> */}</Link>
        <Link to="/livenews" className='text-gray-400 hover:text-blue-600 flex gap-0.5'>live news<div className='text-xs bg-[#3f52ff] text-white px-2 py-0.5 rounded -translate-y-1.5'>new</div></Link>
      </div>
      
      <div className='flex gap-4 items-center'>
        <Link to="/signin" className='text-gray-400 hover:text-blue-600'>Sign In</Link>
        <Link to="/signup" className='bg-[#3f52ff] text-white px-4 py-2 rounded hover:bg-blue-700'>Sign Up Now</Link>
        <i></i>
      </div>
    </div>
  )
}   

export default Navbar
