import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from '../api/Axios';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    isRobot: false,
    keepSignedIn: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    if (!formData.isRobot) newErrors.isRobot = 'Please verify you are not a robot';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await axios.post('/auth/signin', {
        email: formData.email,
        password: formData.password
      });
      
      console.log('Login successful:', response.data);
      
      // Store token based on "keep signed in" preference
      if (formData.keepSignedIn) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      } else {
        sessionStorage.setItem('authToken', response.data.token);
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      // Check if user is admin and redirect accordingly
      if (response.data.user?.isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
      
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      if (error.response?.data?.errors) {
        setErrors(prev => ({ ...prev, ...error.response.data.errors }));
      } else {
        setErrors(prev => ({
          ...prev, 
          general: error.response?.data?.message || 'Login failed. Please try again.'
        }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] absolute w-[90%] max-w-[400px] p-4 sm:p-6 bg-white shadow-lg rounded-lg'>
      <div className='flex justify-center items-center gap-2 text-2xl font-bold'>
        <img
          src="/logo.png"
          alt="Bluestock Logo"
          className="h-7 w-auto object-contain sm:ml-10"
        />
      </div>
      
      {errors.general && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 text-sm rounded">
          {errors.general}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className='space-y-4 mt-6'>
        {/* Email Section */}
        <div>
          <h2 className='text-sm font-medium mb-1'>Email Address</h2>
          <input 
            type="email" 
            name="email"
            placeholder="johndoe@gmail.com" 
            value={formData.email}
            onChange={handleChange}
            className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm sm:text-base`} 
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Password Section */}
        <div>
          <div className='flex justify-between items-center mb-1'>
            <h2 className='text-sm font-medium'>Password</h2>
            <NavLink 
              to="/forgotpassword"
              className='text-blue-600 hover:underline text-xs sm:text-sm'
            >
              Forgot Password?
            </NavLink>
          </div>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder='......' 
              value={formData.password}
              onChange={handleChange}
              className={`border ${errors.password ? 'border-red-500' : 'border-gray-300'} p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm sm:text-base pr-10`} 
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>

        {/* CAPTCHA Checkbox */}
        <div className={`flex items-center space-x-2 ${errors.isRobot ? 'bg-red-100' : 'bg-[#e4e7eb]'} px-3 sm:px-4 py-2 rounded`}>
          <input 
            type="checkbox" 
            id="robotCheck" 
            name="isRobot"
            checked={formData.isRobot}
            onChange={handleChange}
            className='h-4 w-4 text-green-400 focus:ring-green-500 border-gray-300 rounded'
          />
          <label htmlFor="robotCheck" className='text-xs sm:text-sm text-gray-700'>
            I'm not a robot
          </label>
          <span className='text-xs text-gray-500 ml-auto'>reCAPTURA</span>
        </div>
        {errors.isRobot && <p className="text-red-500 text-xs -mt-2">{errors.isRobot}</p>}

        {/* Keep me signed in */}
        <div className='flex items-center space-x-2'>
          <input 
            type="checkbox" 
            id="keepSignedIn" 
            name="keepSignedIn"
            checked={formData.keepSignedIn}
            onChange={handleChange}
            className='h-4 w-4 text-[#685cff] focus:ring-blue-500 border-gray-300 rounded'
          />
          <label htmlFor="keepSignedIn" className='text-xs sm:text-sm text-gray-700'>
            Keep me signed in
          </label>
        </div>

        {/* Login Button */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className='w-full bg-[#685cff] text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm sm:text-base disabled:opacity-70 disabled:cursor-not-allowed'
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
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
          className='w-full py-2 px-4 rounded bg-[#e4e7eb] flex items-center justify-center space-x-2 text-sm sm:text-base hover:bg-gray-200'
        >
          <FcGoogle className="w-5 h-5" />
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
