import React, { useState, useEffect } from 'react';
import axios from '../api/Axios';
import { NavLink } from 'react-router-dom';
import { FaRegClock } from 'react-icons/fa';

const IPO_News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch IPO news from backend
  useEffect(() => {
    const fetchIPONews = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/ipo-news');
        setNews(response.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch IPO news:', err);
        setError('Failed to load news. Please try again later.');
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchIPONews();
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Skeleton loader for news items
  const NewsSkeleton = () => (
    <div className="animate-pulse space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="border-b border-gray-100 pb-4">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className='bg-white shadow-md rounded-lg p-4 sm:p-6 w-full lg:w-[48%]'>
      <div className="flex justify-between items-center mb-4">
        <h1 className='text-lg sm:text-xl font-bold'>IPO Analysis</h1>
        <NavLink 
          to="/ipo-news" 
          className="text-sm text-blue-600 hover:underline"
        >
          View All
        </NavLink>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded">
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <NewsSkeleton />
      ) : news.length > 0 ? (
        <div className="space-y-4">
          {news.slice(0, 3).map((item, index) => (
            <div key={item.id || index} className="border-b border-gray-100 pb-4 last:border-0">
              <NavLink 
                to={`/ipo-news/${item.id}`} 
                className="group block"
              >
                <h2 className="text-base sm:text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors mb-1">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {item.summary}
                </p>
                <div className="flex items-center text-xs text-gray-500">
                  <FaRegClock className="mr-1" />
                  <span>{formatDate(item.publishedAt)}</span>
                  {item.source && (
                    <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded">
                      {item.source}
                    </span>
                  )}
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          No IPO analysis news available at the moment.
        </div>
      )}
    </div>
  );
};

export default IPO_News;
