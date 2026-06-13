import React from 'react'
import { Link } from 'react-router-dom';
import featured from "../../assets/Gemini_Generated_Image_qsi73aqsi73aqsi7 (1).png"

const FeaturedCollection = () => {
  return (
    <section className='pt-16 pb-8 w-full px-4 sm:px-6 lg:px-8 max-w-[1750px] mx-auto bg-white'>
      <div className='w-full flex flex-col-reverse lg:flex-row items-stretch bg-[#F8F8F8] rounded-none border border-neutral-200 overflow-hidden shadow-none transition-all duration-300 group'>

        {/* Left Content */}
        <div className='lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center text-center lg:text-left'>
          <span className='text-xs font-bold tracking-widest text-neutral-400 uppercase mb-3 inline-block'>
            Elevated Basics & Everyday Essentials
          </span>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-wider text-black leading-tight mb-6'>
            The Essential T-Shirt, Perfected for You.
          </h2>
          <p className='text-base sm:text-lg text-neutral-600 mb-8 leading-relaxed font-light'>
            Upgrade your daily rotation with our premium collection of essential tees. Crafted from ultra-soft, breathable fabrics, each piece is designed to offer a flawless fit and enduring comfort. Whether layered or worn solo, these are the reliable staples your wardrobe has been waiting for.
          </p>

          <div className='mt-2'>
            <Link 
              to="/collections/all" 
              className="inline-block bg-black hover:bg-white hover:text-black text-white px-8 py-3.5 rounded-none text-xs font-bold uppercase tracking-widest border border-black hover:border-black transition-all duration-300 shadow-none cursor-pointer"
            >
              Explore Essentials
            </Link>
          </div>
        </div>

        {/* Right Content */}
        <div className='lg:w-1/2 overflow-hidden relative min-h-[300px] lg:min-h-[450px]'>
          <img 
            src={featured} 
            alt="Featured Collection"
            className='w-full h-full absolute inset-0 object-cover transition-transform duration-1000 ease-out group-hover:scale-105'
          />
        </div>

      </div>
    </section>
  );
};

export default FeaturedCollection;