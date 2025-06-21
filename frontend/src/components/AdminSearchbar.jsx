import React, { useState, useEffect } from 'react';
import { FiSearch, FiUser, FiBell, FiChevronDown, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from '../api/Axios';

const AdminSearchbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userData, setUserData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  // Fetch user data and notifications
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await axios.get('/auth/user');
        setUserData(userResponse.data);
        
        // Fetch notifications
        const notifResponse = await axios.get('/notifications');
        setNotifications(notifResponse.data);
        setUnreadCount(notifResponse.data.filter(n => !n.read).length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
    // You might want to navigate to search results or filter content
  };

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout');
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const markNotificationsAsRead = async () => {
    try {
      await axios.patch('/notifications/mark-as-read');
      setUnreadCount(0);
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  return (
    <>
      <div className='py-4 h-16 bg-white'>
        <div className='flex justify-between items-center px-6'>
          {/* Search Bar */}
          <div className='flex-1 max-w-2xl relative'>
            <form onSubmit={handleSearch}>
              <input 
                type="text" 
                placeholder='Search...' 
                className='w-full px-10 py-2 bg-[#f1f2f7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a67ba] focus:bg-white transition-all duration-200'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className='absolute left-3 top-2.5 text-[#b6bec7]'>
                <FiSearch className="h-5 w-5" />
              </div>
            </form>
          </div>
    
          {/* User Controls */}
          <div className='flex items-center space-x-6'>
            {/* Notifications */}
            <div className='relative'>
              <button 
                className='text-gray-600 hover:text-[#5a67ba] relative'
                onClick={markNotificationsAsRead}
              >
                <FiBell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
            
            {/* User Profile */}
            <div className='relative'>
              <button 
                className='flex items-center space-x-2 group'
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className='rounded-full h-9 w-9 bg-gray-200 flex items-center justify-center overflow-hidden'>
                  {userData?.avatar ? (
                    <img 
                      src={userData.avatar} 
                      alt="User" 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <FiUser className="h-5 w-5 text-gray-600" />
                  )}
                </div>
                <div className='text-left hidden md:block'>
                  <p className='text-gray-800 font-medium text-sm'>
                    {userData?.name || 'Loading...'}
                  </p>
                  <p className='text-gray-500 text-xs'>
                    {userData?.role || 'Admin'}
                  </p>
                </div>
                <FiChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${showDropdown ? 'transform rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              {showDropdown && (
                <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100'>
                  <NavLink
                    to="/admin/profile"
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  >
                    Your Profile
                  </NavLink>
                  <NavLink
                    to="/admin/settings"
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  >
                    Settings
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center'
                  >
                    <FiLogOut className="mr-2" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='w-full bg-[#c8cbd9] h-px'></div>
    </>
  );
};

export default AdminSearchbar;
