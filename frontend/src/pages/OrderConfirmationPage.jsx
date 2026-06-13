import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/slices/cartSlice';
import { useCurrency } from '../hooks/useCurrency';

const OrderConfirmationPage = () => {
    const { formatPrice } = useCurrency();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { checkout } = useSelector((state) => state.checkout);

    useEffect(() => {
        if (checkout && checkout._id) {
            dispatch(clearCart());
            localStorage.removeItem("cart");
        } else {
            navigate("/my-orders");
        }
    }, [checkout, dispatch, navigate]);

    const calculateEstimatedDelivery = (createdAt) => {
        const orderDate = new Date(createdAt);
        orderDate.setDate(orderDate.getDate() + 10);
        return orderDate.toLocaleDateString();
    };

    return (
        <div className='max-w-4xl mx-auto p-6 md:p-10 bg-white tracking-tighter'>
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-700 text-white mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h1 className='text-3xl font-black uppercase tracking-wider text-emerald-800 mb-2'>
                    Thank you for your order
                </h1>
                <p className="text-xs text-neutral-500 tracking-wide font-medium">
                    Your order has been placed and is currently being processed.
                </p>
            </div>

            {checkout && (
                <div>
                    <div className="p-6 md:p-8 rounded-none border border-neutral-200 bg-neutral-50 mb-8 shadow-none">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                            {/* Order Id and Date */}
                            <div>
                                <h2 className='text-xs font-bold uppercase tracking-widest text-neutral-800 mb-1'>
                                    Order ID
                                </h2>
                                <p className="font-mono text-sm font-semibold text-neutral-900">
                                    {checkout._id}
                                </p>
                                <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wide mt-2">
                                    Order date: {new Date(checkout.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            {/* Estimated Delivery */}
                            <div className="text-left sm:text-right border-t sm:border-t-0 pt-4 sm:pt-0 border-neutral-200">
                                <h2 className='text-xs font-bold uppercase tracking-widest text-neutral-800 mb-1'>
                                    Estimated Delivery
                                </h2>
                                <p className='text-sm font-bold text-neutral-800'>
                                    {calculateEstimatedDelivery(checkout.createdAt)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className='mb-12'>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-800 border-b border-neutral-200 pb-3 mb-6">Order Items</h3>
                        <div className="divide-y divide-neutral-200">
                            {checkout.checkoutItems.map((item) => (
                                <div key={item.productId} className='flex items-start py-4 first:pt-0 last:pb-0'>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className='w-16 h-20 object-cover rounded-none border border-neutral-200 mr-4 shadow-sm'
                                    />
                                    <div className="flex-grow">
                                        <h4 className='text-xs font-bold uppercase tracking-wider text-neutral-800 mb-1'>{item.name}</h4>
                                        <p className='text-[10px] font-semibold text-neutral-400 uppercase tracking-wide mb-0.5'>
                                            Size: {item.size}
                                        </p>
                                        <p className='text-[10px] font-semibold text-neutral-400 uppercase tracking-wide'>
                                            Color: {item.color}
                                        </p>
                                    </div>
                                    <div className='text-right'>
                                        <p className='text-sm font-bold text-neutral-800'>{formatPrice(item.price)}</p>
                                        <p className='text-[10px] font-semibold text-neutral-400 uppercase tracking-wide mt-1'>Qty: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment and Delivery Info */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 border-t border-neutral-200 pt-8'>
                        {/* Payment Info */}
                        <div>
                            <h4 className='text-xs font-bold uppercase tracking-widest text-neutral-800 border-b border-neutral-200 pb-2 mb-3'>Payment</h4>
                            <p className='text-xs text-neutral-600 tracking-wide font-medium uppercase'>
                                {checkout.paymentMethod || 'Stripe'}
                            </p>
                            <p className='text-[10px] font-semibold text-neutral-400 uppercase tracking-wide mt-1'>
                                Status: {checkout.paymentStatus || 'Paid'}
                            </p>
                        </div>

                        {/* Delivery Info */}
                        <div>
                            <h4 className='text-xs font-bold uppercase tracking-widest text-neutral-800 border-b border-neutral-200 pb-2 mb-3'>Delivery Address</h4>
                            <p className='text-xs text-neutral-600 tracking-wide font-medium'>
                                {checkout.shippingAddress.firstName} {checkout.shippingAddress.lastName}
                            </p>
                            <p className='text-xs text-neutral-600 tracking-wide font-medium mt-1'>
                                {checkout.shippingAddress.address}
                            </p>
                            <p className='text-xs text-neutral-600 tracking-wide font-medium mt-0.5'>
                                {checkout.shippingAddress.city}, {checkout.shippingAddress.country}
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 border-t border-neutral-200 pt-10">
                        <button
                            onClick={() => navigate("/my-orders")}
                            className="w-full sm:w-auto border border-neutral-300 hover:border-black text-black font-bold py-3 px-8 text-xs uppercase tracking-widest rounded-none transition duration-300 cursor-pointer shadow-sm text-center"
                        >
                            View Orders
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="w-full sm:w-auto bg-black hover:bg-neutral-800 text-white font-bold py-3 px-8 text-xs uppercase tracking-widest rounded-none transition duration-300 cursor-pointer shadow-sm text-center"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderConfirmationPage;