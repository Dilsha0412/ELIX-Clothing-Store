import React from 'react'
import { Link } from 'react-router-dom';

const ProductGrid = ({ products, loading, error }) => {
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {products.map((product, index) => (
                <Link key={index} to={`/product/${product._id}`} className='block'>
                    <div className='bg-white p-4 rounded-none border border-neutral-100 shadow-none hover:border-black transition-all duration-300'>
                        <div className='w-full h-96 mb-4'>
                            <img src={product.images[0].url}
                                alt={product.images[0].alText || product.name}
                                className='w-full h-full object-cover rounded-none'
                            />
                        </div>
                        <div className='mt-4 text-center'>
                            <h4 className='text-xs font-semibold uppercase tracking-wider text-gray-800 mb-1'>
                                {product.name}
                            </h4>
                            <p className='font-bold text-sm text-gray-900'>
                                ${Number(product.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default ProductGrid;