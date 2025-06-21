import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from '../api/Axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
    // Clear error when user starts typing
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSuccessMessage('');
    
    try {
      const response = await axios.post('/auth/forgot-password', { email });
      
      // Handle successful request
      console.log('Password reset request successful:', response.data);
      setSuccessMessage('Password reset link has been sent to your email');
      
      // Optionally redirect after a delay
      setTimeout(() => {
        navigate('/signin');
      }, 3000);
      
    } catch (error) {
      console.error('Password reset error:', error.response?.data || error.message);
      
      // Handle backend validation errors
      if (error.response?.data?.errors) {
        setErrors(prev => ({ ...prev, ...error.response.data.errors }));
      } else {
        setErrors(prev => ({
          ...prev, 
          general: error.response?.data?.message || 'Failed to send reset link. Please try again.'
        }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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

      {errors.general && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded">
          {errors.general}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 text-sm rounded">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className='mt-4 sm:mt-6'>
          <h2 className='text-sm font-medium mb-1'>Email Address</h2>
          <input 
            type="email" 
            placeholder="johndoe@gmail.com" 
            value={email}
            onChange={handleChange}
            className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm sm:text-base`} 
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className='w-full bg-[#685cff] text-white py-2 px-4 rounded mt-6 sm:mt-8 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm sm:text-base disabled:opacity-70 disabled:cursor-not-allowed'
        >
          {isSubmitting ? 'Sending...' : 'Password Reset'}
        </button>

        <div className='px-2 sm:px-4 py-2 mt-6 sm:mt-8 flex justify-center font-semibold text-[#878787] rounded text-sm sm:text-base'>
          <NavLink to={'/signin'}>Back to login</NavLink>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword;
