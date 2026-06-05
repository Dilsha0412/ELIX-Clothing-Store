import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchUserOrders } from "../redux/slices/orderSlice";
import { useCurrency } from '../hooks/useCurrency';

const MyOrdersPage = () => {
    const { formatPrice } = useCurrency();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchUserOrders());
    }, [dispatch]);

    const handleRowClick = (orderId) => {
        navigate(`/order/${orderId}`);
    };

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div className='max-w-7xl mx-auto p-0 md:p-2'>
            <h2 className='text-2xl font-black uppercase tracking-wider text-black mb-6'>My Orders</h2>
            <div className='overflow-x-auto border border-neutral-200 rounded-none bg-white'>
                <table className='min-w-full text-left text-neutral-600'>
                    <thead className='bg-neutral-50 text-[10px] font-bold uppercase tracking-widest text-neutral-400 border-b border-neutral-200'>
                        <tr>
                            <th className='py-4 px-6'>Image</th>
                            <th className='py-4 px-6'>Order ID</th>
                            <th className='py-4 px-6'>Created</th>
                            <th className='py-4 px-6'>Shipping Address</th>
                            <th className='py-4 px-6'>Items</th>
                            <th className='py-4 px-6'>Price</th>
                            <th className='py-4 px-6'>Status</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-neutral-100">
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr
                                    key={order._id}
                                    onClick={() => handleRowClick(order._id)}
                                    className='hover:bg-neutral-50/50 transition-colors cursor-pointer'>

                                    <td className='py-4 px-6'>
                                        <img src={order.orderItems[0].image} alt={order.orderItems[0].name}
                                            className='w-12 h-12 object-cover rounded-none border border-neutral-200 shadow-sm' />
                                    </td>

                                    <td className='py-4 px-6 font-mono text-xs font-semibold text-neutral-900 whitespace-nowrap'>
                                        #{order._id}
                                    </td>

                                    <td className='py-4 px-6 text-xs text-neutral-500'>
                                        {new Date(order.createdAt).toLocaleDateString()}{"  "}
                                        {new Date(order.createdAt).toLocaleTimeString()}
                                    </td>

                                    <td className='py-4 px-6 text-sm text-neutral-600'>
                                        {order.shippingAddress
                                            ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                                            : "N/A"}
                                    </td>

                                    <td className='py-4 px-6 text-sm font-medium text-neutral-800'>
                                        {order.orderItems.length}
                                    </td>

                                    <td className="py-4 px-6 text-sm font-semibold text-neutral-900">
                                        {formatPrice(order.totalPrice)}
                                    </td>

                                    <td className='py-4 px-6 text-sm'>
                                        <span className={`${order.isPaid
                                                ? "bg-black text-white"
                                                : 'border border-neutral-200 text-neutral-500 bg-white'
                                            } px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-none`}
                                        >{order.isPaid ? "Paid" : "Pending"}</span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={7}
                                    className='py-8 px-6 text-center text-sm text-neutral-400'
                                >
                                    You have no orders
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrdersPage;