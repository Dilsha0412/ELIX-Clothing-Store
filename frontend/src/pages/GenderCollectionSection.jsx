import React from 'react'
import mensCollection from '../assets/jeans-data.jpg'
import womensCollection from '../assets/Valencia-Workwear-3-Piece-Set-Risate-53659975221541.webp'
import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'


const GenderCollectionSection = () => {
    return (
        <section className='py-16 w-full px-4 sm:px-6 lg:px-8 max-w-[1750px] mx-auto bg-white'>
            <div className='w-full flex flex-col md:flex-row gap-6'>

                {/*Womens collection*/}
                <div className='relative flex-1 group overflow-hidden rounded-none border border-neutral-200 bg-white'>
                    <img
                        src={womensCollection}
                        alt="Women's Collection"
                        className='w-full h-[800px] object-cover object-[center_30%] transition-transform duration-700 group-hover:scale-105'
                    />
                    <Link
                        to="/collections/all?gender=Women"
                        className='absolute bottom-8 left-8 right-8 bg-black text-white px-6 py-4 flex items-center justify-between border border-neutral-900 rounded-none transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:border-neutral-200'
                    >
                        <div>
                            <h2 className='text-xl md:text-2xl font-black uppercase tracking-wider transition-colors duration-300'>
                                Women's Collection
                            </h2>
                            <p className='text-[10px] md:text-xs text-neutral-400 font-bold tracking-widest uppercase transition-colors duration-300 group-hover:text-neutral-500'>
                                View Collection
                            </p>
                        </div>
                        <FiArrowUpRight className="text-2xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                </div>

                {/*Mens collection*/}
                <div className='relative flex-1 group overflow-hidden rounded-none border border-neutral-200 bg-white'>
                    <img
                        src="https://res.cloudinary.com/dzyha1lps/image/upload/v1779998467/0_0011_YARAmarch264354_rjyf87.webp"
                        alt="Men's Collection"
                        className='w-full h-[800px] object-cover object-top transition-transform duration-700 group-hover:scale-105'
                    />
                    <Link
                        to="/collections/all?gender=Men"
                        className='absolute bottom-8 left-8 right-8 bg-black text-white px-6 py-4 flex items-center justify-between border border-neutral-900 rounded-none transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:border-neutral-200'
                    >
                        <div>
                            <h2 className='text-xl md:text-2xl font-black uppercase tracking-wider transition-colors duration-300'>
                                Men's Collection
                            </h2>
                            <p className='text-[10px] md:text-xs text-neutral-400 font-bold tracking-widest uppercase transition-colors duration-300 group-hover:text-neutral-500'>
                                View Collection
                            </p>
                        </div>
                        <FiArrowUpRight className="text-2xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default GenderCollectionSection;

