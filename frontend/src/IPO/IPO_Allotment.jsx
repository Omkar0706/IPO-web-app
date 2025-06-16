import React from 'react';
import AdminNavbar from '../components/AdminNavbar';
import { NavLink } from "react-router-dom";
import { FiSearch, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';

const IPO_Allotment = () => {

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
      </div>
    </div>
  );
};

export default IPO_Allotment;