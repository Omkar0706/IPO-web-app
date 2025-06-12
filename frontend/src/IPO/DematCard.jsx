import React from 'react'
import { NavLink } from 'react-router-dom'

const DematCard = () => {
  return (
    <div className='bg-white shadow-md rounded-lg p-6 w-1/2 translate-x-1/2 py-14'>
        <div className='flex items-center justify-center'>
            <img src="" alt="logo" />
            <h1 className='text-3xl uppercase font-bold'>bluestock</h1>
        </div>

        <h1 className='text-2xl font-semibold flex items-center justify-center mt-4'>Applying for this IPO?</h1>
        <p className='text-sm font-thin translate-x-1.5 mt-4'>The way you compare & invest in only the best IPO, let us help you get started by comparing and selecting the best Demat account. Open your Demat account now to apply for your favourite IPO.</p>
        <div className='flex items-center justify-center mt-6'>
            <NavLink to="/demat" className='bg-[#3F52FF] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300'>
                Open Demat Account
            </NavLink>
        </div>
    </div>
  )
}

export default DematCard
