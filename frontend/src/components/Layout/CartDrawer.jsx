import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io';
import CartContents from '../Cart/CartContents';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createPortal } from 'react-dom';


const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
    const navigate = useNavigate();
    const { user, guestId } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);
    const userId = user ? user._id : null;

    const totalItems = cart?.products?.reduce((total, item) => total + item.quantity, 0) || 0;

    const handleCheckout = () => {
        toggleCartDrawer();
        if (!user) {
            navigate("/login?redirect=checkout");
        } else {
            navigate("/checkout");
        }
    };

    return createPortal(
        <div
            className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-xl transform 
        transition-transform duration-300 flex flex-col z-50 rounded-none ${drawerOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
        >
            {/* Header row with center title and right close button */}
            <div className='relative flex items-center justify-center py-5 border-b border-neutral-200'>
                <h2 className='text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-black'>
                    YOUR CART • {totalItems}
                </h2>
                <button 
                    onClick={toggleCartDrawer} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 focus:outline-none"
                    aria-label="Close cart"
                >
                    <IoMdClose className='h-6 w-6 text-neutral-500 hover:text-black transition-colors cursor-pointer' />
                </button>
            </div>

            {/* Cart Contents with scrollable area */}
            <div className='flex-grow px-6 py-4 overflow-y-auto flex flex-col'>
                {cart && cart?.products?.length > 0 ? (
                    <CartContents cart={cart} userId={userId} guestId={guestId} />
                ) : (
                    <div className="flex flex-col items-center justify-center flex-grow text-center py-12 px-4">
                        <h3 className="text-base sm:text-lg font-black uppercase tracking-wider text-black mb-3">
                            YOUR CART IS EMPTY!
                        </h3>
                        <p className="text-sm text-neutral-700 mb-8 font-medium">
                            Add your favorite items to your cart.
                        </p>
                        <button
                            onClick={() => {
                                toggleCartDrawer();
                                navigate("/collections/all");
                            }}
                            className="w-full bg-black text-white py-4 rounded-none font-medium text-sm hover:bg-neutral-800 transition duration-300 cursor-pointer"
                        >
                            Shop Now
                        </button>
                    </div>
                )}
            </div>

            {/* Checkout Button */}
            <div className='p-6 bg-white border-t border-neutral-100 sticky bottom-0 z-10'>
                {cart && cart?.products?.length > 0 && (
                    <>
                        <button
                            onClick={handleCheckout}
                            className='w-full bg-black text-white py-4 rounded-none font-bold text-xs uppercase tracking-widest hover:bg-neutral-800 transition duration-300 cursor-pointer'
                        >
                            Checkout
                        </button>
                        <p className='text-[10px] tracking-wider text-neutral-400 mt-3 text-center uppercase font-medium'>
                            Shipping, taxes, and discount codes calculated at checkout.
                        </p>
                    </>
                )}
            </div>
        </div>,
        document.body
    )
}

export default CartDrawer;