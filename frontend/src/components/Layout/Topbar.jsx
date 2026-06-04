import React from 'react';

const Topbar = () => {
  const text = "15% on Your First Order — Clothing inspired by Happy Vibes — Free Shipping Worldwide — ";
  const repeatedText = Array(10).fill(text).join(" ");

  return (
    <div className='bg-[#ea2e0e] text-white py-2 overflow-hidden select-none border-b border-[#ea2e0e] group-marquee'>
      <div className='flex whitespace-nowrap min-w-full'>
        <div className='animate-marquee flex shrink-0 pr-4'>
          <span className='text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white'>
            {repeatedText}
          </span>
        </div>
        <div className='animate-marquee flex shrink-0 pr-4' aria-hidden='true'>
          <span className='text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white'>
            {repeatedText}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;