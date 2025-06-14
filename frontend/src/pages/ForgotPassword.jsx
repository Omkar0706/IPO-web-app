import React from 'react'
import { NavLink } from 'react-router-dom'

const ForgotPassword = () => {
  return (
    <div className='left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] absolute w-[400px] p-6 bg-white shadow-lg rounded-lg'>
      <div className='flex justify-center items-center gap-2 text-2xl font-bold -translate-x-4'>
        <img
          src="/logo.png"
          alt="Bluestock Logo"
          className="h-7 w-auto object-contain ml-10"
        />
      </div>
      <h2 className='text-2xl font-semibold text-center mt-6 '>Forgot Password ?</h2>
      <p className='py-3 px-6 font-thin text-[#666666]'>Enter your email address to get the password reset link</p>
      <form action="">
        <div>
          <h2 className='text-sm font-medium mb-1'>Email Address</h2>
          <input 
            type="email" 
            placeholder="johndoe@gmail.com" 
            className='border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500' 
          />
        </div>

        <button 
          type="submit" 
          className='w-full bg-[#685cff] text-white py-2 px-4 rounded mt-8 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        >
          Password Reset
        </button>

        <div className='px-4 py-2 mt-8 flex justify-center font-semibold text-[#878787] rounded '>
          <NavLink to={'/signin'}>Back to login</NavLink>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword
