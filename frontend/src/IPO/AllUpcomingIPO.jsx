import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { NavLink } from 'react-router-dom';
import { FiPlus, FiMinus } from 'react-icons/fi';
import axios from '../api/Axios';

const AllUpcomingIPO = () => {
  const [upcomingIPOs, setUpcomingIPOs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  
  // Fetch IPO data from backend
  useEffect(() => {
    const fetchUpcomingIPOs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/ipos/upcoming');
        setUpcomingIPOs(response.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch upcoming IPOs:', err);
        setError('Failed to load IPO data. Please try again later.');
        setUpcomingIPOs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingIPOs();
  }, []);

  const faqs = [
    {
      question: "How to Subscribe to an IPO?",
      answer: "You can subscribe to an IPO through your bank's net banking portal, trading account, or via UPI using ASBA (Applications Supported by Blocked Amount) method."
    },
    {
      question: "Should I buy an IPO first day?",
      answer: "The decision depends on market conditions and the company's fundamentals. Some investors prefer to wait and see the initial performance before investing."
    },
    {
      question: "How do you know if an IPO is good?",
      answer: "Evaluate the company's financials, business model, growth prospects, valuation compared to peers, and the purpose of the IPO (whether funds are for growth or just investor exit)."
    },
    {
      question: "How to check IPO start date?",
      answer: "IPO dates are published in the Red Herring Prospectus (RHP) and can be found on SEBI's website, stock exchange websites, or financial news portals."
    },
    {
      question: "What is issue size?",
      answer: "Issue size refers to the total value of shares being offered in the IPO, calculated as the number of shares multiplied by the price band."
    },
    {
      question: "How many shares in a lot?",
      answer: "The lot size varies for each IPO and is specified in the prospectus. It represents the minimum number of shares you can bid for in the IPO."
    },
    {
      question: "How is the lot size calculated?",
      answer: "Lot size is determined by the company and its bankers to ensure retail investors can participate while maintaining orderly market operations."
    },
    {
      question: "Who decides the IPO price band?",
      answer: "The price band is decided by the company in consultation with its merchant bankers based on valuation parameters and market conditions."
    },
    {
      question: "What is IPO GMP?",
      answer: "GMP (Grey Market Premium) is the premium at which IPO shares are traded in the grey market before listing, indicating investor demand."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
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
    if (!dateString || dateString === "Not Issued") return dateString;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // Skeleton loader for IPO cards
  const SkeletonIPOCard = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      <div className="p-5">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-gray-200 rounded-lg"></div>
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <div className="h-3 bg-gray-200 rounded w-3/4 mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <div className="h-3 bg-gray-200 rounded w-3/4 mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className='flex gap-3 mt-6'>
          <div className="bg-gray-200 h-9 rounded-lg w-1/2"></div>
          <div className="bg-gray-200 h-9 rounded-lg w-1/2"></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className='px-4 md:px-10 py-6'>

        {/* Breadcrumb */}
        <div className='flex flex-wrap gap-2 my-3 text-sm'>
          <NavLink to="/" className='text-[#0000ff] hover:underline'>Bluestock</NavLink>
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

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p>{error}</p>
          </div>
        )}

        {/* IPO Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Show skeleton loaders while loading
            [...Array(6)].map((_, index) => (
              <SkeletonIPOCard key={index} />
            ))
          ) : (
            // Show actual IPO cards when data is loaded
            upcomingIPOs.map((ipo, index) => (
              <div 
                key={ipo.id || index} 
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden"
              >
                <div className="p-5">
                  {/* Company Header */}
                  <div className="flex items-center gap-4 mb-6">
                    {ipo.logo ? (
                      <img
                        src={ipo.logo}
                        alt={`${ipo.name} logo`}
                        className="w-14 h-14 object-contain rounded-lg border border-gray-200 p-1"
                        onError={(e) => {
                          e.target.src = '/default-ipo-logo.png';
                          e.target.onerror = null;
                        }}
                      />
                    ) : (
                      <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No Logo</span>
                      </div>
                    )}
                    <h2 className="font-bold text-lg text-gray-800">{ipo.name}</h2>
                  </div>
                  
                  {/* IPO Details */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Price Band</p>
                        <p className="font-semibold text-gray-800 mt-1">{ipo.priceBand || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Issue Size</p>
                        <p className="font-semibold text-gray-800 mt-1">{ipo.issueSize || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Open Date</p>
                        <p className="font-semibold text-gray-800 mt-1">{formatDate(ipo.open)}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Close Date</p>
                        <p className="font-semibold text-gray-800 mt-1">{formatDate(ipo.close)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Issue Type</p>
                        <p className="font-semibold text-gray-800 mt-1">{ipo.issueType || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Listing Date</p>
                        <p className="font-semibold text-gray-800 mt-1">{formatDate(ipo.listingDate)}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className='flex gap-3 mt-6'>
                    <NavLink 
                      to={`/rhp/${ipo.id}`} 
                      className="bg-blue-50 text-[#0000ff] hover:bg-blue-100 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                    >
                      View RHP
                    </NavLink>
                    <NavLink 
                      to={`/drhp/${ipo.id}`} 
                      className="bg-blue-50 text-[#0000ff] hover:bg-blue-100 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                    >
                      View DRHP
                    </NavLink>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div className='py-14 px-4 md:px-10 bg-gray-50'>
        <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>Frequently Asked Questions</h1>
        <p className='text-sm text-gray-600 mb-8'>Find answers to common questions that come in your mind related to IPO.</p>

        <div className='space-y-4'>
          {faqs.map((faq, index) => (
            <div key={index} className='bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition-all duration-200'>
              <div 
                className='flex items-center justify-between cursor-pointer py-2'
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h2 className='text-base md:text-lg font-semibold text-gray-800'>{faq.question}</h2>
                {activeIndex === index ? 
                  <FiMinus className='text-xl text-[#1740aa]' /> : 
                  <FiPlus className='text-xl text-[#5c8bfe]' />
                }
              </div>

              {activeIndex === index && (
                <div id={`faq-answer-${index}`} className='text-gray-600 mt-2 pl-1'>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllUpcomingIPO;
