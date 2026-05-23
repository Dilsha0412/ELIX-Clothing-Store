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
        <section className='py-16 w-full px-4 sm:px-8 lg:px-16 max-w-[1600px] mx-auto'>
            <div className='text-center mb-10 relative'>
                {/* Title with lines */}
                <div className='flex items-center justify-center mb-4'>
                    <div className='h-[1px] bg-black flex-1 mx-4'></div>
                    <h2 className='text-2xl md:text-3xl font-black uppercase tracking-widest'>New Arrivals</h2>
                    <div className='h-[1px] bg-black flex-1 mx-4'></div>
                </div>
                
                <Link to="/collections/all" className='text-sm text-gray-600 border-b border-gray-600 pb-0.5 mb-8 inline-block'>
                    View All
                </Link>
            </div>

            {/* Scrollable Content Container */}
            <div className="relative group">
                {/* Floating Left Scroll Button */}
                {canScrollLeft && (
                    <button 
                        onClick={() => scroll("left")}
                        className="absolute left-2 top-[225px] -translate-y-1/2 bg-white text-black p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none group-hover:pointer-events-auto"
                    >
                        <FiChevronLeft className='text-xl'/>
                    </button>
                )}

                {/* Scrollable Content */}
                <div 
                    ref={scrollRef}
                    className={`overflow-x-scroll flex space-x-6 relative no-scrollbar ${
                        isDragging ? "cursor-grabbing" : "cursor-grab"
                    } pb-10`}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUpOrLeave}
                    onMouseLeave={handleMouseUpOrLeave}
                >
                    {newArrivals?.map((product) => (
                        <div key={product._id} className='min-w-full sm:min-w-[calc(50%-12px)] lg:min-w-[calc(25%-18px)] w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0 relative select-none group/card'>
                            <div className='relative overflow-hidden bg-gray-100'>
                                <Link to={`/product/${product._id}`} className='block'>
                                    <img
                                        src={product.images?.[0]?.url || 'https://via.placeholder.com/500'}
                                        alt={product.images?.[0]?.altText || product.name}
                                        className='w-full h-[450px] object-cover pointer-events-none transition-transform duration-500 group-hover/card:scale-105'
                                        draggable={false}
                                    />
                                </Link>

                                {/* Badges */}
                                <div className='absolute top-2 left-2 bg-white px-2 py-0.5 text-xs font-semibold'>
                                    New
                                </div>

                                {/* Quick Add Bar */}
                                <button 
                                    onClick={() => setSelectedQuickAddProduct(product)}
                                    className='absolute bottom-0 left-0 right-0 bg-neutral-900 text-white font-bold py-3 text-sm tracking-widest uppercase opacity-0 translate-y-full group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-300'
                                >
                                    Quick Add
                                </button>
                            </div>
                            
                            {/* Product Info below image */}
                            <div className='mt-4 text-center'>
                                <Link to={`/product/${product._id}`} className='block'>
                                    <h4 className='text-xs font-semibold uppercase tracking-wider text-gray-800 mb-1'>{product.name}</h4>
                                    <p className='font-bold text-sm text-gray-900'>Rs {Number(product.price).toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Floating Right Scroll Button */}
                {canScrollRight && (
                    <button 
                        onClick={() => scroll("right")}
                        className="absolute right-2 top-[225px] -translate-y-1/2 bg-white text-black p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none group-hover:pointer-events-auto"
                    >
                        <FiChevronRight className='text-xl'/>
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