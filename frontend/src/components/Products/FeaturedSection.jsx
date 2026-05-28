import React from 'react'
import { HiOutlineCreditCard, HiShoppingBag } from 'react-icons/hi'
import { HiArrowPathRoundedSquare } from 'react-icons/hi2';

const FeaturedSection = () => {
  return <section className='py-16 px-4 bg-white border-t border-neutral-100'>
    <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center max-w-7xl'>

        {/*Feature 1*/}
        <div className='flex flex-col items-center p-6 bg-white border border-neutral-100 rounded-none shadow-none hover:border-black transition-all duration-300'>
            <div className='w-12 h-12 flex items-center justify-center border border-black rounded-none mb-4 text-black text-xl'>
                <HiShoppingBag />
            </div>
            <h4 className='text-xs font-bold uppercase tracking-widest text-black mb-2'>
                Free International Shipping
            </h4>
            <p className='text-neutral-500 text-xs tracking-wider'>
                On all orders over $100.00
            </p>
        </div>

       {/*Feature 2*/}
         <div className='flex flex-col items-center p-6 bg-white border border-neutral-100 rounded-none shadow-none hover:border-black transition-all duration-300'>
            <div className='w-12 h-12 flex items-center justify-center border border-black rounded-none mb-4 text-black text-xl'>
                <HiArrowPathRoundedSquare />
            </div>
            <h4 className='text-xs font-bold uppercase tracking-widest text-black mb-2'>
                45 Days Return
            </h4>
            <p className='text-neutral-500 text-xs tracking-wider'>
                Money back guarantee
            </p>
        </div>
        
        {/*Feature 3*/}
         <div className='flex flex-col items-center p-6 bg-white border border-neutral-100 rounded-none shadow-none hover:border-black transition-all duration-300'>
            <div className='w-12 h-12 flex items-center justify-center border border-black rounded-none mb-4 text-black text-xl'>
                <HiOutlineCreditCard />
            </div>
            <h4 className='text-xs font-bold uppercase tracking-widest text-black mb-2'>
                Secure Checkout
            </h4>
            <p className='text-neutral-500 text-xs tracking-wider'>
                100% secured checkout process
            </p>
        </div>
    </div>
  </section>
}

export default FeaturedSection;