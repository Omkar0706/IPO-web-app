import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const UpcomingIPO = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3); // Default for desktop

  const upcomingIPOs = [
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
    },
    {
      name: "EPACK Durable Ltd.",
      logo: "/EPACK_LTD.jpeg",
      priceBand: "₹28 - 230",
      open: "2024-01-19",
      close: "2024-01-23",
      issueSize: "640.05 Cr.",
      issueType: "Book Built",
      listingDate: "2024-01-29",
    },
    {
      name: "R K SWAMP RK Swarmy Ltd.",
      logo: "/RKSWAMY.jpeg",
      priceBand: "Not Issued",
      open: "Not Issued",
      close: "Not Issued",
      issueSize: "Not Issued",
      issueType: "Book Built",
      listingDate: "Not Issued"
    },
    {
      name: "Tech Innovations Ltd.",
      logo: "/TechInnov.png",
      priceBand: "₹50 - 55",
      open: "2024-02-01",
      close: "2024-02-05",
      issueSize: "200.00 Cr.",
      issueType: "Book Built",
      listingDate: "2024-02-12"
    },
    {
      name: "Green Energy Solutions",
      logo: "/GreenEnergy.png",
      priceBand: "₹75 - 80",
      open: "2024-02-10",
      close: "2024-02-14",
      issueSize: "350.50 Cr.",
      issueType: "Book Built",
      listingDate: "2024-02-21"
    }
  ];

  // Handle responsive card count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1); // Mobile
      } else if (window.innerWidth < 768) {
        setVisibleCards(2); // Tablet
      } else {
        setVisibleCards(3); // Desktop
      }
    };

    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollLeft = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const scrollRight = () => {
    setCurrentIndex(prev => Math.min(upcomingIPOs.length - visibleCards, prev + 1));
  };

  const visibleIPOs = upcomingIPOs.slice(currentIndex, currentIndex + visibleCards);

  return (
    <div className="relative mt-14 px-4 sm:px-6 lg:px-8">
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4'>
        <div className='flex-1'>
          <h1 className='text-2xl font-bold'>Upcoming</h1>
          <h1 className='font-thin text-sm text-gray-600'>
            Companies that have filed for an IPO with SEBI. Few details might be disclosed by the companies later on.
          </h1>
        </div>
        <div className='bg-[#3f52ff] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm w-full sm:w-auto text-center'>
          <NavLink to="/upcoming-IPO">View All</NavLink>
        </div>
      </div>
      
      
      <div className="relative">
        {currentIndex > 0 && (
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100"
            aria-label="Scroll left"
          >
            <FaChevronLeft className="text-[#3f52ff]" size={20} />
          </button>
        )}
        
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {visibleIPOs.map((ipo, index) => (
            <div 
              key={index} 
              className="min-w-[280px] sm:min-w-0 sm:w-full border border-gray-100 bg-white rounded-lg p-4 shadow-sm flex-1"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  {ipo.logo ? (
                    <img
                      src={ipo.logo}
                      alt={`${ipo.name} logo`}
                      className="w-12 h-10 object-contain"
                    />
                  ) : (
                    <div className="w-12 h-10 bg-gray-200 rounded"></div>
                  )}
                  <h2 className="font-bold text-lg text-[#467CFF] truncate">{ipo.name}</h2>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">PRICE BAND</p>
                    <p className="font-medium text-sm">{ipo.priceBand}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">OPEN</p>
                    <p className="font-medium text-sm">{ipo.open}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">CLOSE</p>
                    <p className="font-medium text-sm">{ipo.close}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div>
                    <p className="text-xs text-gray-500">ISSUE SIZE</p>
                    <p className="font-medium text-sm">{ipo.issueSize}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">ISSUE TYPE</p>
                    <p className="font-medium text-sm">{ipo.issueType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">LISTING DATE</p>
                    <p className="font-medium text-sm">{ipo.listingDate}</p>
                  </div>
                </div>

                <div className='flex gap-2 mt-auto'>
                  <NavLink 
                    to='/RHP' 
                    className="bg-[#E1EFFF] py-2 px-3 sm:px-4 rounded text-xs sm:text-sm text-center flex-1"
                  >
                    RHP
                  </NavLink>
                  <NavLink 
                    to='/DRHP' 
                    className="bg-[#E1EFFF] py-2 px-3 sm:px-4 rounded text-xs sm:text-sm text-center flex-1"
                  >
                    DRHP
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {currentIndex < upcomingIPOs.length - visibleCards && (
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100"
            aria-label="Scroll right"
          >
            <FaChevronRight className="text-[#3f52ff]" size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default UpcomingIPO;
