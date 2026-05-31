import React, { useState } from 'react'
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXFill, RiTwitterXLine } from 'react-icons/ri'
import { TbBrandMeta } from 'react-icons/tb'
import { FiPhoneCall } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/subscribe`,
        { email }
      );
      toast.success(response.data.message || "Successfully subscribed!");
      setEmail('');
    } catch (error) {
      toast.error(error.response?.data?.message || "Subscription failed.");
    }
  };
  return <footer className='bg-black text-gray-400 border-t border-neutral-900 py-16'>
    <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16 px-6 sm:px-12 md:px-16 lg:px-20'>
      <div>
        <h3 className='text-white text-sm font-bold uppercase tracking-widest mb-6'>Newsletter</h3>
        <p className='text-gray-400 text-sm mb-4 leading-relaxed'>
          Be the first to hear about new products, exclusive events, and
          online offers.
        </p>
        <p className='text-xs text-gray-500 mb-6'>
          Sign up and get 10% off your first order.
        </p>
        <form onSubmit={handleSubscribe} className='flex'>
          <input
            type='email'
            placeholder='Enter your email'
            className='p-3 w-full text-sm bg-neutral-900 text-white border border-neutral-800 rounded-none focus:outline-none focus:border-gray-500 transition-all placeholder-gray-500'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type='submit'
            className='bg-white text-black px-6 py-3 text-sm font-semibold rounded-none hover:bg-gray-200 transition-all cursor-pointer'>
            Subscribe
          </button>
        </form>
      </div>
      <div>
        <h3 className='text-white text-sm font-bold uppercase tracking-widest mb-6'>Shop</h3>
        <ul className='space-y-3 text-sm'>
          <li>
            <Link to="/collections/all?gender=Men&category=Top Wear" className='text-gray-400 hover:text-white transition-colors'>
              Men's Top Wear
            </Link>
          </li>
          <li>
            <Link to="/collections/all?gender=Women&category=Top Wear" className='text-gray-400 hover:text-white transition-colors'>
              Women's Top Wear
            </Link>
          </li>
          <li>
            <Link to="/collections/all?gender=Men&category=Bottom Wear" className='text-gray-400 hover:text-white transition-colors'>
              Men's Bottom Wear
            </Link>
          </li>
          <li>
            <Link to="/collections/all?gender=Women&category=Bottom Wear" className='text-gray-400 hover:text-white transition-colors'>
              Women's Bottom Wear
            </Link>
          </li>
        </ul>
      </div>

      {/*Support Links*/}

      <div>
        <h3 className='text-white text-sm font-bold uppercase tracking-widest mb-6'>Support</h3>
        <ul className='space-y-3 text-sm'>
          <li>
            <Link to="/contact" className='text-gray-400 hover:text-white transition-colors'>
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/about" className='text-gray-400 hover:text-white transition-colors'>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/faqs" className='text-gray-400 hover:text-white transition-colors'>
              FAQs
            </Link>
          </li>
          <li>
            <Link to="/features" className='text-gray-400 hover:text-white transition-colors'>
              Features
            </Link>
          </li>
        </ul>
      </div>

      {/*Follow Us*/}
      <div>
        <h3 className='text-white text-sm font-bold uppercase tracking-widest mb-6'>Follow Us</h3>
        <div className='flex items-center space-x-4 mb-6'>
          <a
            // href="https://www.facebook.com"
            target='_blank'
            rel='noopener noreferrer'
            className='text-gray-400 hover:text-white transition-colors'
          >
            <TbBrandMeta className='h-5 w-5' />
          </a>
          <a
            // href="https://www.instagram.com"
            target='_blank'
            rel='noopener noreferrer'
            className='text-gray-400 hover:text-white transition-colors'
          >
            <IoLogoInstagram className='h-5 w-5' />
          </a>
          <a
            // href="https://www.twitter.com"
            target='_blank'
            rel='noopener noreferrer'
            className='text-gray-400 hover:text-white transition-colors'
          >
            <RiTwitterXLine className='h-4 w-4' />
          </a>
        </div>
        <p className='text-gray-500 text-xs uppercase tracking-wider mb-2'>Call Us</p>
        <p className='text-white flex items-center text-sm font-semibold'>
          <FiPhoneCall className='inline-block mr-2' />
          +94 775227202
        </p>
      </div>
    </div>

    {/*Footer Bottom*/}
    <div className='max-w-7xl mx-auto mt-12 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-neutral-900 pt-6'>
      <p className='text-gray-600 text-sm tracking-tighter text-center'>
        © 2026, CompileTab. All Rights Reserved.
      </p>
    </div>
  </footer>
}


export default Footer;