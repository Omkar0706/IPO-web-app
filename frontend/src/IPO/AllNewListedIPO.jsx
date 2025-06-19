import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { NavLink } from 'react-router-dom';

const AllNewListedIPO = () => {
  const [listedIPOs, setListedIPOs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListedIPOs = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/ipo/');
        const data = await response.json();
        const listed = data.filter(ipo => ipo.status === 'listed');
        setListedIPOs(listed);
      } catch (err) {
        setError('Failed to load listed IPOs.');
      } finally {
        setLoading(false);
      }
    };

    fetchListedIPOs();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Not Available";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <>
      <Navbar />
      <div className='px-4 md:px-10 py-6'>
        <div className='flex flex-wrap gap-2 my-3 text-sm'>
          <h1 className='text-[#0000ff] hover:underline'>Bluestock</h1>
          <span>{'>'}</span>
          <NavLink to="/" className='text-[#0000ff] hover:underline'>IPO</NavLink>
          <span>{'>'}</span>
          <span className='font-medium text-gray-600'>NEW LISTED IPO</span>
        </div>

        <div className='mb-8'>
          <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>Newly Listed IPOs</h1>
          <p className='text-gray-600 mt-2 max-w-3xl'>
            Explore companies that recently completed their IPO and got listed on the stock exchange.
          </p>
        </div>

        {loading && <p className="text-gray-500">Loading IPOs...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listedIPOs.map((ipo, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden">
              <div className="p-5">
                <div className="flex items-center gap-4 mb-6">
                  {ipo.company_logo ? (
                    <img
                      src={ipo.company_logo}
                      alt={`${ipo.company_name} logo`}
                      className="w-12 h-10 object-contain"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400 text-xs">No Logo</span>
                    </div>
                  )}
                  <h2 className="font-bold text-lg text-gray-800">{ipo.company_name}</h2>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">IPO Price</p>
                      <p className="font-semibold text-gray-800 mt-1">₹{ipo.ipo_price ?? '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">Listing Price</p>
                      <p className="font-semibold text-gray-800 mt-1">₹{ipo.listing_price ?? '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">Listing Gain</p>
                      <p className={`font-semibold mt-1 ${ipo.listing_gain > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {ipo.listing_gain != null ? `${ipo.listing_gain}%` : 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">Listing Date</p>
                      <p className="font-semibold text-gray-800 mt-1">{formatDate(ipo.listing_date)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">CMP</p>
                      <p className="font-semibold text-gray-800 mt-1">₹{ipo.current_market_price ?? 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">Current Return</p>
                      <p className={`font-semibold mt-1 ${ipo.current_return > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {ipo.current_return != null ? `${ipo.current_return}%` : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='flex gap-3 mt-6'>
                  <NavLink to='/RHP' className="bg-blue-50 text-[#0000ff] hover:bg-blue-100 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                    View RHP
                  </NavLink>
                  <NavLink to='/DRHP' className="bg-blue-50 text-[#0000ff] hover:bg-blue-100 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                    View DRHP
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllNewListedIPO;
