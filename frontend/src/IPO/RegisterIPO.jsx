import React from 'react';
import AdminNavbar from '../components/AdminNavbar';
import AdminSearchbar from '../components/AdminSearchbar';
import IPOSidebar from './IPOSidebar';
import IPOInformationForm from './IPOInformationForm';

const RegisterIPO = () => {
  return (
    <div className='flex min-h-screen bg-gray-50'>
      <AdminNavbar />
      <div className='flex-1 flex flex-col'>
        <AdminSearchbar />
        <div className='py-8 px-6 flex justify-between items-center bg-white border-b border-gray-200'>
          <div className=''>
            <h1 className='text-3xl font-bold text-gray-900'>Upcoming IPO Information</h1>
            <p className='text-gray-600 text-lg'>Manage your IPO Details</p>
          </div>
          <div className='flex gap-4'>
            <button className='bg-[#4f80e1] text-white py-3 px-6 text-lg rounded-xl font-semibold hover:bg-blue-700 transition duration-200'>Register</button>
            <button className='text-[#4f80e1] bg-white border border-[#4f80e1] py-3 px-6 text-lg rounded-xl font-semibold hover:bg-blue-50 transition duration-200'>Cancel</button>
          </div>
        </div>
        <div className='flex flex-1 p-6'>
          <IPOSidebar />
          <IPOInformationForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterIPO;
