import React from 'react'
import Navbar from '../components/Navbar'
import UpcomingIPO from '../components/UpcomingIPO'

const Home = () => {
  return (
    <>
        <Navbar />
        <div className='px-8 py-2 bg-[#f7f7ff] min-h-screen'>
            <h1 className='uppercase text-2xl font-semibold'>ipo</h1>
            <h1 className='font-light text-xs mb-3'>Following is the list of campanies for IPO as of today.</h1>
            <UpcomingIPO/>
        </div>
    </>
  )
}

export default Home
