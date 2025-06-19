import React from 'react';
import { FiSearch, FiUser, FiBell } from 'react-icons/fi';

const AdminNavbar = () => {
  return (
    <>
      <div className='flex justify-between items-center h-15'>
            <div className='bg-[#f1f2f7] w-[15%] h-full py-4 text-center'>
                <h1 className='text-[#5a67ba] text-xl font-bold '>Bluestock Fintech</h1>
            </div>

            <div className='flex-1 mx-8 relative'>
                <input 
                    type="text" 
                    placeholder='Search' 
                    className='w-full max-w-lvh px-10 py-2 bg-[#f1f2f7] rounded'
                />
                <div className='absolute left-3 top-2.5 text-[#b6bec7]'>
                    <FiSearch className="h-5 w-5" />
                </div>
            </div>

            <div className='flex items-center space-x-6 px-4'>
                <div className='flex items-center space-x-2'>
                    <div className='rounded-full h-8 w-8 bg-gray-300 flex items-center justify-center overflow-hidden'>
                        {/* Replace with actual user image */}
                        <FiUser className="h-5 w-5 text-gray-500" />
                    </div>
                    <span className='text-gray-700'>Hi, Username</span>
                </div>

                <div className='relative'>
                    {/* Notification icon with badge */}
                    <button className='text-gray-600 hover:text-[#5a67ba]'>
                        <FiBell className="h-6 w-6" />
                        <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center'>3</span>
                    </button>
                </div>
            </div>
        </div>
        <div className='w-full bg-[#c8cbd9] h-[1.5px]'></div>
    </>
  );
};

export default AdminNavbar;