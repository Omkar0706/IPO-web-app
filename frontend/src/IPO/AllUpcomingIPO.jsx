import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { NavLink } from 'react-router-dom';
import { FiPlus, FiMinus } from 'react-icons/fi';

const AllUpcomingIPO = () => {
  const [upcomingIPOs, setUpcomingIPOs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch data from Django backend
  useEffect(() => {
    const fetchIPOs = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/ipo/');
        const data = await response.json();
        const upcoming = data.filter(ipo => ipo.status === 'upcoming');
        setUpcomingIPOs(upcoming);
      } catch (err) {
        setError('Failed to load IPO data');
      } finally {
        setLoading(false);
      }
    };

    fetchIPOs();
  }, []);

const faqs = [
  {
    question: "How to Subscribe to an IPO?",
    answer: "You can subscribe to an IPO through your broker’s trading platform or via UPI-supported apps by submitting a bid application during the open IPO window."
  },
  {
    question: "Should I buy an IPO first day?",
    answer: "Buying on the first day depends on your risk appetite. Some IPOs get heavily subscribed and list at a premium, while others may not perform well. Always analyze fundamentals before investing."
  },
  {
    question: "How do you know if an IPO is good?",
    answer: "A good IPO usually has strong financials, a solid business model, industry potential, and fair pricing. Check the DRHP, company profits, and grey market premium (GMP) before deciding."
  },
  {
    question: "How to check IPO start date?",
    answer: "IPO start dates are available on official stock exchange websites like NSE/BSE, or through your broker’s IPO section. It's also published in financial news portals and the company's RHP."
  },
  {
    question: "What is issue size?",
    answer: "Issue size refers to the total value of shares being offered by the company during the IPO. It’s calculated by multiplying the total number of shares by the price per share."
  },
  {
    question: "How many shares in a lot?",
    answer: "The number of shares in a lot varies per IPO and is defined by the company. Typically, one lot can have 10 to 100+ shares, and retail investors must bid in whole lots."
  },
  {
    question: "How is the lot size calculated?",
    answer: "Lot size is determined by the company and SEBI to maintain a minimum investment threshold (often ₹14,000–₹15,000). It is calculated by dividing that amount by the IPO price."
  },
  {
    question: "Who decides the IPO price band?",
    answer: "The IPO price band is decided by the company and its book-running lead managers (BRLMs), based on market conditions, valuations, and investor interest."
  },
  {
    question: "What is IPO GMP?",
    answer: "IPO GMP (Grey Market Premium) is the premium at which IPO shares are traded unofficially before listing. It indicates investor sentiment but is not an official or guaranteed price."
  }
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
          <span className='font-medium text-gray-600'>UPCOMING IPO</span>
        </div>

        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>Upcoming IPOs</h1>
          <p className='text-gray-600 mt-2 max-w-3xl'>
            Companies that have filed for an IPO with SEBI. Few details might be disclosed by the companies later on.
          </p>
        </div>

        {/* Loading/Error Handling */}
        {loading && <p className="text-gray-500">Loading IPOs...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* IPO Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingIPOs.map((ipo, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden"
            >
              <div className="p-5">
                {/* Company Header */}
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

                {/* IPO Details */}
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Price Band</p>
                      <p className="font-semibold text-gray-800 mt-1">{ipo.price_band}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Issue Size</p>
                      <p className="font-semibold text-gray-800 mt-1">{ipo.issue_size}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Open Date</p>
                      <p className="font-semibold text-gray-800 mt-1">{formatDate(ipo.open_date)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Close Date</p>
                      <p className="font-semibold text-gray-800 mt-1">{formatDate(ipo.close_date)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Issue Type</p>
                      <p className="font-semibold text-gray-800 mt-1">{ipo.issue_type}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Listing Date</p>
                      <p className="font-semibold text-gray-800 mt-1">{formatDate(ipo.listing_date)}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='flex gap-3 mt-6'>
                  <NavLink
                    to='/RHP'
                    className="bg-blue-50 text-[#0000ff] hover:bg-blue-100 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                  >
                    View RHP
                  </NavLink>
                  <NavLink
                    to='/DRHP'
                    className="bg-blue-50 text-[#0000ff] hover:bg-blue-100 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                  >
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
        <p className='text-sm font-thin mb-8'>Find answers to common questions that come in your mind related to IPO.</p>

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

              {activeIndex === index && (
                <p className='text-gray-600 mt-2'>{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllUpcomingIPO;
