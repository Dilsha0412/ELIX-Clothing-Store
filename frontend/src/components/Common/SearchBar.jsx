import React, { useState, useEffect } from 'react'; 
import { HiMiniXMark } from 'react-icons/hi2';
import { FiSearch } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { setFilters, fetchProductsByFilters } from '../../redux/slices/productsSlice';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useCurrency } from '../../hooks/useCurrency';

const SearchBar = ({ isHomePage, textColor, hoverColor }) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { formatPrice } = useCurrency();

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchTerm.trim().length > 0) {
                setIsSearching(true);
                try {
                    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products?search=${searchTerm}&limit=3`);
                    setSearchResults(response.data);
                } catch (error) {
                    console.error("Error fetching search results:", error);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setSearchResults([]);
            }
        };

        const debounceTimer = setTimeout(() => {
            fetchSearchResults();
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchTerm]);

    const handleSearchToggle = () => {
        setIsOpen(!isOpen);
        if (isOpen) {
            setSearchTerm("");
            setSearchResults([]);
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setFilters({search: searchTerm}));
        dispatch(fetchProductsByFilters({search: searchTerm}));
        navigate(`/collections/all?search=${searchTerm}`);
        setIsOpen(false);
        setSearchTerm("");
        setSearchResults([]);
    };

    return (
        <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen ?
        "absolute top-0 left-0 w-full bg-white h-24 z-50 border-b border-neutral-200" : "w-auto"}`}>
            {isOpen ? (
                <div className='w-full relative flex flex-col items-center justify-center h-full'>
                    <form 
                        onSubmit={handleSearch}
                        className='relative flex items-center justify-center w-full px-6'
                    >
                        <div className='relative w-full max-w-xl'>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className='bg-neutral-50 border border-neutral-200 text-black px-4 py-2 pl-4 pr-12 rounded-lg focus:outline-none w-full placeholder:text-neutral-400 focus:border-neutral-500'
                                autoFocus
                            />
                            <button
                                type='submit'
                                className='absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-black transition-colors'>
                                <FiSearch className='h-5 w-5' />
                            </button>
                        </div>
                        <button
                            type='button'
                            onClick={handleSearchToggle}
                            className='ml-4 text-neutral-500 hover:text-black transition-colors'>
                            <HiMiniXMark className='h-6 w-6' />
                        </button>
                    </form>

                    {/* Live Search Results Dropdown */}
                    {isOpen && searchResults.length > 0 && (
                        <div className="absolute top-24 w-full max-w-4xl bg-white shadow-xl border border-neutral-200 rounded-b-lg p-6 z-50 max-h-[80vh] overflow-y-auto hidden md:block">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-black mb-6 border-b border-neutral-100 pb-4">
                                Product Results
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {searchResults.map((product) => (
                                    <Link 
                                        key={product._id} 
                                        to={`/product/${product._id}`} 
                                        onClick={() => {
                                            setIsOpen(false);
                                            setSearchTerm("");
                                            setSearchResults([]);
                                        }}
                                        className="group block select-none"
                                    >
                                        <div className="bg-gray-100 border border-neutral-200 overflow-hidden mb-4 relative">
                                            <img 
                                                src={product.images?.[0]?.url || 'https://via.placeholder.com/500'} 
                                                alt={product.images?.[0]?.altText || product.name}
                                                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <h4 className="text-xs font-medium uppercase tracking-wider text-gray-800 mb-1 truncate px-2">
                                                {product.name}
                                            </h4>
                                            <p className="font-bold text-sm text-gray-900">
                                                {formatPrice(product.price)}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="text-center mt-6 pt-4 border-t border-neutral-100">
                                <button 
                                    onClick={handleSearch}
                                    className="text-xs font-bold uppercase tracking-widest text-neutral-600 hover:text-black underline underline-offset-4 transition-colors"
                                >
                                    View All Results
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <button onClick={handleSearchToggle} className={`${textColor || 'text-black'} ${hoverColor || 'hover:text-neutral-600'} transition-colors flex items-center justify-center`}>
                    <FiSearch className='h-4 w-4' />
                </button>
            )}
        </div>
    )
}

export default SearchBar;