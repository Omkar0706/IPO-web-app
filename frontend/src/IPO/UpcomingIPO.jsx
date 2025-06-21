import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from '../api/Axios';

const UpcomingIPO = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [upcomingIPOs, setUpcomingIPOs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const SkeletonLoader = () => (
    <div className="min-w-[280px] sm:min-w-0 sm:w-full border border-gray-100 bg-white rounded-lg p-4 shadow-sm flex-1 animate-pulse">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-10 bg-gray-200 rounded"></div>
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[...Array(3)].map((_, i) => (
            <div key={i}>
              <div className="h-3 bg-gray-200 rounded w-3/4 mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[...Array(3)].map((_, i) => (
            <div key={i}>
              <div className="h-3 bg-gray-200 rounded w-3/4 mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>

        <div className='flex gap-2 mt-auto'>
          <div className="bg-gray-200 py-2 px-4 rounded w-full h-8"></div>
          <div className="bg-gray-200 py-2 px-4 rounded w-full h-8"></div>
        </div>
      </div>
    </div>
  );

  // Fetch IPO data from backend
  useEffect(() => {
    const fetchUpcomingIPOs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/ipos/upcoming');
        setUpcomingIPOs(response.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch upcoming IPOs:', err);
        setError('Failed to load data. Please try again later.');
        setUpcomingIPOs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingIPOs();
  }, []);

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

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollLeft = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const scrollRight = () => {
    setCurrentIndex(prev => Math.min(upcomingIPOs.length - visibleCards, prev + 1));
  };

  const visibleIPOs = upcomingIPOs.slice(currentIndex, currentIndex + visibleCards);

  const formatDate = (dateString) => {
    if (!dateString || dateString === "Not Issued") return dateString;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="relative mt-14 px-4 sm:px-6 lg:px-8">
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4'>
        <div className='flex-1'>
          <h1 className='text-2xl font-bold'>Upcoming</h1>
          <h1 className='font-thin text-sm text-gray-600'>
            Companies that have filed for an IPO with SEBI. Few details might be disclosed by the companies later on.
          </h1>
        </div>
        <div className='bg-[#3f52ff] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm w-full sm:w-auto text-center transition-colors duration-200'>
          <NavLink to="/upcoming-IPO">View All</NavLink>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
        </div>
      )}

      <div className="relative">
        {currentIndex > 0 && !loading && (
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Scroll left"
          >
            <FaChevronLeft className="text-[#3f52ff]" size={20} />
          </button>
        )}
        
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {loading ? (
            [...Array(visibleCards)].map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          ) : (
            visibleIPOs.map((ipo, index) => (
              <div 
                key={ipo.id || index} 
                className="min-w-[280px] sm:min-w-0 sm:w-full border border-gray-100 bg-white rounded-lg p-4 shadow-sm flex-1 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    {ipo.logo ? (
                      <img
                        src={ipo.logo}
                        alt={`${ipo.name} logo`}
                        className="w-12 h-10 object-contain"
                        onError={(e) => {
                          e.target.src = '/default-ipo-logo.png';
                          e.target.onerror = null;
                        }}
                      />
                    ) : (
                      <div className="w-12 h-10 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-xs text-gray-500">No Logo</span>
                      </div>
                    )}
                    <h2 className="font-bold text-lg text-[#467CFF] truncate">{ipo.name}</h2>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">PRICE BAND</p>
                      <p className="font-medium text-sm">{ipo.priceBand || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">OPEN</p>
                      <p className="font-medium text-sm">{formatDate(ipo.open)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">CLOSE</p>
                      <p className="font-medium text-sm">{formatDate(ipo.close)}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    <div>
                      <p className="text-xs text-gray-500">ISSUE SIZE</p>
                      <p className="font-medium text-sm">{ipo.issueSize || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">ISSUE TYPE</p>
                      <p className="font-medium text-sm">{ipo.issueType || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">LISTING DATE</p>
                      <p className="font-medium text-sm">{formatDate(ipo.listingDate)}</p>
                    </div>
                  </div>

                  <div className='flex gap-2 mt-auto'>
                    <NavLink 
                      to={`/rhp/${ipo.id}`} 
                      className="bg-[#E1EFFF] py-2 px-3 sm:px-4 rounded text-xs sm:text-sm text-center flex-1 hover:bg-blue-100 transition-colors duration-200"
                    >
                      RHP
                    </NavLink>
                    <NavLink 
                      to={`/drhp/${ipo.id}`} 
                      className="bg-[#E1EFFF] py-2 px-3 sm:px-4 rounded text-xs sm:text-sm text-center flex-1 hover:bg-blue-100 transition-colors duration-200"
                    >
                      DRHP
                    </NavLink>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {currentIndex < upcomingIPOs.length - visibleCards && !loading && upcomingIPOs.length > 0 && (
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100 transition-colors duration-200"
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
