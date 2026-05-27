import React from 'react';
import Hero from '../components/Layout/Hero';
import NewArrivals from '../components/Products/NewArrivals';
import ProductDetails from '../components/Products/ProductDetails';
import ProductGrid from '../components/Products/ProductGrid';
import FeaturedCollection from '../components/Products/FeaturedCollection';
import FeaturedSection from '../components/Products/FeaturedSection';
import GenderCollectionSection from './GenderCollectionSection';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import axios from 'axios';

import { fetchProductsByFilters } from "../redux/slices/productsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    // Fetch products for a specific collection
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );

    // Fetch best seller product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBestSeller();
  }, [dispatch]);

  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      {/* Best Seller */}
      <div className='max-w-7xl mx-auto text-center mb-10 mt-16 px-6 sm:px-12 md:px-16 lg:px-20 relative'>
        <div className='flex items-center justify-center mb-4'>
          <div className='h-[1px] bg-black flex-1 mx-4'></div>
          <h2 className='text-2xl md:text-3xl font-black uppercase tracking-widest'>Best Seller</h2>
          <div className='h-[1px] bg-black flex-1 mx-4'></div>
        </div>
      </div>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center">Loading best seller product ...</p>
      )}
      <FeaturedCollection />
      <FeaturedSection />
    </div>
  );
};

export default Home;