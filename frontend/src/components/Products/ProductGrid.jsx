import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import QuickAddModal from './QuickAddModal';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../../redux/slices/wishlistSlice';
import { toast } from 'sonner';

import { useCurrency } from '../../hooks/useCurrency';

const ProductGrid = ({ products, loading, error }) => {
    const { formatPrice } = useCurrency();
    const dispatch = useDispatch();
    const { wishlist } = useSelector((state) => state.wishlist);
    const { user } = useSelector((state) => state.auth);
    const [selectedQuickAddProduct, setSelectedQuickAddProduct] = useState(null);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    return (
        <>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                {products.map((product, index) => (
                    <div key={product._id || index} className='group/card select-none'>
                        <div className='relative overflow-hidden bg-gray-100 border border-neutral-200 rounded-none mb-4'>
                            <Link to={`/product/${product._id}`} className='block'>
                                <img src={product.images?.[0]?.url || 'https://via.placeholder.com/500'}
                                    alt={product.images?.[0]?.altText || product.name}
                                    className='w-full h-[450px] object-cover pointer-events-none transition-transform duration-500 group-hover/card:scale-105'
                                />
                            </Link>

                            {/* Floating Action Buttons */}
                            <div className='absolute top-2 right-2 flex flex-col space-y-2 z-20 opacity-0 translate-x-4 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all duration-300'>
                                {/* Wishlist Button */}
                                <button
                                    onClick={() => {
                                        const isWishlisted = wishlist.some(item => item._id === product._id);
                                        dispatch(toggleWishlist({ product, userId: user?._id }));
                                        if (isWishlisted) {
                                            toast.info("Removed from wishlist!", { duration: 1500 });
                                        } else {
                                            toast.success("Added to wishlist!", { duration: 1500 });
                                        }
                                    }}
                                    className='h-8 bg-white text-black rounded-full flex items-center justify-end shadow-md border border-neutral-100 hover:border-neutral-200 transition-all duration-300 overflow-hidden cursor-pointer group/wishlist w-8 hover:w-36 px-2'
                                >
                                    <span className='text-[9px] font-bold uppercase tracking-wider opacity-0 max-w-0 overflow-hidden group-hover/wishlist:opacity-100 group-hover/wishlist:max-w-[100px] transition-all duration-300 whitespace-nowrap pr-2'>
                                        {wishlist.some(item => item._id === product._id) ? 'In Wishlist' : 'Add to Wishlist'}
                                    </span>
                                    <FiHeart className={`h-4 w-4 shrink-0 ${wishlist.some(item => item._id === product._id) ? 'text-red-500 fill-red-500' : 'text-neutral-800'}`} />
                                </button>
                            </div>

                            {/* Quick Add Bar */}
                            <button
                                onClick={() => setSelectedQuickAddProduct(product)}
                                className='absolute bottom-0 left-0 right-0 bg-white hover:bg-black text-black hover:text-white border border-black font-bold py-3 text-xs tracking-widest uppercase transition-all duration-300 rounded-none cursor-pointer block text-center opacity-0 translate-y-4 group-hover/card:opacity-100 group-hover/card:translate-y-0 z-20'
                            >
                                Quick Add
                            </button>
                        </div>
                        <div className='mt-4 text-center'>
                            <Link to={`/product/${product._id}`} className='block'>
                                <h4 className='text-xs font-medium uppercase tracking-wider text-gray-800 mb-1'>
                                    {product.name}
                                </h4>
                                <p className='font-bold text-sm text-gray-900'>
                                    {formatPrice(product.price)}
                                </p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            {selectedQuickAddProduct && (
                <QuickAddModal
                    product={selectedQuickAddProduct}
                    onClose={() => setSelectedQuickAddProduct(null)}
                />
            )}
        </>
    )
}

export default ProductGrid;