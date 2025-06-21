import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <>
      <div className='w-[16%] bg-[#f1f2f7] h-screen'>
        <div className='h-16 py-4 text-center'>
            <h1 className='text-[#5a67ba] text-xl font-bold '>Bluestock Fintech</h1>
        </div>

        <div className='w-full bg-[#c8cbd9] h-px'></div>

        <div className="flex-col">
        {/* Sidebar */}
            <div className="bg-[#f1f2f7] p-4">
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
                        to={'/admin/Manage_IPO'} 
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
    </>
  );
};

export default AdminNavbar;