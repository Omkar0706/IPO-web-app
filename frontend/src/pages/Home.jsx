import React from 'react'
import Navbar from '../components/Navbar'
import UpcomingIPO from '../IPO/UpcomingIPO'
import DematCard from '../IPO/DematCard'
import OngoingIPO from '../IPO/OngoingIPO'
import NewListedIPO from '../IPO/NewListedIPO'
import IPO_News from '../IPO/IPO_News'
import IPO_Analysis from '../IPO/IPO_Analysis'
import FAQSection from '../components/FAQSection'

const Home = () => {
  return (
    <>
      <Navbar />

      <div className='px-8 py-2 bg-[#f7f7ff] min-h-screen'>
        <h1 className='uppercase text-2xl font-semibold'>ipo</h1>
        <h1 className='font-light text-xs mb-3'>
          Following is the list of campanies for IPO as of today.
        </h1>

        <UpcomingIPO />
        <DematCard />
        <OngoingIPO />
        <NewListedIPO />

        <div className='flex items-center justify-between mt-15 px-8'>
          <IPO_News />
          <IPO_Analysis />
        </div>

        <FAQSection />
      </div>
    </>
  )
}

export default Home
