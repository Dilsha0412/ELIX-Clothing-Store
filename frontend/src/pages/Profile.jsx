import React from 'react'
import MyOrdersPage from './MyOrdersPage'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import { clearCart } from '../redux/slices/cartSlice';

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearCart());
        navigate("/login");
    };

    return (
        <div className='min-h-screen flex flex-col bg-white'>
            <div className='flex-grow container mx-auto px-4 py-8 md:py-12'>
                <div className='flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0'>

                    {/*Left Section*/}
                    <div className='w-full md:w-1/3 lg:w-1/4 border border-neutral-200 bg-white p-8 rounded-none'>
                        <h1 className='text-2xl font-black uppercase tracking-wider text-neutral-900 mb-1'>{user?.name}</h1>
                        <p className='text-xs text-neutral-500 tracking-wide font-medium mb-6'>{user?.email}</p>
                        <button
                            onClick={handleLogout}
                            className='w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 text-xs font-bold uppercase tracking-widest rounded-none transition duration-300 cursor-pointer shadow-sm hover:shadow text-center'>
                            Logout
                        </button>
                    </div>

                    {/*Right Section Orders table*/}
                    <div className='w-full md:w-2/3 lg:w-3/4'>
                        <MyOrdersPage />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;