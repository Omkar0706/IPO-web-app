import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoArrowUpRight } from "react-icons/go";
import { FiMenu, FiX, FiUser, FiLogOut } from "react-icons/fi";
import axios from '../api/Axios';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('/auth/status');
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser(null);
      }
    };
    
    checkAuthStatus();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout');
      setIsAuthenticated(false);
      setUser(null);
      navigate('/signin');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navItems = [
    { path: "/", name: "ipo" },
    { path: "/community", name: "community" },
    { path: "/products", name: "products" },
    { path: "/brokers", name: "brokers", icon: <GoArrowUpRight /> },
    { path: "/livenews", name: "live news", badge: <div className='text-xs bg-[#3f52ff] text-white px-2 py-0.5 rounded -translate-y-1.5'>new</div> }
  ];

  const authItems = [
    { path: "/signin", name: "Sign In" },
    { path: "/signup", name: "Sign Up Now", isButton: true }
  ];

  const profileItems = [
    { path: "/profile", name: "My Profile", icon: <FiUser className="mr-2" /> },
    { name: "Logout", icon: <FiLogOut className="mr-2" />, action: handleLogout }
  ];

  return (
    <div className='flex flex-col md:flex-row justify-between items-center p-4 w-full h-auto bg-white border-b border-gray-200 sticky top-0 z-50'>
      <div className='flex justify-between items-center w-full md:w-auto'>
        <Link to="/" className='flex items-center gap-2 text-2xl font-bold'>
          <img
            src="/logo.png"
            alt="Bluestock Logo"
            className="h-7 w-auto object-contain md:ml-10"
          />
        </Link>

        {/* Mobile menu button */}
        <button 
          className='md:hidden text-gray-600 focus:outline-none'
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Desktop Navigation */}
      <div className='hidden md:flex gap-6 uppercase text-sm font-medium'>
        {navItems.map((item, index) => (
          <Link 
            key={index} 
            to={item.path} 
            className='text-gray-400 hover:text-blue-600 flex gap-0.5 items-center transition-colors duration-200'
          >
            {item.name}
            {item.icon && item.icon}
            {item.badge && item.badge}
          </Link>
        ))}
      </div>
      
      {/* Desktop Auth/Profile */}
      <div className='hidden md:flex gap-4 items-center'>
        {isAuthenticated ? (
          <div className="relative group">
            <button className="flex items-center gap-2 text-gray-400 hover:text-blue-600">
              <FiUser size={18} />
              <span>{user?.name || 'Profile'}</span>
            </button>
            
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
              {profileItems.map((item, index) => (
                item.path ? (
                  <Link
                    key={index}
                    to={item.path}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ) : (
                  <button
                    key={index}
                    onClick={item.action}
                    className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {item.icon}
                    {item.name}
                  </button>
                )
              ))}
            </div>
          </div>
        ) : (
          authItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`${item.isButton ? 'bg-[#3f52ff] text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200' : 'text-gray-400 hover:text-blue-600 transition-colors duration-200'}`}
            >
              {item.name}
            </Link>
          ))
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='md:hidden w-full flex flex-col items-center mt-4 space-y-4 bg-white py-4'>
          {navItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.path} 
              className='text-gray-400 hover:text-blue-600 flex gap-0.5 items-center w-full justify-center py-2'
              onClick={toggleMobileMenu}
            >
              {item.name}
              {item.icon && item.icon}
              {item.badge && item.badge}
            </Link>
          ))}
          
          {isAuthenticated ? (
            <div className='w-full flex flex-col items-center space-y-4 mt-4 border-t pt-4'>
              <Link
                to="/profile"
                className="flex items-center text-gray-400 hover:text-blue-600 py-2"
                onClick={toggleMobileMenu}
              >
                <FiUser className="mr-2" />
                My Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMobileMenu();
                }}
                className="flex items-center text-gray-400 hover:text-blue-600 py-2"
              >
                <FiLogOut className="mr-2" />
                Logout
              </button>
            </div>
          ) : (
            <div className='flex gap-4 items-center mt-4 border-t pt-4'>
              {authItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`${item.isButton ? 'bg-[#3f52ff] text-white px-4 py-2 rounded hover:bg-blue-700' : 'text-gray-400 hover:text-blue-600'}`}
                  onClick={toggleMobileMenu}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}   

export default Navbar;
