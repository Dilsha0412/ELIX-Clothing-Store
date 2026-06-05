import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderDetails } from '../redux/slices/orderSlice';
import { useCurrency } from '../hooks/useCurrency';

const OrderDetailsPage = () => {
    const { formatPrice } = useCurrency();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { orderDetails, loading, error } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchOrderDetails(id));
    }, [dispatch, id]);

    if (loading) return <p className="text-center py-20 text-xs font-bold uppercase tracking-widest text-neutral-500">Loading...</p>
    if (error) return <p className="text-center py-20 text-xs font-bold uppercase tracking-widest text-red-500">Error: {error}</p>

    return (
        <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 tracking-tighter bg-white'>
            <h2 className='text-3xl font-black uppercase tracking-wider text-black mb-1'>Order Details</h2>
            <p className="text-xs text-neutral-500 tracking-wide font-medium mb-8">Review the details of your recent purchase</p>
            
            {!orderDetails ? (
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">No Order Details Found</p>
            ) : (
                <div className='bg-white rounded-none border border-neutral-200 p-6 md:p-8 shadow-none'>
                    {/* Order Info */}
                    <div className='flex flex-col sm:flex-row justify-between mb-8 border-b border-neutral-200 pb-6'>
                        <div>
                            <h3 className='text-xs font-bold uppercase tracking-widest text-neutral-800 mb-2'>
                                Order ID: #{orderDetails._id}
                            </h3>
                            <p className='text-[11px] font-semibold text-neutral-400 uppercase tracking-wide'>
                                Date: {new Date(orderDetails.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div className='flex flex-col items-start sm:items-end mt-4 sm:mt-0'>
                            <span className={`${orderDetails.isPaid
                                    ? "bg-black text-white"
                                    : "bg-neutral-200 text-neutral-600"
                                } px-4 py-2 text-[11px] font-bold uppercase tracking-widest mb-2`}
                            >
                                {orderDetails.isPaid ? "Approved" : "Pending"}
                            </span>

                            <span className={`${orderDetails.isDelivered
                                    ? "bg-black text-white"
                                    : "bg-neutral-200 text-neutral-600"
                                } px-4 py-2 text-[11px] font-bold uppercase tracking-widest`}
                            >
                                {orderDetails.isDelivered ? "Delivered" : "Pending Delivery"}
                            </span>
                        </div>
                    </div>

                    {/*Customer,Payment,Shipping Info */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10'>
                        <div>
                            <h4 className='text-[11px] font-bold uppercase tracking-widest text-neutral-500 mb-3'>Payment Info</h4>
                            <p className='text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-1'>Method: {orderDetails.paymentMethod}</p>
                            <p className='text-[11px] font-bold text-neutral-400 uppercase tracking-wide'>Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
                        </div>

                        <div>
                            <h4 className='text-[11px] font-bold uppercase tracking-widest text-neutral-500 mb-3'>Shipping Info</h4>
                            <p className='text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-1'>Method: {orderDetails.shippingMethod}</p>
                            <p className='text-[11px] font-bold text-neutral-400 uppercase tracking-wide'>
                                Address:{" "}
                                {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`}
                            </p>
                        </div>
                    </div>

                    {/*Products List */}
                    <div className='overflow-x-auto mb-8'>
                        <h4 className='text-xs font-bold uppercase tracking-widest text-neutral-800 border-b border-neutral-200 pb-3 mb-6'>Products</h4>
                        <table className='min-w-full text-left'>
                            <thead className='border-b border-neutral-200'>
                                <tr>
                                    <th className='py-3 text-[11px] font-bold uppercase tracking-widest text-neutral-500'>Name</th>
                                    <th className='py-3 text-[11px] font-bold uppercase tracking-widest text-neutral-500'>Unit Price</th>
                                    <th className='py-3 text-[11px] font-bold uppercase tracking-widest text-neutral-500 text-center'>Quantity</th>
                                    <th className='py-3 text-[11px] font-bold uppercase tracking-widest text-neutral-500 text-right'>Total</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-neutral-200'>
                                {orderDetails.orderItems.map((item) => (
                                    <tr key={item.productId} className='group'>
                                        <td className='py-4 flex items-center'>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className='w-16 h-20 object-cover rounded-none border border-neutral-200 mr-4'
                                            />
                                            <Link
                                                to={`/product/${item.productId}`}
                                                className='text-xs font-bold uppercase tracking-wider text-neutral-800 hover:text-neutral-500 transition-colors'
                                            >
                                                {item.name}
                                            </Link>
                                        </td>

                                        <td className='py-4 text-xs font-bold text-neutral-800'>{formatPrice(item.price)}</td>
                                        <td className='py-4 text-xs font-bold text-neutral-500 text-center'>{item.quantity}</td>
                                        <td className='py-4 text-sm font-black text-neutral-800 text-right'>
                                            {formatPrice(item.price * item.quantity)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Back to Orders Link */}
                    <div className='border-t border-neutral-200 pt-6'>
                        <Link to="/my-orders" className='inline-block bg-black hover:bg-neutral-800 text-white font-bold py-4 px-8 text-xs uppercase tracking-widest rounded-none transition duration-300 shadow-sm'>
                            Back to My Orders
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderDetailsPage;