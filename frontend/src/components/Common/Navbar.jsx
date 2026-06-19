import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiUser, FiShoppingBag, FiHeart, FiChevronDown } from 'react-icons/fi';
import SearchBar from './SearchBar';
import CartDrawer from '../Layout/CartDrawer';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';
import { setCurrency } from '../../redux/slices/currencySlice';

const Navbar = ({ isTransparent }) => {
    const textColor = isTransparent ? "text-white/70" : "text-neutral-700";
    const hoverColor = isTransparent ? "hover:text-white" : "hover:text-black";
    const dispatch = useDispatch();
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [navDrawerOpen, setNavDrawerOpen] = useState(false);
    const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
    const { cart } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const { wishlist } = useSelector((state) => state.wishlist);
    const { selectedCurrency } = useSelector((state) => state.currency);

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
                    <button
                        onClick={toggleNavDrawer}
                        className={`md:hidden flex items-center space-x-2 transition-colors duration-200 cursor-pointer group ${textColor} ${hoverColor}`}
                    >
                        <svg
                            className="w-4.5 h-4.5 transition-colors duration-200 text-current"
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

                    {/* Logo (left-aligned on desktop, centered on mobile) */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none md:ml-4 z-10">
                        <Link to="/" className={`text-xl sm:text-2xl font-serif tracking-widest uppercase transition-colors duration-200 ${
                            isTransparent ? "text-white hover:text-white/85" : "text-black hover:opacity-80"
                        }`}>
                            ELIX
                        </Link>
                    </div>
                </div>

                {/* Center: Desktop Navigation Links (hidden on mobile) */}
                <div className={`hidden md:flex items-center space-x-6 text-[13px] ${textColor} font-medium tracking-wide`}>
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

                    <Link to="/collections/all?gender=Men" className={`transition-colors duration-200 ${hoverColor}`}>
                        Men
                    </Link>
                    <Link to="/collections/all?gender=Women" className={`transition-colors duration-200 ${hoverColor}`}>
                        Women
                    </Link>
                    <Link to="/collections/all?category=Top Wear" className={`transition-colors duration-200 ${hoverColor}`}>
                        Top Wear
                    </Link>
                    <Link to="/collections/all?category=Bottom Wear" className={`transition-colors duration-200 ${hoverColor}`}>
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

                    {/* Currency Dropdown Selector */}
                    <div className="relative">
                        <button
                            onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                            className={`flex items-center space-x-1.5 ${textColor} ${hoverColor} transition-colors duration-200 focus:outline-none cursor-pointer py-1`}
                        >
                            <img
                                src={selectedCurrency === 'LKR' ? 'https://flagcdn.com/w40/lk.png' : 'https://flagcdn.com/w40/us.png'}
                                alt={selectedCurrency}
                                className="w-5 h-5 rounded-full object-cover border border-neutral-200"
                            />
                            <span className="text-[11px] font-bold tracking-wider uppercase">
                                {selectedCurrency}
                            </span>
                            <FiChevronDown className="h-3 w-3 text-current transition-transform duration-200" />
                        </button>

                        {currencyDropdownOpen && (
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setCurrencyDropdownOpen(false)}
                                />
                                <div className="absolute right-0 mt-2 bg-white border border-neutral-200 shadow-xl p-3 flex flex-col space-y-3 min-w-[130px] z-50 rounded-none transform scale-100 transition-all origin-top-right">
                                    <button
                                        onClick={() => {
                                            dispatch(setCurrency('LKR'));
                                            setCurrencyDropdownOpen(false);
                                        }}
                                        className="flex items-center space-x-3 text-left w-full text-neutral-700 hover:text-black transition-colors focus:outline-none cursor-pointer"
                                    >
                                        <img
                                            src="https://flagcdn.com/w40/lk.png"
                                            alt="LKR"
                                            className="w-5 h-5 rounded-full object-cover border border-neutral-100"
                                        />
                                        <span className={`text-xs font-semibold tracking-wider ${selectedCurrency === 'LKR' ? 'underline decoration-2 underline-offset-4 text-black' : ''}`}>
                                            LKR
                                        </span>
                                    </button>

                                    <button
                                        onClick={() => {
                                            dispatch(setCurrency('USD'));
                                            setCurrencyDropdownOpen(false);
                                        }}
                                        className="flex items-center space-x-3 text-left w-full text-neutral-700 hover:text-black transition-colors focus:outline-none cursor-pointer"
                                    >
                                        <img
                                            src="https://flagcdn.com/w40/us.png"
                                            alt="USD"
                                            className="w-5 h-5 rounded-full object-cover border border-neutral-100"
                                        />
                                        <span className={`text-xs font-semibold tracking-wider ${selectedCurrency === 'USD' ? 'underline decoration-2 underline-offset-4 text-black' : ''}`}>
                                            USD
                                        </span>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* 1. Search Icon */}
                    <div className='overflow-hidden flex items-center justify-center'>
                        <SearchBar isHomePage={isHomePage} textColor={textColor} hoverColor={hoverColor} />
                    </div>

                    {/* 2. User Profile Icon */}
                    <Link to="/profile" className={`${textColor} ${hoverColor} transition-colors duration-200 flex items-center justify-center`} title="Profile">
                        <FiUser className='h-4 w-4' />
                    </Link>

                    {/* 3. Wishlist (Heart) Icon */}
                    <Link to="/wishlist" className={`relative ${textColor} ${hoverColor} transition-colors duration-200 flex items-center justify-center`} title="Wishlist">
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
                        className={`relative ${textColor} ${hoverColor} transition-colors duration-200 flex items-center justify-center`}
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
            {createPortal(
                <div
                    className={`fixed top-0 left-0 w-3/4 sm:w-1/3 h-full bg-neutral-950 shadow-2xl border-r border-neutral-900 transform transition-transform duration-300 z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"
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
                </div>,
                document.body
            )}
        </>
    );
};

export default Navbar;