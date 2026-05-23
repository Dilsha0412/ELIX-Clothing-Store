import React, { useRef, useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import FilterSidebar from '../components/Products/FilterSidebar';
import ProductGrid from '../components/Products/ProductGrid';
import SortOptions from '../components/Products/SortOptions';

import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slices/productsSlice'; 

const CollectionPage = () => {
    const { collection } = useParams();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    
    const { products, loading, error } = useSelector((state) => state.products);
    
    const queryParams = Object.fromEntries(searchParams);

    const sidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchProductsByFilters({ collection, ...queryParams }));
    }, [dispatch, collection, searchParams]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClickOutside = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className='flex flex-col md:flex-row'>
            {/* Mobile Filter Button */}
            <button
                onClick={toggleSidebar}
                className="md:hidden border p-2 flex justify-center items-center m-4 rounded bg-gray-100 hover:bg-gray-200"
            >
                <FaFilter className='mr-2' /> Filters
            </button>

            {/* Filters Sidebar */}
            <div
                ref={sidebarRef}
                className={`w-64 bg-white transform transition-transform duration-300 fixed inset-y-0 left-0 z-50 md:relative md:inset-auto md:z-0 ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                }`}
            >
                <FilterSidebar />
            </div>

            {/* Product Display Area */}
            <div className="flex-grow p-4">

                <h2 className="text-2xl font-bold mb-6 uppercase">
                    {collection ? `${collection} Collection` : "All Collection"}
                </h2>
                
                {/* Sort Options */}
                <SortOptions />

                {/* Product Grid */}
                <ProductGrid products={products} loading={loading} error={error} />              
            </div>
        </div>
    );
};

export default CollectionPage;