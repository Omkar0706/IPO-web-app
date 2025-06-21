import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { FiSearch, FiEdit2, FiTrash2, FiEye, FiPlus } from 'react-icons/fi';
import AdminNavbar from '../components/AdminNavbar';
import AdminSearchbar from '../components/AdminSearchbar';
import axios from '../api/Axios';

const ManageIPO = () => {
  const [ipoData, setIpoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const navigate = useNavigate();

  // Fetch IPO data from backend
  useEffect(() => {
    const fetchIPOData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/admin/ipos');
        setIpoData(response.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch IPO data:', err);
        setError('Failed to load IPO data. Please try again later.');
        setIpoData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchIPOData();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'ongoing':
        return 'bg-blue-100 text-blue-800';
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-800';
      case 'listed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDelete = async (ipoId) => {
    try {
      await axios.delete(`/admin/ipos/${ipoId}`);
      setIpoData(ipoData.filter(ipo => ipo.id !== ipoId));
      setDeleteConfirm(null);
      // Simple alert for success (replace with your preferred notification method)
      alert('IPO deleted successfully');
    } catch (error) {
      console.error('Delete error:', error);
      // Simple alert for error (replace with your preferred notification method)
      alert('Failed to delete IPO');
    }
  };

  const handleEdit = (ipoId) => {
    navigate(`/admin/edit-ipo/${ipoId}`);
  };

  const handleView = (ipoId) => {
    navigate(`/admin/ipo-details/${ipoId}`);
  };

  const filteredIPOs = ipoData.filter(ipo =>
    ipo.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ipo.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminNavbar />
      
      <div className="flex-1 flex flex-col">
        <AdminSearchbar />
        
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">IPO Management</h1>
            <NavLink 
              to="/admin/Register_IPO"
              className="flex items-center px-4 py-2 bg-[#5a67ba] text-white rounded-lg hover:bg-[#4a56a8] transition-colors"
            >
              <FiPlus className="mr-2" />
              Register New IPO
            </NavLink>
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
              <p>{error}</p>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {deleteConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h3 className="text-lg font-medium mb-4">Confirm Delete</h3>
                <p className="mb-6">Are you sure you want to delete this IPO?</p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(deleteConfirm)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Search and Filter Bar */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <input 
                  type="text" 
                  placeholder="Search by company or status..." 
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a67ba]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              <div className="flex space-x-2">
                <select className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a67ba]">
                  <option value="">All Status</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="listed">Listed</option>
                </select>
                <select className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a67ba]">
                  <option value="">All Types</option>
                  <option value="book">Book Built</option>
                  <option value="fixed">Fixed Price</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* IPO Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {loading ? (
              <div className="p-6 text-center">Loading IPO data...</div>
            ) : filteredIPOs.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No IPOs found. {searchTerm ? 'Try a different search term.' : 'Register a new IPO to get started.'}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Band</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Open Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Close Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Size</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Listing Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredIPOs.map((ipo) => (
                      <tr key={ipo.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                              {ipo.logo ? (
                                <img className="h-10 w-10 rounded-full" src={ipo.logo} alt={ipo.company} />
                              ) : (
                                <span className="text-gray-500 text-xs">Logo</span>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{ipo.company}</div>
                              <div className="text-sm text-gray-500">{ipo.symbol}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ipo.priceBand}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(ipo.openDate)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(ipo.closeDate)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ipo.issueSize}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ipo.issueType}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(ipo.listingDate)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(ipo.status)}`}>
                            {ipo.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleEdit(ipo.id)}
                              className="text-indigo-600 hover:text-indigo-900"
                              title="Edit"
                            >
                              <FiEdit2 className="h-5 w-5" />
                            </button>
                            <button 
                              onClick={() => handleView(ipo.id)}
                              className="text-green-600 hover:text-green-900"
                              title="View Details"
                            >
                              <FiEye className="h-5 w-5" />
                            </button>
                            <button 
                              onClick={() => setDeleteConfirm(ipo.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                            >
                              <FiTrash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageIPO;
