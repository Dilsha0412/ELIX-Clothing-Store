import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiUser, FiShoppingBag, FiHeart, FiChevronDown } from 'react-icons/fi';
import SearchBar from './SearchBar';
import CartDrawer from '../Layout/CartDrawer';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [navDrawerOpen, setNavDrawerOpen] = useState(false);
    const { cart } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const { wishlist } = useSelector((state) => state.wishlist);

    const cartItemCount = cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;
    const wishlistCount = wishlist?.length || 0;

    const toggleNavDrawer = () => {
        setNavDrawerOpen(!navDrawerOpen);
    };
    const toggleCartDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <>
            <nav className='relative w-full max-w-none mx-auto flex items-center justify-between py-3 px-4 md:px-6 lg:px-8 bg-transparent select-none'>
                
                {/* Left side: Hamburger (mobile only) + Logo */}
                <div className="flex items-center space-x-4">
                    {/* Hamburger Button (mobile only) */}
                    <button
                        onClick={toggleNavDrawer}
                        className='md:hidden flex items-center space-x-2 transition-colors cursor-pointer group text-neutral-700 hover:text-black'
                    >
                        <svg
                            className='w-4.5 h-4.5 transition-colors text-neutral-700 group-hover:text-black'
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                        </svg>
                        <span className='text-[10px] sm:text-xs font-bold uppercase tracking-widest'>
                            Menu
                        </span>
                    </button>

                    {/* Logo (left-aligned on desktop, absolute centered on mobile) */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none md:ml-4 z-10">
                        <Link to="/" className="text-xl sm:text-2xl font-serif tracking-widest uppercase transition-opacity hover:opacity-85 text-black">
                            ELIX
                        </Link>
                    </div>
                </div>

                {/* Center: Desktop Navigation Links (hidden on mobile) */}
                <div className="hidden md:flex items-center space-x-6 text-[13px] text-neutral-800 font-medium tracking-wide">
                    {/* NEW Dropdown Menu */}
                    <div className="relative group">
                        <button className="text-red-500 hover:text-red-600 transition-colors flex items-center gap-0.5 py-3 cursor-pointer">
                            New <FiChevronDown className="h-3 w-3 text-red-400 group-hover:text-red-500" />
                        </button>
                        
                        {/* Dropdown Box */}
                        <div className="absolute top-full left-0 bg-white border border-neutral-200 shadow-lg py-3.5 px-5 w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col space-y-3">
                            <Link to="/collections/new-arrivals?gender=Women" className="text-xs text-neutral-800 hover:text-black font-semibold tracking-wider transition-colors block py-0.5">
                                Women's New Arrivals
                            </Link>
                            <Link to="/collections/new-arrivals?gender=Men" className="text-xs text-neutral-800 hover:text-black font-semibold tracking-wider transition-colors block py-0.5">
                                Men's New Arrivals
                            </Link>
                        </div>
                    </div>

                    <Link to="/collections/all?gender=Men" className="hover:text-black transition-colors">
                        Men
                    </Link>
                    <Link to="/collections/all?gender=Women" className="hover:text-black transition-colors">
                        Women
                    </Link>
                    <Link to="/collections/all?category=Top Wear" className="hover:text-black transition-colors">
                        Top Wear
                    </Link>
                    <Link to="/collections/all?category=Bottom Wear" className="hover:text-black transition-colors">
                        Bottom Wear
                    </Link>
                </div>

                {/* Right: Actions */}
                <div className='flex items-center space-x-3 lg:space-x-4 z-10'>
                    {user && user.role === "admin" && (
                        <Link
                            to="/admin"
                            className="block px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest transition-colors bg-black text-white hover:bg-neutral-800"
                        >
                            Admin
                        </Link>
                    )}

                    {/* 1. Search Icon */}
                    <div className='overflow-hidden flex items-center justify-center'>
                        <SearchBar isHomePage={isHomePage} />
                    </div>

                    {/* 2. User Profile Icon */}
                    <Link to="/profile" className='text-neutral-700 hover:text-black transition-colors flex items-center justify-center' title="Profile">
                        <FiUser className='h-4 w-4' />
                    </Link>

                    {/* 3. Wishlist (Heart) Icon */}
                    <Link to="/wishlist" className='relative text-neutral-700 hover:text-black transition-colors flex items-center justify-center' title="Wishlist">
                        <FiHeart className='h-4 w-4' />
                        {wishlistCount > 0 && (
                            <span className='absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center'>
                                {wishlistCount}
                            </span>
                        )}
                    </Link>

                    {/* 4. Shopping Bag Icon */}
                    <button
                        onClick={toggleCartDrawer}
                        className='relative text-neutral-700 hover:text-black transition-colors flex items-center justify-center'
                        title="Cart"
                    >
                        <FiShoppingBag className='h-4 w-4' />
                        {cartItemCount > 0 && (
                            <span className='absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse'>
                                {cartItemCount}
                            </span>
                        )}
                    </button>
                </div>
            </nav>

            <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

            {/* Sidebar Menu Drawer */}
            <div
                className={`fixed top-0 left-0 w-3/4 sm:w-1/3 h-full bg-neutral-950 shadow-2xl border-r border-neutral-900 transform transition-transform duration-300 z-50 ${
                    navDrawerOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className='flex justify-end p-4'>
                    <button onClick={toggleNavDrawer} className='text-white hover:text-gray-300 transition-colors'>
                        <IoMdClose className='h-6 w-6' />
                    </button>
                </div>

                <div className='p-6'>
                    <h2 className='text-xl font-semibold mb-6 text-white tracking-wider border-b border-neutral-900 pb-3'>Menu</h2>
                    <nav className="space-y-6">
                        <Link to="/" onClick={toggleNavDrawer} className='block text-gray-300 hover:text-white transition-colors text-lg font-medium uppercase tracking-wider'>
                            Home
                        </Link>

                        <Link to="/collections/all?gender=Men" onClick={toggleNavDrawer} className='block text-gray-300 hover:text-white transition-colors text-lg font-medium uppercase tracking-wider'>
                            Men
                        </Link>

                        <Link to="/collections/all?gender=Women" onClick={toggleNavDrawer} className='block text-gray-300 hover:text-white transition-colors text-lg font-medium uppercase tracking-wider'>
                            Women
                        </Link>

                        <Link to="/collections/all?category=Top Wear" onClick={toggleNavDrawer} className='block text-gray-300 hover:text-white transition-colors text-lg font-medium uppercase tracking-wider'>
                            Top Wear
                        </Link>

                        <Link to="/collections/all?category=Bottom Wear" onClick={toggleNavDrawer} className='block text-gray-300 hover:text-white transition-colors text-lg font-medium uppercase tracking-wider'>
                            Bottom Wear
                        </Link>
                    </nav>

                    <div className='border-t border-neutral-900 pt-6 mt-6 space-y-4'>
                        <Link to="/about" onClick={toggleNavDrawer} className='block text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider'>
                            About Us
                        </Link>
                        <Link to="/contact" onClick={toggleNavDrawer} className='block text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider'>
                            Contact Us
                        </Link>
                        <Link to="/faqs" onClick={toggleNavDrawer} className='block text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider'>
                            FAQs
                        </Link>
                        <Link to="/features" onClick={toggleNavDrawer} className='block text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider'>
                            Features
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;