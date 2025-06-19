import React, { useEffect, useState } from 'react';

const IPO_Analysis = () => {
  const [ipos, setIPOs] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/ipo/')
      .then(res => res.json())
      .then(data => {
        const listed = data.filter(ipo => ipo.status === 'listed');
        setIPOs(listed.slice(0, 3));
      })
      .catch(err => console.error('Error fetching IPOs:', err));
  }, []);

  return (
    <div className='bg-white shadow-md p-4 sm:p-6 w-full lg:w-[48%]'>
      <h1 className='text-lg sm:text-xl font-bold mb-4'>IPO Analysis</h1>

      {ipos.length === 0 ? (
        <p className='text-sm text-gray-500'>No listed IPOs found.</p>
      ) : (
        ipos.map((ipo) => (
          <div key={ipo.id} className='mb-3'>
            <p className='font-medium text-sm text-gray-900'>
              {ipo.company_name} coming with IPO to raise upto Rs {ipo.issue_size}
            </p>
            <p className='text-xs text-gray-500'>
              {new Date(ipo.listing_date).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
              })},{' '}
              {new Date(ipo.listing_date).toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default IPO_Analysis;
