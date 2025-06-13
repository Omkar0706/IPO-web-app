import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const OngoingIPO = () => {
  // eslint-disable-next-line no-unused-vars
  const [visibleCards, setVisibleCards] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);

  const ongoingIPOs = [
    {
      name: "Nova Agritech Ltd.",
      logo: "/nova_agritech.png",
      priceBand: "₹39 - 41",
      open: "2024-01-22",
      close: "2024-01-24",
      issueSize: "143.81 Cr.",
      issueType: "Book Built",
      listingDate: "2024-01-30",
      rhp: "DRHP",
    }
  ];

  const scrollLeft = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const scrollRight = () => {
    setCurrentIndex(prev => Math.min(ongoingIPOs.length - visibleCards, prev + 1));
  };

  const visibleIPOs = ongoingIPOs.slice(currentIndex, currentIndex + visibleCards);

  return (
    <div className="relative">
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-2xl font-bold'>Ongoing</h1>
          <h1 className='font-thin text-sm text-gray-600'>Companies where the IPO investment process is started and will be listed soon in the stock market for regular trading.</h1>
        </div>
        <div className='bg-[#3f52ff] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm'>
          <NavLink to="/allIPO">View All</NavLink>
        </div>
      </div>
      
      <div className="relative">
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
              className="border-white bg-white rounded-lg p-4 shadow-md flex-1 max-w-[450px] max-h-[450px] mx-5"
            >
              <div className="flex justify-between items-start">
                <div className="w-full">
                  <div className="flex items-center gap-2">
                      {ipo.logo ? (
                      <img
                        src={ipo.logo}
                        alt="IPO logo"
                        className="w-12 h-10 object-contain"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded"></div>
                    )}                      <h2 className="font-bold text-lg text-[#467CFF]">{ipo.name}</h2>
                  </div>
                  
                  <div className="flex justify-around items-center gap-3 mt-6">
                    <div>
                      <p className="text-xs text-gray-500">PRICE BAND</p>
                      <p className="font-medium">{ipo.priceBand}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">OPEN</p>
                      <p className="font-medium">{ipo.open}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">CLOSE</p>
                      <p className="font-medium">{ipo.close}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-around items-center gap-3 mt-6">
                    <div>
                      <p className="text-xs text-gray-500">ISSUE SIZE</p>
                      <p className="font-medium">{ipo.issueSize}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">ISSUE TYPE</p>
                      <p className="font-medium">{ipo.issueType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">LISTING DATE</p>
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
        
        {currentIndex < ongoingIPOs.length - visibleCards && (
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

export default OngoingIPO;

