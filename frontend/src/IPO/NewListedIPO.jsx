import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from '../api/Axios';

const NewListedIPO = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [newListedIPOs, setNewListedIPOs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch IPO data from backend
  useEffect(() => {
    const fetchNewListedIPOs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/ipos/new-listed');
        setNewListedIPOs(response.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch new listed IPOs:', err);
        setError('Failed to load IPO data. Please try again later.');
        setNewListedIPOs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNewListedIPOs();
  }, []);

  const scrollLeft = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const scrollRight = () => {
    setCurrentIndex(prev => Math.min(newListedIPOs.length - visibleCards, prev + 1));
  };

  const visibleIPOs = newListedIPOs.slice(currentIndex, currentIndex + visibleCards);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString || dateString === "Not Issued") return dateString;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Format percentage with color
  const formatPercentage = (value) => {
    if (!value) return 'N/A';
    const num = parseFloat(value);
    const color = num >= 0 ? 'text-green-600' : 'text-red-600';
    const sign = num >= 0 ? '+' : '';
    return <span className={color}>{sign}{value}%</span>;
  };

  // Custom skeleton loader component
  const SkeletonLoader = () => (
    <div className="border border-gray-100 bg-white rounded-lg p-4 shadow-sm w-full animate-pulse">
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

  return (
    <div className="relative mt-14 px-4 sm:px-6 lg:px-8">
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4'>
        <div className='flex-1'>
          <h1 className='text-2xl font-bold'>New Listed</h1>
          <p className='font-thin text-sm text-gray-600'>
            Companies that have been listed recently through an IPO. Find their listing gains and returns here.
          </p>
        </div>
        <div className='bg-[#3f52ff] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm w-full sm:w-auto text-center transition-colors duration-200'>
          <NavLink to="/newlisted-IPO">View All</NavLink>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
          <p>{error}</p>
        </div>
      )}
      
      <div className="relative">
        {currentIndex > 0 && !loading && newListedIPOs.length > 0 && (
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
            // Show skeleton loaders while loading
            [...Array(visibleCards)].map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          ) : newListedIPOs.length > 0 ? (
            // Show actual IPO cards when data is loaded
            visibleIPOs.map((ipo, index) => (
              <div 
                key={ipo.id || index} 
                className="border border-gray-100 bg-white rounded-lg p-4 shadow-sm w-full hover:shadow-md transition-shadow duration-200"
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
                      <p className="text-xs text-gray-500">IPO PRICE</p>
                      <p className="font-medium text-sm">{ipo.ipoPrice || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">LISTING PRICE</p>
                      <p className="font-medium text-sm">{ipo.listingPrice || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">LISTING GAIN</p>
                      <p className="font-medium text-sm">{formatPercentage(ipo.listingGain)}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    <div>
                      <p className="text-xs text-gray-500">LISTING DATE</p>
                      <p className="font-medium text-sm">{formatDate(ipo.listingDate)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">CMP</p>
                      <p className="font-medium text-sm">{ipo.currentPrice || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">CURRENT RETURN</p>
                      <p className="font-medium text-sm">{formatPercentage(ipo.currentReturn)}</p>
                    </div>
                  </div>

                  <div className='flex gap-2 mt-auto'>
                    <NavLink 
                      to={`/rhp/${ipo.id}`} 
                      className="bg-[#E1EFFF] hover:bg-blue-100 py-2 px-3 sm:px-4 rounded text-xs sm:text-sm text-center flex-1 transition-colors duration-200"
                    >
                      RHP
                    </NavLink>
                    <NavLink 
                      to={`/drhp/${ipo.id}`} 
                      className="bg-[#E1EFFF] hover:bg-blue-100 py-2 px-3 sm:px-4 rounded text-xs sm:text-sm text-center flex-1 transition-colors duration-200"
                    >
                      DRHP
                    </NavLink>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Show empty state when no IPOs are available
            <div className="w-full py-10 text-center">
              <p className="text-gray-500">No recently listed IPOs at the moment. Please check back later.</p>
            </div>
          )}
        </div>
        
        {currentIndex < newListedIPOs.length - visibleCards && !loading && newListedIPOs.length > 0 && (
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

export default NewListedIPO;
