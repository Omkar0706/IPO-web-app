import {useState} from 'react'
import Navbar from '../components/Navbar'
import { NavLink } from 'react-router-dom';
import { FiPlus, FiMinus } from 'react-icons/fi';

const AllUpcomingIPO = () => {
  const upcomingIPOs = [
    {
      name: "Nova Agritech Ltd.",
      logo: "/nova_agritech.png",
      priceBand: "₹39 - 41",
      open: "2024-01-22",
      close: "2024-01-24",
      issueSize: "143.81 Cr.",
      issueType: "Book Built",
      listingDate: "2024-01-30",
      rhp: "DRHP",
    },
    {
      name: "EPACK Durable Ltd.",
      logo: "/EPACK_LTD.jpeg",
      priceBand: "₹28 - 230",
      open: "2024-01-19",
      close: "2024-01-23",
      issueSize: "640.05 Cr.",
      issueType: "Book Built",
      listingDate: "2024-01-29",
    },
    {
      name: "R K SWAMP RK Swarmy Ltd.",
      logo: "/RKSWAMY.jpeg",
      priceBand: "Not Issued",
      open: "Not Issued",
      close: "Not Issued",
      issueSize: "Not Issued",
      issueType: "Book Built",
      listingDate: "Not Issued"
    },
    {
      name: "Tech Innovations Ltd.",
      logo: "/TechInnov.png",
      priceBand: "₹50 - 55",
      open: "2024-02-01",
      close: "2024-02-05",
      issueSize: "200.00 Cr.",
      issueType: "Book Built",
      listingDate: "2024-02-12"
    },
    {
      name: "Green Energy Solutions",
      logo: "/GreenEnergy.png",
      priceBand: "₹75 - 80",
      open: "2024-02-10",
      close: "2024-02-14",
      issueSize: "350.50 Cr.",
      issueType: "Book Built",
      listingDate: "2024-02-21"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  
    const faqs = [
      {
        question: "How to Subscribe to an IPO?",
        answer: ""
      },
      {
        question: "Should I buy an IPO first day?",
        answer: ""
      },
      {
        question: "How do you know if an IPO is good?",
        answer: ""
      },
      {
        question: "How to check IPO start date?",
        answer: ""
      },
      {
        question: "What is issue size?",
        answer: ""
      },
      {
        question: "How many shares in a lot?",
        answer: ""
      },
      {
        question: "How is the lot size calculated?",
        answer: ""
      },
      {
        question: "Who decides the IPO price band?",
        answer: ""
      },
      {
        question: "What is IPO GMP?",
        answer: ""
      }
    ];
  
    const toggleFAQ = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };

  const formatDate = (dateString) => {
    if (dateString === "Not Issued") return dateString;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <>
      <Navbar/>
      <div className='px-4 md:px-10 py-6'>
        {/* Breadcrumb */}
        <div className='flex flex-wrap gap-2 my-3 text-sm'>
          <NavLink to="/" className='text-[#0000ff] hover:underline'>Bluestock</NavLink>
          <span>{'>'}</span>
          <NavLink to="/ipo" className='text-[#0000ff] hover:underline'>IPO</NavLink>
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
                  {ipo.logo ? (
                    <img
                      src={ipo.logo}
                      alt={`${ipo.name} logo`}
                      className="w-14 h-14 object-contain rounded-lg border border-gray-200 p-1"
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
                      <p className="font-semibold text-gray-800 mt-1">{ipo.priceBand}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Issue Size</p>
                      <p className="font-semibold text-gray-800 mt-1">{ipo.issueSize}</p>
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
                      <p className="font-semibold text-gray-800 mt-1">{ipo.issueType}</p>
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

        <div className='py-14 px-10'>
            <h1 className='text-3xl font-bold'>Frequently Asked Questions?</h1>
            <p className='text-sm font-thin mb-8'>Find answers to common questions that come in your mind related to IPO.</p>

            <div className='space-y-4'>
                {faqs.map((faq, index) => (
                <div key={index} className='bg-[#F4F3F9] p-4 rounded-lg shadow-md'>
                    <div className='flex items-center justify-between cursor-pointer py-2' onClick={() => toggleFAQ(index)}>
                        <h2 className='text-lg font-semibold text-black'>{faq.question}</h2>
                        {activeIndex === index ? <FiMinus className='text-xl text-[#1740aa]' /> : <FiPlus className='text-xl text-[#5c8bfe]' />}
                    </div>

                    {activeIndex === index && (<p className='text-gray-600 mt-2'>{faq.answer}</p>)}
                </div>
                ))}
            </div>
        </div>
    </>
  )
}

export default AllUpcomingIPO;
