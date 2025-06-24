import React, { useState } from 'react'; // Import useState
import { BsInfoCircle, BsClipboardCheck } from 'react-icons/bs';

const IPOSidebar = () => {
  // State to manage the active item. Initialize with 'ipo-information' as default.
  const [activeItem, setActiveItem] = useState('ipo-information');

  const getButtonClasses = (itemName) => {
    return `flex items-center gap-3 text-lg p-2 rounded-lg transition-colors duration-200 ease-in-out
      ${activeItem === itemName
        ? 'bg-[#e5ecfb] text-[#0240bc] font-semibold' // Active state
        : 'text-gray-700 hover:bg-[#e5ecfb] hover:text-[#0240bc] font-medium' // Inactive state (with hover)
      }`;
  };

  return (
    <div className='w-64 bg-white p-6 shadow-md'>
      <ul className='space-y-4'>
        <li>
          <button
            onClick={() => setActiveItem('ipo-information')}
            className={getButtonClasses('ipo-information')}
          >
            <BsInfoCircle className="h-6 w-6" />
            IPO Information
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveItem('ipo-info')}
            className={getButtonClasses('ipo-info')}
          >
            <BsClipboardCheck className="h-6 w-6" />
            IPO Info
          </button>
        </li>
      </ul>
    </div>
  );
};

export default IPOSidebar;