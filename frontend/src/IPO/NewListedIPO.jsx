import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const NewListedIPO = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [listedIPOs, setListedIPOs] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 768) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchIPOs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/ipo/");
        const data = await response.json();
        const filtered = data.filter(ipo => ipo.status === "listed");
        setListedIPOs(filtered);
      } catch (error) {
        console.error("Failed to fetch IPOs:", error);
      }
    };

    fetchIPOs();
  }, []);

  const scrollLeft = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const scrollRight = () => {
    setCurrentIndex(prev => Math.min(listedIPOs.length - visibleCards, prev + 1));
  };

  const visibleIPOs = listedIPOs.slice(currentIndex, currentIndex + visibleCards);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="relative mt-14 px-4 sm:px-6 lg:px-8">
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4'>
        <div className='flex-1'>
          <h1 className='text-2xl font-bold'>New Listed</h1>
          <p className='font-thin text-sm text-gray-600'>
            Companies that have been listed recently through an IPO. Find their listing gains and returns here.
          </p>
        </div>
        <div className='bg-[#3f52ff] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm w-full sm:w-auto text-center'>
          <NavLink to="/newlisted-IPO">View All</NavLink>
        </div>
      </div>

      <div className="relative">
        {currentIndex > 0 && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100"
          >
            <FaChevronLeft className="text-[#3f52ff]" size={20} />
          </button>
        )}

        <div className={`grid ${windowWidth < 640 ? 'grid-cols-1' : windowWidth < 768 ? 'grid-cols-2' : 'grid-cols-3'} gap-4 overflow-x-auto pb-4 scrollbar-hide`}>
          {visibleIPOs.map((ipo, index) => (
            <div
              key={index}
              className="border border-gray-100 bg-white rounded-lg p-4 shadow-sm w-full"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  {ipo.company_logo ? (
                    <img
                      src={ipo.company_logo}
                      alt={`${ipo.company_name} logo`}
                      className="w-12 h-10 object-contain"
                    />


                  ) : (
                    <div className="w-12 h-10 bg-gray-200 rounded"></div>
                  )}
                  <h2 className="font-bold text-lg text-[#467CFF] truncate">{ipo.company_name}</h2>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">IPO PRICE</p>
                    <p className="font-medium text-sm">₹{ipo.ipo_price}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">LISTING PRICE</p>
                    <p className="font-medium text-sm">₹{ipo.listing_price}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">LISTING GAIN</p>
                    <p className="font-medium text-sm">{ipo.listing_gain ?? "N/A"}%</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div>
                    <p className="text-xs text-gray-500">LISTING DATE</p>
                    <p className="font-medium text-sm">{formatDate(ipo.listing_date)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">CMP</p>
                    <p className="font-medium text-sm">₹{ipo.current_market_price ?? "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">CURRENT RETURN</p>
                    <p className="font-medium text-sm">{ipo.current_return ?? "N/A"}%</p>
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

        {currentIndex < listedIPOs.length - visibleCards && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100"
          >
            <FaChevronRight className="text-[#3f52ff]" size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default NewListedIPO;
