import React from 'react'
import mensCollection from '../assets/jeans-data.jpg'
import womensCollection from '../assets/Valencia-Workwear-3-Piece-Set-Risate-53659975221541.webp'
import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'


const GenderCollectionSection = () => {
    return (
        <section className='py-16 px-4 md:px-8 lg:px-12'>
            <div className='w-full flex flex-col md:flex-row gap-8'>

                {/*Womens collection*/}
                <div className='relative flex-1 group overflow-hidden rounded-lg shadow-lg'>
                    <img
                        src={womensCollection}
                        alt="Women's Collection"
                        className='w-full h-[700px] object-cover object-[center_30%] transition-transform duration-700 group-hover:scale-105'
                    />
                    <Link
                        to="/collections/all?gender=Women"
                        className='absolute bottom-8 left-8 right-8 bg-black/90 text-white px-6 py-4 flex items-center justify-between backdrop-blur-sm border border-white/10 rounded-md transition-all duration-300 hover:bg-black'
                    >
                        <div>
                            <h2 className='text-xl md:text-2xl font-bold tracking-tight text-white mb-0.5'>
                                Women's Collection
                            </h2>
                            <p className='text-[10px] md:text-xs text-gray-400 font-bold tracking-widest uppercase'>
                                View Collection
                            </p>
                        </div>
                        <FiArrowUpRight className="text-2xl text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                </div>

                {/*Mens collection*/}
                <div className='relative flex-1 group overflow-hidden rounded-lg shadow-lg'>
                    <img
                        src={mensCollection}
                        alt="Men's Collection"
                        className='w-full h-[700px] object-cover object-top transition-transform duration-700 group-hover:scale-105'
                    />
                    <Link
                        to="/collections/all?gender=Men"
                        className='absolute bottom-8 left-8 right-8 bg-black/90 text-white px-6 py-4 flex items-center justify-between backdrop-blur-sm border border-white/10 rounded-md transition-all duration-300 hover:bg-black'
                    >
                        <div>
                            <h2 className='text-xl md:text-2xl font-bold tracking-tight text-white mb-0.5'>
                                Men's Collection
                            </h2>
                            <p className='text-[10px] md:text-xs text-gray-400 font-bold tracking-widest uppercase'>
                                View Collection
                            </p>
                        </div>
                        <FiArrowUpRight className="text-2xl text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default GenderCollectionSection;