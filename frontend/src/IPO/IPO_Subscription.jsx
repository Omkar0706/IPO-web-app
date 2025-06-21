import React from 'react'
import AdminNavbar from '../components/AdminNavbar';
import AdminSerchbar from '../components/AdminSearchbar';

const IPO_Subscription = () => {
  return (
    <div className='flex min-h-screen bg-gray-50'>
      <AdminNavbar/>
      <div className='flex-1 flex flex-col'>
        <AdminSerchbar/>
      </div>
    </div>
  )
}

export default IPO_Subscription
