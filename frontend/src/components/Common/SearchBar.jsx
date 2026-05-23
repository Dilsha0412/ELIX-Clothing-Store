
import React, { useState } from 'react'; 
import { HiMiniXMark } from 'react-icons/hi2';
import { FiSearch } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { setFilters } from '../../redux/slices/productsSlice';
import { fetchProductsByFilters } from '../../redux/slices/productsSlice';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {

const [searchTerm, setSearchTerm] = useState("");
const[isOpen, setIsOpen] = useState(false);
const dispatch = useDispatch();
const navigate = useNavigate();


const handleSearchToggle = () => {
    setIsOpen(!isOpen);
}
const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters({search: searchTerm}));
    dispatch(fetchProductsByFilters({search: searchTerm}));
    navigate(`/collections/all?search=${searchTerm}`);
    setIsOpen(false);
};
  return (
    <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen?
    "absolute top-0 left-0 w-full bg-black h-24 z-50 border-b border-neutral-900" : "w-auto"}`}>
        {isOpen ?(
            
            <form 
            onSubmit={handleSearch}
            className='relative flex items-center justify-center w-full px-6'>
                <div className='relative w-full max-w-xl'>
                    <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                    className='bg-neutral-950 border border-neutral-800 text-white px-4 py-2 pl-4 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-500'
                    />
                    <button
                    type='submit'
                    className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors'>
                    <FiSearch className='h-5 w-5'/>
                    </button>
                </div>
                <button
                type='button'
                onClick={handleSearchToggle}
                className='ml-4 text-gray-400 hover:text-white transition-colors'>
                    <HiMiniXMark className='h-6 w-6'/>
                </button>
             
            </form>):(
            <button onClick={handleSearchToggle} className='text-white hover:text-gray-300 transition-colors flex items-center justify-center'>
                <FiSearch className='h-4 w-4'/>
            </button>
        )}
        </div>
  )
}

export default SearchBar;