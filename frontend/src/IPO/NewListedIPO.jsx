import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const NewListedIPO = () => {
  // eslint-disable-next-line no-unused-vars
  const [visibleCards, setVisibleCards] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);

  const newlistedIPOs = [
    {
      name: "New Agritech Ltd.",
      logo: "",
      priceBand: "₹39 - 41",
      open: "2024-01-22",
      close: "2024-01-24",
      issueSize: "143.81 Cr.",
      issueType: "Book Built",
      listingDate: "2024-01-30",
      rhp: "DRHP",
    },
    {
      name: "EPACK Durable Ltd.",
      logo: "",
      priceBand: "₹28 - 230",
      open: "2024-01-19",
      close: "2024-01-23",
      issueSize: "640.05 Cr.",
      issueType: "Book Built",
      listingDate: "2024-01-29",
    },
    {
      name: "R K SWAMP RK Swarmy Ltd.",
      logo: "",
      priceBand: "Not Issued",
      open: "Not Issued",
      close: "Not Issued",
      issueSize: "Not Issued",
      issueType: "Book Built",
      listingDate: "Not Issued"
    },
    {
      name: "Tech Innovations Ltd.",
      logo: "",
      priceBand: "₹50 - 55",
      open: "2024-02-01",
      close: "2024-02-05",
      issueSize: "200.00 Cr.",
      issueType: "Book Built",
      listingDate: "2024-02-12"
    },
    {
      name: "Green Energy Solutions",
      logo: "",
      priceBand: "₹75 - 80",
      open: "2024-02-10",
      close: "2024-02-14",
      issueSize: "350.50 Cr.",
      issueType: "Book Built",
      listingDate: "2024-02-21"
    }
  ];

  const scrollLeft = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const scrollRight = () => {
    setCurrentIndex(prev => Math.min(newlistedIPOs.length - visibleCards, prev + 1));
  };

  const visibleIPOs = newlistedIPOs.slice(currentIndex, currentIndex + visibleCards);

  return (
    <div className="relative mt-14">
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-2xl font-bold'>New Listed</h1>
          <h1 className='font-thin text-sm text-gray-600'>Companies that have been listed recently through an IPO. Find their listing gains and returns here.</h1>
        </div>
        <div className='bg-[#3f52ff] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm'>
          <NavLink to="/allIPO">View All</NavLink>
        </div>
      </div>
      
      <div className="relative ">
        {currentIndex > 0 && (
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
          >
            <FaChevronLeft className="text-[#3f52ff]" />
          </button>
        )}
        
        <div className="flex justify-between items-center mb-4 overflow-hidden">
          {visibleIPOs.map((ipo, index) => (
            <div 
              key={index} 
              className="max-w-[30%] border-white bg-white rounded-lg p-4 shadow-md flex-1 mx-5"
            >
              <div className="flex justify-between items-start">
                <div className="w-full">
                  <div className="flex items-center gap-2">
                      <img src={ipo.logo} alt={`logo`} className="w-auto h-auto bg-cover bg-center bg-gray-200" />
                      <h2 className="font-bold text-lg text-[#467CFF]">{ipo.name}</h2>
                  </div>
                  
                  <div className="flex justify-around items-center gap-3 mt-6">
                    <div>
                      <p className="text-xs text-gray-500">IPO PRICE</p>
                      <p className="font-medium">{ipo.priceBand}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">LISTING PRICE</p>
                      <p className="font-medium">{ipo.open}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">LISTING GAIN</p>
                      <p className="font-medium">{ipo.close}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-around items-center gap-3 mt-6">
                    <div>
                      <p className="text-xs text-gray-500">LISTING DATE</p>
                      <p className="font-medium">{ipo.issueSize}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">CMP</p>
                      <p className="font-medium">{ipo.issueType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">CURRENT RETURN</p>
                      <p className="font-medium">{ipo.listingDate}</p>
                    </div>
                  </div>

                  <div className='flex gap-6 mt-6'>
                      <NavLink to='/RHP' className="bg-[#E1EFFF] py-2 px-5 rounded text-sm">RHP</NavLink>
                      <NavLink to='/DRHP' className="bg-[#E1EFFF] py-2 px-5 rounded text-sm">DRHP</NavLink>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {currentIndex < newlistedIPOs.length - visibleCards && (
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
          >
            <FaChevronRight className="text-[#3f52ff]" />
          </button>
        )}
      </div>
    </div>
  );
};

export default NewListedIPO;
