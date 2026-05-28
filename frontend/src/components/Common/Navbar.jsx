import React from 'react'
import { Link } from 'react-router-dom';
import { FiUser, FiShoppingCart } from 'react-icons/fi';
import { HiBars3BottomRight } from 'react-icons/hi2';
import SearchBar from './SearchBar';
import CartDrawer from '../Layout/CartDrawer';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [navDrawerOpen, setNavDrawerOpen] = useState(false);
    const { cart } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    const cartItemCount = cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;

    const toggleNavDrawer = () => {
        setNavDrawerOpen(!navDrawerOpen);
    }
    const toggleCartDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <>
            <nav className='w-full max-w-none mx-auto flex items-center justify-between py-5 px-6 md:px-12 lg:px-24 bg-black'>

                <div>
                    <Link to="/" className='text-2xl sm:text-3xl font-semibold tracking-wider font-sans text-white uppercase transition-opacity hover:opacity-85'>
                        ELIX
                    </Link>
                </div>

                <div className='hidden md:flex space-x-1 lg:space-x-2 items-center'>
                    <Link
                        to="/"
                        className='text-white bg-transparent hover:bg-white hover:text-black px-4 py-2.5 font-semibold text-sm tracking-wide uppercase transition-all duration-200'>
                        Home
                    </Link>

                    <Link
                        to="/collections/all?gender=Men"
                        className='text-white bg-transparent hover:bg-white hover:text-black px-4 py-2.5 font-semibold text-sm tracking-wide uppercase transition-all duration-200'>
                        Men
                    </Link>

                    <Link
                        to="/collections/all?gender=Women"
                        className='text-white bg-transparent hover:bg-white hover:text-black px-4 py-2.5 font-semibold text-sm tracking-wide uppercase transition-all duration-200'>
                        Women
                    </Link>

                    <Link
                        to="/collections/all?category=Top Wear"
                        className='text-white bg-transparent hover:bg-white hover:text-black px-4 py-2.5 font-semibold text-sm tracking-wide uppercase transition-all duration-200'>
                        Top Wear
                    </Link>

                    <Link
                        to="/collections/all?category=Bottom Wear"
                        className='text-white bg-transparent hover:bg-white hover:text-black px-4 py-2.5 font-semibold text-sm tracking-wide uppercase transition-all duration-200'>
                        Bottom Wear
                    </Link>
                </div>

                <div className='flex items-center space-x-4 lg:space-x-6'>
                    {user && user.role === "admin" && (<Link
                        to="/admin"
                        className='block bg-white text-black px-3 py-1 rounded-none text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors'
                    >
                        Admin
                    </Link>)}

                    {/* 1. Search Icon */}
                    <div className='overflow-hidden flex items-center justify-center'>
                        <SearchBar />
                    </div>

                    {/* 2. User Profile Icon */}
                    <Link to="/profile" className='hover:text-gray-300 transition-colors flex items-center justify-center' title="Profile">
                        <FiUser className='h-4 w-4 text-white' />
                    </Link>

                    {/* 3. Shopping Cart Icon */}
                    <button
                        onClick={toggleCartDrawer}
                        className='relative hover:text-gray-300 transition-colors flex items-center justify-center'
                        title="Cart"
                    >
                        <FiShoppingCart className='h-4 w-4 text-white' />
                        {cartItemCount > 0 && (
                            <span className='absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse'>
                                {cartItemCount}
                            </span>
                        )}
                    </button>

                    {/* Mobile Hamburger menu */}
                    <button onClick={toggleNavDrawer} className='md:hidden hover:text-gray-300 transition-colors flex items-center justify-center'>
                        <HiBars3BottomRight className='h-4 w-4 text-white' />
                    </button>
                </div>
            </nav>

            <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

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
                        <Link to="/" onClick={toggleNavDrawer} className='block text-gray-300 hover:text-white transition-colors text-lg font-medium uppercase'>
                            Home
                        </Link>

                        <Link to="/collections/all?gender=Men" onClick={toggleNavDrawer} className='block text-gray-300 hover:text-white transition-colors text-lg font-medium uppercase'>
                            Men
                        </Link>

                        <Link to="/collections/all?gender=Women" onClick={toggleNavDrawer} className='block text-gray-300 hover:text-white transition-colors text-lg font-medium uppercase'>
                            Women
                        </Link>

                        <Link to="/collections/all?category=Top Wear" onClick={toggleNavDrawer} className='block text-gray-300 hover:text-white transition-colors text-lg font-medium uppercase'>
                            Top Wear
                        </Link>

                        <Link to="/collections/all?category=Bottom Wear" onClick={toggleNavDrawer} className='block text-gray-300 hover:text-white transition-colors text-lg font-medium uppercase'>
                            Bottom Wear
                        </Link>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Navbar;