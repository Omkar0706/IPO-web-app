import React, { useState, useEffect } from 'react';
import axios from '../api/Axios';
import { NavLink } from 'react-router-dom';
import { FaChartLine, FaRegClock } from 'react-icons/fa';

const IPO_Analysis = () => {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch IPO analyses from backend
  useEffect(() => {
    const fetchIPOAnalyses = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/ipo-analysis');
        setAnalyses(response.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch IPO analyses:', err);
        setError('Failed to load analyses. Please try again later.');
        setAnalyses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchIPOAnalyses();
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

  // Skeleton loader for analysis items
  const AnalysisSkeleton = () => (
    <div className="animate-pulse space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="border-b border-gray-100 pb-4">
          <div className="flex items-start mb-2">
            <div className="h-10 w-10 bg-gray-200 rounded-full mr-3"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className='bg-white shadow-md rounded-lg p-4 sm:p-6 w-full lg:w-[48%]'>
      <div className="flex justify-between items-center mb-4">
        <h1 className='text-lg sm:text-xl font-bold flex items-center'>
          <FaChartLine className="mr-2 text-blue-600" />
          IPO Analysis
        </h1>
        <NavLink 
          to="/ipo-analysis" 
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
        <AnalysisSkeleton />
      ) : analyses.length > 0 ? (
        <div className="space-y-4">
          {analyses.slice(0, 3).map((analysis, index) => (
            <div key={analysis.id || index} className="border-b border-gray-100 pb-4 last:border-0">
              <NavLink 
                to={`/ipo-analysis/${analysis.id}`} 
                className="group block"
              >
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <FaChartLine className="text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors mb-1">
                      {analysis.company} IPO Analysis
                    </h2>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                        {analysis.grade || 'Under Review'}
                      </span>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                        {analysis.sector}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {analysis.summary}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <FaRegClock className="mr-1" />
                      <span>{formatDate(analysis.publishedAt)}</span>
                      {analysis.analyst && (
                        <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded">
                          By {analysis.analyst}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          No IPO analyses available at the moment.
        </div>
      )}
    </div>
  );
};

export default IPO_Analysis;
