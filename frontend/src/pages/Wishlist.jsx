import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductGrid from '../components/Products/ProductGrid';
import { FiHeart } from 'react-icons/fi';

const Wishlist = () => {
    const { wishlist } = useSelector((state) => state.wishlist);

    return (
        <div className='min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 max-w-[1750px] mx-auto'>
            {/* Header */}
            <div className='flex items-center justify-center mb-12 relative'>
                <div className='h-[1px] bg-black flex-1 mx-4'></div>
                <h1 className='text-2xl md:text-3xl font-black uppercase tracking-widest text-black'>My Wishlist</h1>
                <div className='h-[1px] bg-black flex-1 mx-4'></div>
            </div>

            {wishlist.length === 0 ? (
                <div className='text-center py-20 flex flex-col items-center justify-center border border-neutral-100 p-8'>
                    <div className='w-12 h-12 flex items-center justify-center border border-black rounded-none mb-6 text-black text-2xl bg-white shadow-none'>
                        <FiHeart className='h-6 w-6 text-neutral-400' />
                    </div>
                    <h2 className='text-sm font-bold uppercase tracking-wider text-black mb-2'>
                        Your wishlist is empty
                    </h2>
                    <p className='text-neutral-500 text-xs tracking-wider mb-8 max-w-md'>
                        Add items you love to your wishlist. They will be saved here so you can easily view and add them to your cart later.
                    </p>
                    <Link
                        to="/collections/all"
                        className='inline-block bg-black hover:bg-white hover:text-black text-white px-8 py-3.5 rounded-none text-xs font-bold uppercase tracking-widest border border-black hover:border-black transition-all duration-300 shadow-none cursor-pointer'
                    >
                        Explore Collections
                    </Link>
                </div>
            ) : (
                <ProductGrid products={wishlist} loading={false} error={null} />
            )}
        </div>
    );
};

export default Wishlist;
