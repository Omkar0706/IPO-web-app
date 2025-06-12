import {useState} from 'react'
import { FiPlus, FiMinus } from 'react-icons/fi';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is an IPO?",
      answer: "IPO or the Initial Public Offering is the first time a company issues its shares to the public. As an investor, you will now be able to subscribe for such shares, which was earlier open to only a specific lot of internal and institutional investors via opening a Demat account."
    },
    {
      question: "How to invest in an IPO?",
      answer: "To invest in an IPO, you need to have a Demat account and a trading account. You can apply for shares through your broker's platform or through your net banking facility when the IPO is open for subscription."
    },
    {
      question: "What is the benefit of an IPO?",
      answer: "Investing in an IPO can provide you with the opportunity to buy shares at a potentially lower price before they are traded on the stock exchange. It can also be a way to invest in a company that you believe has strong growth potential."
    },
    {
      question: "What are the disadvantages of an IPO?",
      answer: ""
    },
    {
      question: "What is the difference between book building issue and fixed price issue?",
      answer: ""
    },
    {
      question: "Is it mandatory to have a PAN number to apply in an IPO?",
      answer: ""
    },
    {
      question: "Where do I get an IPO application form?",
      answer: ""
    },
    {
      question: "How one can apply in IPO’s online?",
      answer: ""
    },
    {
      question: "Can a minor apply in an IPO?",
      answer: ""
    },
    {
      question: "What is the procedure to withdraw from an IPO?",
      answer: ""
    },
    {
      question: "How is IPO return calculated?",
      answer: ""
    },
    {
      question: "Can one apply for an IPO from a sweep in/out saving bank account?",
      answer: ""
    },
    {
      question: "What is the minimum and maximum investment one could do in the HNI category?",
      answer: ""
    },
    {
      question: "How to apply more than one application in an IPO?",
      answer: ""
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className='py-14'>
      <h1 className='text-3xl font-bold'>Frequently Asked Questions?</h1>
      <p className='text-sm font-thin mb-8'>Find answers to common questions that come in your mind related to IPO.</p>

      <div className='space-y-4'>
        {faqs.map((faq, index) => (
          <div key={index} className='bg-[#F4F3F9] p-4 rounded-lg shadow-md'>
            <div 
              className='flex items-center justify-between cursor-pointer py-2' 
              onClick={() => toggleFAQ(index)}
            >
              <h2 className='text-lg font-semibold text-black'>{faq.question}</h2>
              {activeIndex === index ? <FiMinus className='text-xl text-[#1740aa]' /> : <FiPlus className='text-xl text-[#5c8bfe]' />}
            </div>
            {activeIndex === index && (
              <p className='text-gray-600 mt-2'>{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQSection
