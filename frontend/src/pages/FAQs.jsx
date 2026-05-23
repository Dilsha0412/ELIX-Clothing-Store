import React, { useState } from 'react';

const FAQs = () => {
  const faqData = [
    {
      question: "How long does shipping take?",
      answer: "We offer worldwide shipping. Domestic orders typically arrive within 3-5 business days, while international orders take between 7-14 business days depending on customs and shipping options selected at checkout."
    },
    {
      question: "What is your return policy?",
      answer: "We support a 30-day hassle-free return policy. If you are not completely satisfied with your purchase, you can return items within 30 days of receiving them for a full refund or exchange. Items must be unworn, unwashed, and in their original packaging with tags attached."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is processed and shipped, you will receive an email containing your tracking number and a link to track your shipment. You can also view order updates from your profile page's 'My Orders' section."
    },
    {
      question: "Which payment methods do you accept?",
      answer: "We accept all major credit and debit cards (Visa, MasterCard, American Express) and securely process transactions using PayPal. All transactions are fully encrypted and protected."
    },
    {
      question: "Do you offer sizing charts?",
      answer: "Yes, sizing charts are available on every product page to help you choose the best fit. If you are between sizes, we generally recommend sizing up for a more comfortable fit, or sizing down for a fitted look."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Need quick answers? Browse our most common questions about orders, shipping, and returns.
        </p>
      </div>

      <div className="space-y-4">
        {faqData.map((faq, index) => {
          const isOpen = activeIndex === index;
          return (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all duration-200">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-5 text-left font-medium text-gray-800 hover:bg-gray-50 focus:outline-none transition-colors"
              >
                <span>{faq.question}</span>
                <span className={`transform transition-transform duration-200 text-xl font-light ${isOpen ? 'rotate-45 text-red-500' : 'text-gray-400'}`}>
                  ＋
                </span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? 'max-h-40 border-t border-gray-100' : 'max-h-0'
                }`}
              >
                <div className="p-5 text-gray-600 text-sm leading-relaxed bg-gray-50">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQs;
