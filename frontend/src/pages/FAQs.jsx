import React, { useState } from 'react';

const FAQs = () => {
  const faqData = [
    {
      question: "How long does shipping take?",
      answer: "We offer worldwide shipping. Domestic orders typically arrive within 2-3 business days, while international orders take between 7-14 business days depending on customs and shipping options selected at checkout."
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
      answer: "We accept all major credit and debit cards (Visa, MasterCard, American Express, and Discover) and securely process transactions using Stripe. All transactions are fully encrypted and protected."
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
    <div className="max-w-4xl mx-auto px-6 py-16 bg-white">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-black uppercase tracking-wider text-black mb-4">Frequently Asked Questions</h1>
        <p className="text-xs text-neutral-500 tracking-wide font-medium max-w-xl mx-auto leading-relaxed">
          Need quick answers? Browse our most common questions about orders, shipping, and returns.
        </p>
      </div>

      <div className="space-y-4 max-w-3xl mx-auto">
        {faqData.map((faq, index) => {
          const isOpen = activeIndex === index;
          return (
            <div key={index} className="border border-neutral-200 rounded-none overflow-hidden bg-white shadow-none transition-all duration-300 hover:border-black">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-5 text-left font-bold uppercase tracking-wider text-xs text-black hover:bg-neutral-50 focus:outline-none transition-colors duration-300"
              >
                <span>{faq.question}</span>
                <span className={`transform transition-transform duration-300 text-lg font-light ${isOpen ? 'rotate-45 text-black' : 'text-neutral-400'}`}>
                  ＋
                </span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 border-t border-neutral-100' : 'max-h-0'
                  }`}
              >
                <div className="p-5 text-neutral-500 text-xs tracking-wider leading-relaxed bg-white">
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

