import React from 'react'
import { NavLink } from 'react-router-dom'

const ForgotPassword = () => {
  return (
    <div className='left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] absolute w-[90%] max-w-[400px] p-4 sm:p-6 bg-white shadow-lg rounded-lg'>
      <div className='flex justify-center items-center gap-2 text-2xl font-bold -translate-x-2 sm:-translate-x-4'>
        <img
          src="/logo.png"
          alt="Bluestock Logo"
          className="h-7 w-auto object-contain sm:ml-10"
        />
      </div>
      <h2 className='text-xl sm:text-2xl font-semibold text-center mt-4 sm:mt-6'>Forgot Password ?</h2>
      <p className='py-2 sm:py-3 px-2 sm:px-6 font-thin text-[#666666] text-sm sm:text-base text-center'>
        Enter your email address to get the password reset link
      </p>
      <form action="">
        <div className='mt-4 sm:mt-6'>
          <h2 className='text-sm font-medium mb-1'>Email Address</h2>
          <input 
            type="email" 
            placeholder="johndoe@gmail.com" 
            className='border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm sm:text-base' 
          />
        </div>

        <button 
          type="submit" 
          className='w-full bg-[#685cff] text-white py-2 px-4 rounded mt-6 sm:mt-8 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm sm:text-base'
        >
          Password Reset
        </button>

        <div className='px-2 sm:px-4 py-2 mt-6 sm:mt-8 flex justify-center font-semibold text-[#878787] rounded text-sm sm:text-base'>
          <NavLink to={'/signin'}>Back to login</NavLink>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword;
