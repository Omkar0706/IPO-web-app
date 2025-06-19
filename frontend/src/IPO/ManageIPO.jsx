import React from 'react';
import AdminNavbar from '../components/AdminNavbar';
import { NavLink } from "react-router-dom";
import { FiSearch, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import { MdDashboard,MdManageAccounts,MdAssignment,MdAllInbox} from "react-icons/md";

const ManageIPO = () => {
  // Sample IPO data
  const ipoData = [
    {
      company: "Adam1 Power",
      priceBand: "¥ 329 - 136",
      open: "2023-06-03",
      close: "2024-06-05",
      issueSize: "4553015 Cr.",
      issueType: "Book Built",
      listingDate: "2023-06-10",
      status: "Ongoing"
    },
    {
      company: "VBL LTD",
      priceBand: "¥ 229 - 136",
      open: "2024-06-03",
      close: "2024-06-05",
      issueSize: "133015 Cr.",
      issueType: "Book Built",
      listingDate: "2018-06-10",
      status: "Comming"
    },
    // Add more data as needed
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'ongoing':
        return 'bg-blue-100 text-blue-800';
      case 'comming':
        return 'bg-yellow-100 text-yellow-800';
      case 'new listed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AdminNavbar />
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-[15%] bg-[#f1f2f7] p-4">
          <div className="mb-8">
            <div className="text-gray-500 uppercase text-xs font-semibold mb-2">Menu</div>
            <nav className="space-y-1">
              <NavLink 
                to={'/admin/dashboard'} 
                className="block px-3 py-2 rounded text-[#787f89] hover:bg-[#e4e7f5] hover:text-[#707fdd]"
                activeClassName="bg-[#e0e1e6] font-medium"
              >
                Dashboard
              </NavLink>
              <NavLink 
                to={'/admin/manage-ipo'} 
                className="block px-3 py-2 rounded text-[#787f89] hover:bg-[#e4e7f5] hover:text-[#707fdd]"
                activeClassName="bg-[#e0e1e6] font-medium"
              >
                Manage IPO
              </NavLink>
              <NavLink 
                to={'/admin/IPO_Subscription'} 
                className="block px-3 py-2 rounded text-[#787f89] hover:bg-[#e4e7f5] hover:text-[#707fdd]"
                activeClassName="bg-[#e0e1e6] font-medium"
              >
                IPO subscription
              </NavLink>
              <NavLink 
                to={'/admin/IPO_Allotment'} 
                className="block px-3 py-2 rounded text-[#787f89] hover:bg-[#e4e7f5] hover:text-[#707fdd]"
                activeClassName="bg-[#e0e1e6] font-medium"
              >
                IPO Allotment
              </NavLink>
            </nav>
          </div>
          
          <div>
            <div className="text-gray-500 uppercase text-xs font-semibold mb-2">Other</div>
            <nav className="space-y-1">
              <NavLink 
                to={'/admin/setting'} 
                className="block px-3 py-2 rounded text-[#787f89] hover:bg-[#e4e7f5] hover:text-[#707fdd]"
                activeClassName="bg-[#e0e1e6] font-medium"
              >
                Setting
              </NavLink>
              <NavLink 
                to={'/admin/api-manager'} 
                className="block px-3 py-2 rounded text-[#787f89] hover:bg-[#e4e7f5] hover:text-[#707fdd]"
                activeClassName="bg-[#e0e1e6] font-medium"
              >
                API Manager
              </NavLink>
              <NavLink 
                to={'/admin/account'} 
                className="block px-3 py-2 rounded text-[#787f89] hover:bg-[#e4e7f5] hover:text-[#707fdd]"
                activeClassName="bg-[#e0e1e6] font-medium"
              >
                Account
              </NavLink>
              <NavLink 
                to={'/admin/help'} 
                className="block px-3 py-2 rounded text-[#787f89] hover:bg-[#e4e7f5] hover:text-[#707fdd]"
                activeClassName="bg-[#e0e1e6] font-medium"
              >
                Help
              </NavLink>
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">Upcoming IPO | Dashboard</h1>
          
          {/* Search and Filter Bar */}
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-64">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a67ba]"
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <div className="text-[#5a6acf] bg-[#fbfcfe] shadow px-4 py-2 rounded-lg hover:bg-[#4a56a8] hover:text-[#fbfcfe]">
              <NavLink to={'/admin/Register_IPO'}>Register IPO</NavLink>
            </div>
          </div>
          
          {/* IPO Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Band</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Open</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Close</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Listing Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete/View</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {ipoData.map((ipo, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ipo.company}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ipo.priceBand}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ipo.open}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ipo.close}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ipo.issueSize}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ipo.issueType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ipo.listingDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(ipo.status)}`}>
                          {ipo.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-[#5a67ba] hover:text-[#4a56a8]">
                          <FiEdit2 className="h-5 w-5" />
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button className="text-red-500 hover:text-red-700">
                            <FiTrash2 className="h-5 w-5" />
                          </button>
                          <button className="text-green-500 hover:text-green-700">
                            <FiEye className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageIPO;