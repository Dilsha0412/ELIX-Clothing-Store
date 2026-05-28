import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io';
import CartContents from '../Cart/CartContents';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
    const navigate = useNavigate();
    const { user, guestId } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);
    const userId = user ? user._id : null;

    const handleCheckout = () => {
        toggleCartDrawer();
        if (!user) {
            navigate("/login?redirect=checkout");
        } else {
            navigate("/checkout");
        }
    };

    return (
        <div
            className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-xl transform 
        transition-transform duration-300 flex flex-col z-50 rounded-none ${drawerOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
        >
            {/* close button */}
            <div className='flex justify-end p-4'>
                <button onClick={toggleCartDrawer} className="focus:outline-none">
                    <IoMdClose className='h-6 w-6 text-black hover:opacity-70 transition-opacity cursor-pointer' />
                </button>
            </div>

            {/* Cart Contents with scrollable area */}
            <div className='flex-grow px-6 py-4 overflow-y-auto'>
                <h2 className='text-lg font-black uppercase tracking-wider text-black mb-6'>Your Cart</h2>
                {cart && cart?.products?.length > 0 ? (
                    <CartContents cart={cart} userId={userId} guestId={guestId} />
                ) : (
                    <p className="text-xs text-neutral-400 tracking-wider uppercase font-medium">Your cart is empty.</p>
                )}
            </div>

            {/* Checkout Button */}
            <div className='p-6 bg-white border-t border-neutral-100 sticky bottom-0'>
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
        </div>
    )
}

export default CartDrawer;