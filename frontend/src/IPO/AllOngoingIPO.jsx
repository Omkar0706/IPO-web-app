import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { NavLink } from 'react-router-dom';
import { FiPlus, FiMinus } from 'react-icons/fi';

const AllOngoingIPO = () => {
  const [ongoingIPOs, setOngoingIPOs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIPOs = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/ipo/');
        const data = await response.json();
        const ongoing = data.filter(ipo => ipo.status === 'ongoing');
        setOngoingIPOs(ongoing);
      } catch (err) {
        setError('Failed to load IPO data');
      } finally {
        setLoading(false);
      }
    };

    fetchIPOs();
  }, []);

  const faqs = [
    { question: "What is an ongoing IPO?", answer: "An ongoing IPO is one that is currently open for public subscription." },
    { question: "Can I apply multiple times?", answer: "You can apply only once per PAN number." },
    { question: "How do I apply?", answer: "You can apply through your broker or UPI-enabled apps." },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === "Not Issued") return "Not Issued";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <>
      <Navbar />
      <div className='px-4 md:px-10 py-6'>

        {/* Breadcrumb */}
        <div className='flex flex-wrap gap-2 my-3 text-sm'>
          <h1 className='text-[#0000ff] hover:underline'>Bluestock</h1>
          <span>{'>'}</span>
          <NavLink to="/" className='text-[#0000ff] hover:underline'>IPO</NavLink>
          <span>{'>'}</span>
          <span className='font-medium text-gray-600'>ONGOING IPO</span>
        </div>

        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>Ongoing IPOs</h1>
          <p className='text-gray-600 mt-2 max-w-3xl'>
            Explore IPOs that are currently open for subscription.
          </p>
        </div>

        {loading && <p className="text-gray-500">Loading IPOs...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* IPO Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ongoingIPOs.map((ipo, index) => (
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
                      <p className="text-xs text-gray-500 uppercase font-medium">Price Band</p>
                      <p className="font-semibold text-gray-800 mt-1">{ipo.price_band}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">Issue Size</p>
                      <p className="font-semibold text-gray-800 mt-1">{ipo.issue_size}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">Open Date</p>
                      <p className="font-semibold text-gray-800 mt-1">{formatDate(ipo.open_date)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">Close Date</p>
                      <p className="font-semibold text-gray-800 mt-1">{formatDate(ipo.close_date)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">Issue Type</p>
                      <p className="font-semibold text-gray-800 mt-1">{ipo.issue_type}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">Listing Date</p>
                      <p className="font-semibold text-gray-800 mt-1">{formatDate(ipo.listing_date)}</p>
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

      {/* FAQ Section */}
      <div className='py-14 px-10'>
        <h1 className='text-3xl font-bold'>Frequently Asked Questions?</h1>
        <p className='text-sm font-thin mb-8'>Answers about ongoing IPOs you might want to know.</p>

        <div className='space-y-4'>
          {faqs.map((faq, index) => (
            <div key={index} className='bg-[#F4F3F9] p-4 rounded-lg shadow-md'>
              <div className='flex items-center justify-between cursor-pointer py-2' onClick={() => toggleFAQ(index)}>
                <h2 className='text-lg font-semibold text-black'>{faq.question}</h2>
                {activeIndex === index ? (
                  <FiMinus className='text-xl text-[#1740aa]' />
                ) : (
                  <FiPlus className='text-xl text-[#5c8bfe]' />
                )}
              </div>
              {activeIndex === index && <p className='text-gray-600 mt-2'>{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllOngoingIPO;
