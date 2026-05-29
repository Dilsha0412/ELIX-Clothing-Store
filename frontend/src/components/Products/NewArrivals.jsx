import React from 'react'
import { FiChevronLeft, FiChevronRight, FiHeart, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import QuickAddModal from './QuickAddModal';

const NewArrivals = () => {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [newArrivals, setNewArrivals] = useState([]);
    const [selectedQuickAddProduct, setSelectedQuickAddProduct] = useState(null);

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
                );
                setNewArrivals(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchNewArrivals();
    }, []);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = x - startX;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUpOrLeave = () => {
        setIsDragging(false);
    };

    const scroll = (direction) => {
        const scrollAmount = direction === "left" ? -300 : 300;
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    const updateScrollButtons = () => {
        const container = scrollRef.current;
        if (container) {
            const leftScroll = container.scrollLeft;

            const rightScrollable = container.scrollWidth > Math.ceil(leftScroll + container.clientWidth);

            setCanScrollLeft(leftScroll > 0);
            setCanScrollRight(rightScrollable);
        }
    };

    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            container.addEventListener("scroll", updateScrollButtons);
            updateScrollButtons();
            return () => container.removeEventListener("scroll", updateScrollButtons);
        }
    }, [newArrivals]);

    return (
        <section className='py-16 w-full px-4 sm:px-6 lg:px-8 max-w-[1750px] mx-auto bg-white'>
            <div className='text-center mb-10 relative'>
                {/* Title with lines */}
                <div className='flex items-center justify-center mb-4'>
                    <div className='h-[1px] bg-black flex-1 mx-4'></div>
                    <h2 className='text-2xl md:text-3xl font-black uppercase tracking-widest text-black'>New Arrivals</h2>
                    <div className='h-[1px] bg-black flex-1 mx-4'></div>
                </div>

                <Link to="/collections/all" className='text-xs font-bold uppercase tracking-widest text-black border-b border-black pb-0.5 mb-8 hover:text-neutral-500 hover:border-neutral-500 transition-colors inline-block'>
                    View All
                </Link>
            </div>

            <div className="relative group">
                {canScrollLeft && (
                    <button
                        onClick={() => scroll("left")}
                        className="absolute left-2 top-[225px] -translate-y-1/2 text-neutral-700 hover:text-black hover:scale-125 active:scale-95 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none group-hover:pointer-events-auto p-2 cursor-pointer"
                    >
                        <FiChevronLeft className='text-3xl' />
                    </button>
                )}

                <div
                    ref={scrollRef}
                    className={`overflow-x-scroll flex space-x-6 relative no-scrollbar ${isDragging ? "cursor-grabbing" : "cursor-grab"
                        } pb-10`}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUpOrLeave}
                    onMouseLeave={handleMouseUpOrLeave}
                >
                    {newArrivals?.map((product) => (
                        <div key={product._id} className='min-w-full sm:min-w-[calc(50%-12px)] lg:min-w-[calc(25%-18px)] w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0 relative select-none group/card'>
                            <div className='relative overflow-hidden bg-gray-100 border border-neutral-200 rounded-none'>
                                <Link to={`/product/${product._id}`} className='block'>
                                    <img
                                        src={product.images?.[0]?.url || 'https://via.placeholder.com/500'}
                                        alt={product.images?.[0]?.altText || product.name}
                                        className='w-full h-[450px] object-cover pointer-events-none transition-transform duration-500 group-hover/card:scale-105'
                                        draggable={false}
                                    />
                                </Link>

                                {/* Badges */}
                                <div className='absolute top-2 left-2 bg-black text-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest rounded-none shadow-sm'>
                                    New
                                </div>

                                {/* Quick Add Bar */}
                                <button
                                    onClick={() => setSelectedQuickAddProduct(product)}
                                    className='absolute bottom-0 left-0 right-0 bg-black text-white font-bold py-3 text-xs tracking-widest uppercase opacity-0 translate-y-full group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-300 rounded-none cursor-pointer'
                                >
                                    Quick Add
                                </button>
                            </div>

                            {/* Product Info below image */}
                            <div className='mt-4 text-center'>
                                <Link to={`/product/${product._id}`} className='block'>
                                    <h4 className='text-xs font-semibold uppercase tracking-wider text-gray-800 mb-1'>{product.name}</h4>
                                    <p className='font-bold text-sm text-gray-900'>${Number(product.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Floating Right Scroll Button */}
                {canScrollRight && (
                    <button
                        onClick={() => scroll("right")}
                        className="absolute right-2 top-[225px] -translate-y-1/2 text-neutral-700 hover:text-black hover:scale-125 active:scale-95 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none group-hover:pointer-events-auto p-2"
                    >
                        <FiChevronRight className='text-3xl' />
                    </button>
                )}
            </div>
            {selectedQuickAddProduct && (
                <QuickAddModal
                    product={selectedQuickAddProduct}
                    onClose={() => setSelectedQuickAddProduct(null)}
                />
            )}
        </section>
    );
};

export default NewArrivals;