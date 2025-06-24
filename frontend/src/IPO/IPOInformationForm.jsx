import React, { useState } from 'react';

const IPOInformationForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    priceBand: '',
    openDate: '',
    closeDate: '',
    issueSize: '',
    issueType: 'Select Type',
    listingDate: '',
    status: 'Select Status',
    ipoPrice: '',
    listingPrice: '',
    listingGain: '',
    newListedListingDate: '',
    cmp: '',
    currentReturn: '',
    rhpLink: '',
    drhpLink: '',
    companyLogo: {
      src: "https://placehold.co/60x60/AEC6CF/000000?text=Logo",
      alt: "Company Logo",
      name: "Company Name",
      team: "Team",
      location: "Location"
    }
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleLogoUpload = () => {
    console.log('Upload Logo functionality would go here!');
  };

  const handleLogoDelete = () => {
    setFormData(prevData => ({
      ...prevData,
      companyLogo: {
        src: "https://placehold.co/60x60/CCCCCC/000000?text=No+Image",
        alt: "No Image",
        name: "",
        team: "",
        location: ""
      }
    }));
  };

  return (
    <div className='flex-1 p-8 bg-white rounded-lg shadow-md mr-8'>
      <h2 className='text-2xl font-semibold mb-6 text-gray-800'>IPO Information</h2>
      <p className='text-gray-600 mb-8'>Enter IPO Details</p>

      {/* Company Logo */}
      <div className='mb-8'>
        <label className='block text-gray-700 text-lg font-medium mb-3'>Company Logo</label>
        <div className='flex items-center space-x-4'>
          <div className='w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border border-gray-300 overflow-hidden'>
            <img
              src={formData.companyLogo.src}
              alt={formData.companyLogo.alt}
              className="object-cover w-full h-full p-2"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/60x60/CCCCCC/000000?text=No+Image"; }}
            />
          </div>
          <div>
            <p className='text-lg font-medium text-gray-800'>{formData.companyLogo.name || 'Company Name'}</p>
            <p className='text-gray-500 text-sm'>{formData.companyLogo.team || 'Team'}</p>
            <p className='text-gray-500 text-sm'>{formData.companyLogo.location || 'Location'}</p>
          </div>
          <button
            onClick={handleLogoUpload}
            className='bg-[#e0effe] text-[#4f80e1] font-medium py-2 px-4 rounded-lg border border-[#4f80e1] hover:bg-[#d0eafb]'
          >
            Upload Logo
          </button>
          <button
            onClick={handleLogoDelete}
            className='bg-red-100 text-red-600 font-medium py-2 px-4 rounded-lg border border-red-400 hover:bg-red-200'
          >
            Delete
          </button>
        </div>
      </div>

      {/* IPO Details */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-8'>
        <div>
          <label htmlFor="companyName" className='block text-gray-700 text-md font-medium mb-2'>Company Name</label>
          <input
            id="companyName"
            type='text'
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f80e1]'
            value={formData.companyName}
            onChange={handleChange}
            placeholder='Enter Company Name'
          />
        </div>
        <div>
          <label htmlFor="priceBand" className='block text-gray-700 text-md font-medium mb-2'>Price Band</label>
          <input
            id="priceBand"
            type='text'
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f80e1]'
            value={formData.priceBand}
            onChange={handleChange}
            placeholder='Enter Price Band'
          />
        </div>
        <div>
          <label htmlFor="openDate" className='block text-gray-700 text-md font-medium mb-2'>Open</label>
          {/* Changed to date type for date inputs */}
          <input
            id="openDate"
            type='date'
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f80e1]'
            value={formData.openDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="closeDate" className='block text-gray-700 text-md font-medium mb-2'>Close</label>
          {/* Changed to date type for date inputs */}
          <input
            id="closeDate"
            type='date'
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f80e1]'
            value={formData.closeDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="issueSize" className='block text-gray-700 text-md font-medium mb-2'>Issue Size</label>
          <input
            id="issueSize"
            type='text'
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f80e1]'
            value={formData.issueSize}
            onChange={handleChange}
            placeholder='Enter Issue Size (e.g., 2300 Cr.)'
          />
        </div>
        <div>
          <label htmlFor="issueType" className='block text-gray-700 text-md font-medium mb-2'>Issue Type</label>
          <select
            id="issueType"
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f80e1] appearance-none bg-white'
            value={formData.issueType}
            onChange={handleChange}
          >
            <option value="Select Type">Select Type</option>
            <option value="Mainboard IPO">Mainboard IPO</option>
            <option value="SME IPO">SME IPO</option>
          </select>
        </div>
        <div>
          <label htmlFor="listingDate" className='block text-gray-700 text-md font-medium mb-2'>Listing Date</label>
          {/* Changed to date type for date inputs */}
          <input
            id="listingDate"
            type='date'
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f80e1]'
            value={formData.listingDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="status" className='block text-gray-700 text-md font-medium mb-2'>Status</label>
          <select
            id="status"
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f80e1] appearance-none bg-white'
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Select Status">Select Status</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="Listed">Listed</option>
          </select>
        </div>
      </div>

      {/* New Listed IPO Details */}
      <h3 className='text-xl font-semibold mb-6 text-gray-800'>NEW LISTED IPO DETAILS (WHEN IPO GET LISTED)</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-8'>
        <div>
          <label htmlFor="ipoPrice" className='block text-gray-700 text-md font-medium mb-2'>IPO Price</label>
          <div className='relative'>
            <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500'>₹</span>
            {/* Changed to number type for price inputs */}
            <input
              id="ipoPrice"
              type='number'
              className='w-full p-3 pl-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f80e1]'
              value={formData.ipoPrice}
              onChange={handleChange}
              placeholder='Enter IPO Price'
            />
          </div>
        </div>
        <div>
          <label htmlFor="listingPrice" className='block text-gray-700 text-md font-medium mb-2'>Listing Price</label>
          <div className='relative'>
            <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500'>₹</span>
            {/* Changed to number type for price inputs */}
            <input
              id="listingPrice"
              type='number'
              className='w-full p-3 pl-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f80e1]'
              value={formData.listingPrice}
              onChange={handleChange}
              placeholder='Enter Listing Price'
            />
          </div>
        </div>
        <div>
          <label htmlFor="listingGain" className='block text-gray-700 text-md font-medium mb-2'>Listing Gain</label>
          <input
            id="listingGain"
            type='text' // Kept as text to allow '%' sign
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f80e1]'
            value={formData.listingGain}
            onChange={handleChange}
            placeholder='Enter Listing Gain (e.g., 13.58 %)'
          />
        </div>
        <div>
          <label htmlFor="newListedListingDate" className='block text-gray-700 text-md font-medium mb-2'>Listing Date</label>
          {/* Changed to date type for date inputs */}
          <input
            id="newListedListingDate"
            type='date'
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f80e1]'
            value={formData.newListedListingDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="cmp" className='block text-gray-700 text-md font-medium mb-2'>CMP</label>
          <div className='relative'>
            <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500'>₹</span>
            {/* Changed to number type for price inputs */}
            <input
              id="cmp"
              type='number'
              className='w-full p-3 pl-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f80e1]'
              value={formData.cmp}
              onChange={handleChange}
              placeholder='Enter Current Market Price'
            />
          </div>
        </div>
        <div>
          <label htmlFor="currentReturn" className='block text-gray-700 text-md font-medium mb-2'>Current Return</label>
          <input
            id="currentReturn"
            type='text' // Kept as text to allow '%' sign
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f80e1]'
            value={formData.currentReturn}
            onChange={handleChange}
            placeholder='Enter Current Return (e.g., 7.05 %)'
          />
        </div>
        <div>
          <label htmlFor="rhpLink" className='block text-gray-700 text-md font-medium mb-2'>RHP</label>
          {/* Changed to url type for links */}
          <input
            id="rhpLink"
            type='url'
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f80e1]'
            placeholder='Enter RHP PDF Link'
            value={formData.rhpLink}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="drhpLink" className='block text-gray-700 text-md font-medium mb-2'>DRHP</label>
          {/* Changed to url type for links */}
          <input
            id="drhpLink"
            type='url'
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f80e1]'
            placeholder='Enter DRHP PDF Link'
            value={formData.drhpLink}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default IPOInformationForm;
