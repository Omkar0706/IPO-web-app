import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const UpcomingIPO = () => {
  const [ipos, setIpos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 📦 Fetch IPOs from backend
  useEffect(() => {
    const fetchIPOs = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/ipo/');
        const data = await response.json();
        const filtered = data.filter(ipo => ipo.status === 'upcoming');
        setIpos(filtered);
      } catch (err) {
        setError('Failed to load IPO data');
      } finally {
        setLoading(false);
      }
    };

    fetchIPOs();
  }, []);

  // 🧠 Handle responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCards(1);
      else if (window.innerWidth < 768) setVisibleCards(2);
      else setVisibleCards(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollLeft = () => setCurrentIndex(prev => Math.max(0, prev - 1));
  const scrollRight = () =>
    setCurrentIndex(prev => Math.min(ipos.length - visibleCards, prev + 1));

  const visibleIPOs = ipos.slice(currentIndex, currentIndex + visibleCards);

  if (loading) return <div className="p-4 text-gray-500">Loading IPOs...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

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
          <button onClick={scrollLeft} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100" aria-label="Scroll left">
            <FaChevronLeft className="text-[#3f52ff]" size={20} />
          </button>
        )}

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {visibleIPOs.map((ipo, index) => (
            <div key={index} className="min-w-[280px] sm:min-w-0 sm:w-full border border-gray-100 bg-white rounded-lg p-4 shadow-sm flex-1">
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
                    <p className="text-xs text-gray-500">PRICE BAND</p>
                    <p className="font-medium text-sm">{ipo.price_band}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">OPEN</p>
                    <p className="font-medium text-sm">{ipo.open_date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">CLOSE</p>
                    <p className="font-medium text-sm">{ipo.close_date}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div>
                    <p className="text-xs text-gray-500">ISSUE SIZE</p>
                    <p className="font-medium text-sm">{ipo.issue_size}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">ISSUE TYPE</p>
                    <p className="font-medium text-sm">{ipo.issue_type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">LISTING DATE</p>
                    <p className="font-medium text-sm">{ipo.listing_date}</p>
                  </div>
                </div>

                <div className='flex gap-2 mt-auto'>
                  <NavLink to='/RHP' className="bg-[#E1EFFF] py-2 px-3 sm:px-4 rounded text-xs sm:text-sm text-center flex-1">RHP</NavLink>
                  <NavLink to='/DRHP' className="bg-[#E1EFFF] py-2 px-3 sm:px-4 rounded text-xs sm:text-sm text-center flex-1">DRHP</NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>

        {currentIndex < ipos.length - visibleCards && (
          <button onClick={scrollRight} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100" aria-label="Scroll right">
            <FaChevronRight className="text-[#3f52ff]" size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default UpcomingIPO;
