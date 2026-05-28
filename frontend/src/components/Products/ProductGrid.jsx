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
                <div key={index} className='group/card select-none'>
                    <div className='relative overflow-hidden bg-gray-100 border border-neutral-200 rounded-none mb-4'>
                        <Link to={`/product/${product._id}`} className='block'>
                            <img src={product.images[0].url}
                                alt={product.images[0].alText || product.name}
                                className='w-full h-96 object-cover pointer-events-none transition-transform duration-500 group-hover/card:scale-105'
                            />
                        </Link>
                    </div>
                    <div className='mt-4 text-center'>
                        <Link to={`/product/${product._id}`} className='block'>
                            <h4 className='text-xs font-semibold uppercase tracking-wider text-gray-800 mb-1'>
                                {product.name}
                            </h4>
                            <p className='font-bold text-sm text-gray-900'>
                                ${Number(product.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </p>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductGrid;
