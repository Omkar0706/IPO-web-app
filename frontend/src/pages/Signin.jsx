import React from 'react';
import { NavLink } from 'react-router-dom';

const Signin = () => {
  return (
    <div className='left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] absolute w-[90%] max-w-[400px] p-4 sm:p-6 bg-white shadow-lg rounded-lg'>
      <div className='flex justify-center items-center gap-2 text-2xl font-bold'>
        <img
          src="/logo.png"
          alt="Bluestock Logo"
          className="h-7 w-auto object-contain sm:ml-10"
        />
      </div>
      
      <form className='space-y-4 mt-6'>
        {/* Email Section */}
        <div>
          <h2 className='text-sm font-medium mb-1'>Email Address</h2>
          <input 
            type="email" 
            placeholder="johndoe@gmail.com" 
            className='border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm sm:text-base' 
          />
        </div>

        {/* Password Section */}
        <div>
          <div className='flex justify-between items-center mb-1'>
            <h2 className='text-sm font-medium'>Password</h2>
            <NavLink 
              to="/forgotpassword" part=''
              className='text-blue-600 hover:underline text-xs sm:text-sm'
            >
              Forgot Password?
            </NavLink>
          </div>
          <input 
            type="password" 
            placeholder='......' 
            className='border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm sm:text-base' 
          />
        </div>

        {/* CAPTCHA Checkbox */}
        <div className='flex items-center space-x-2 bg-[#e4e7eb] px-3 sm:px-4 py-2 rounded'>
          <input 
            type="checkbox" 
            id="robotCheck" 
            className='h-4 w-4 text-green-400 focus:ring-green-500 border-gray-300 rounded'
          />
          <label htmlFor="robotCheck" className='text-xs sm:text-sm text-gray-700'>
            I'm not a robot
          </label>
          <span className='text-xs text-gray-500 ml-auto'>reCAPTURA</span>
        </div>

        {/* Keep me signed in */}
        <div className='flex items-center space-x-2'>
          <input 
            type="checkbox" 
            id="keepSignedIn" 
            className='h-4 w-4 text-[#685cff] focus:ring-blue-500 border-gray-300 rounded'
          />
          <label htmlFor="keepSignedIn" className='text-xs sm:text-sm text-gray-700'>
            Keep me signed in
          </label>
        </div>

        {/* Login Button */}
        <button 
          type="submit" 
          className='w-full bg-[#685cff] text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm sm:text-base'
        >
          Login
        </button>

        {/* OR divider */}
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300'></div>
          </div>
          <div className='relative flex justify-center text-xs sm:text-sm'>
            <span className='px-2 bg-[#f4f5f7] text-gray-500'>or sign in with</span>
          </div>
        </div>

        {/* Google Sign In */}
        <button 
          type="button" 
          className='w-full py-2 px-4 rounded bg-[#e4e7eb] flex items-center justify-center space-x-2 text-sm sm:text-base'
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="#EA4335"/>
          </svg>
          <span className='font-thin'>Continue with Google</span>
        </button>

        {/* Create account link */}
        <div className='text-center text-xs sm:text-sm'>
          <span className='text-gray-600'>Don't have an account? </span>
          <NavLink to="/signup" className='text-blue-600 hover:underline'>
            Create an account
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Signin;