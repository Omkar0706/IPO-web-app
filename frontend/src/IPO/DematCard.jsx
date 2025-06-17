import React from 'react'
import { NavLink } from 'react-router-dom'

const DematCard = () => {
  return (
    <div className='bg-white shadow-md rounded-lg p-4 sm:p-6 w-full md:w-3/4 lg:w-1/2 mx-auto my-8 sm:my-14'>
      <div className='flex justify-center items-center gap-2'>
        <img
          src="/logo.png"
          alt="Bluestock Logo"
          className="h-7 w-auto object-contain"
        />
      </div>

      <h1 className='text-xl sm:text-2xl font-semibold text-center mt-4 sm:mt-6'>
        Applying for this IPO?
      </h1>
      
      <p className='text-xs sm:text-sm text-gray-600 text-center mt-3 sm:mt-4 px-2 sm:px-0'>
        The way you compare & invest in only the best IPO, let us help you get started by comparing and selecting the best Demat account. Open your Demat account now to apply for your favourite IPO.
      </p>
      
      <div className='flex justify-center mt-4 sm:mt-6'>
        <NavLink 
          to="/demat-account" 
          className='bg-[#3F52FF] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 text-sm sm:text-base'
        >
          Open Demat Account
        </NavLink>
      </div>
    </div>
  )
}

export default DematCard
