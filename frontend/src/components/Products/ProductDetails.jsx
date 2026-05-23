import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiChevronLeft, FiChevronRight, FiHeart, FiEye } from 'react-icons/fi';

import { fetchProductDetails, fetchSimilarProducts } from "../../redux/slices/productsSlice";
import { addToCart } from "../../redux/slices/cartSlice";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);
  
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0); 
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
  }, [similarProducts]);

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleQuantityChange = (action) => {
    if (action === "plus") setQuantity((prev) => prev + 1);
    if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and color before adding to Cart.", {
        duration: 1000,
      });
      return;
    }
    setIsButtonDisabled(true);

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      })
    )
      .then(() => {
        toast.success("Product added to cart!", {
          duration: 1000,
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to add product to cart.");
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };  

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">Error: {error}</p>;
  }

  return (
    <div className="">
      {selectedProduct && (
        <>
          <div className="p-6">
          {/* Product Details Card */}
          <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-sm mb-12">
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-stretch">
            
            {/* Left Desktop Thumbnails */}
            <div className="hidden md:flex flex-col space-y-4 shrink-0">
              {selectedProduct?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                    mainImage === image.url ? "border-black" : "border-gray-200"
                  }`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>

            {/* Middle Main Image */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 mb-4 md:mb-0 flex">
                {mainImage && (
                  <img
                    src={mainImage}
                    alt="Main Product"
                    className="w-full md:h-full h-[400px] object-cover rounded-lg shadow-sm"
                  />
                )}
              </div>
              
              {/* Mobile Thumbnails */}
              <div className="md:hidden flex overflow-x-auto space-x-4 mb-4">
                {selectedProduct?.images?.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={image.altText || `Thumbnail ${index}`}
                    className={`w-20 h-20 object-cover rounded-lg border-2 ${
                      mainImage === image.url ? "border-black" : "border-transparent"
                    }`}
                    onClick={() => setMainImage(image.url)}
                  />
                ))}
              </div>
            </div>

            {/* Right Info Section */}
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                {selectedProduct.name}
              </h1>

              <div className="mb-2">
                <p className="text-lg text-gray-400 line-through">
                  ${selectedProduct.originalPrice}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ${selectedProduct.price}
                </p>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Color Selection */}
              <div className="mb-4">
                <p className="text-gray-700 font-medium">Color:</p>
                <div className="flex gap-3 mt-2">
                  {selectedProduct?.colors?.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                        selectedColor === color ? "border-black" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-4">
                <p className="text-gray-700 font-medium">Size:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct?.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md transition-colors ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-4">
                <p className="text-gray-700 font-medium">Quantity:</p>
                <div className="flex items-center space-x-4 mt-2">
                  <button
                    onClick={() => handleQuantityChange("minus")}
                    className="px-3 py-1 bg-gray-100 rounded-md text-xl hover:bg-gray-200 transition"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium w-4 text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("plus")}
                    className="px-3 py-1 bg-gray-100 rounded-md text-xl hover:bg-gray-200 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button 
                onClick={handleAddToCart} 
                disabled={isButtonDisabled} 
                className={`bg-black text-white py-2 px-6 rounded-lg w-full mb-4 font-semibold transition shadow-md ${
                  isButtonDisabled 
                    ? "cursor-not-allowed opacity-50" 
                    : "hover:bg-gray-800"
                }`}
              >
                {isButtonDisabled ? "Adding..." : "ADD TO CART"}
              </button>

              {/* Characteristics Table */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-bold mb-2 text-gray-900">
                  Characteristics
                </h3>
                <table className="w-full text-left text-sm text-gray-600">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-semibold text-gray-800">Brand</td>
                      <td className="py-2 text-gray-600">{selectedProduct.brand}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-semibold text-gray-800">Material</td>
                      <td className="py-2 text-gray-600">{selectedProduct.material}</td>
                    </tr>
                  </tbody>
                </table>
              </div>            
            </div>       
          </div>
          </div> {/* Close Product Details Card */}
          </div> {/* Close top padding wrapper */}
          
          {/* Similar Products Section - Moved outside for full-width layout matching New Arrivals */}
          <div className="mb-16 w-full px-4 sm:px-8 lg:px-16 max-w-[1600px] mx-auto">
            <div className='flex items-center justify-center mb-8 relative'>
                <div className='h-[1px] bg-black flex-1 mx-4'></div>
                <h2 className='text-2xl md:text-3xl font-black uppercase tracking-widest text-center'>
                  You May Also Like
                </h2>
                <div className='h-[1px] bg-black flex-1 mx-4'></div>

                {/* Desktop Scroll Buttons */}
                <div className='absolute right-0 flex space-x-2 z-10 hidden md:flex'>
                    <button 
                        onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        className={`p-2 rounded border ${
                            canScrollLeft
                            ? "bg-white text-black border-gray-300 hover:border-black"
                            : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                        }`}
                    >
                        <FiChevronLeft className='text-2xl'/>
                    </button>

                    <button 
                        onClick={() => scroll("right")}
                        disabled={!canScrollRight}
                        className={`p-2 rounded border ${
                            canScrollRight
                            ? "bg-white text-black border-gray-300 hover:border-black"
                            : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                        }`}
                    >
                        <FiChevronRight className='text-2xl'/>
                    </button>
                </div>
            </div>

            {/* Scrollable Content */}
            <div 
                ref={scrollRef}
                className={`overflow-x-scroll flex space-x-6 relative no-scrollbar ${
                    isDragging ? "cursor-grabbing" : "cursor-grab"
                } pb-4`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
            >
                {similarProducts?.map((product) => (
                    <div key={product._id} className='min-w-full sm:min-w-[calc(50%-12px)] lg:min-w-[calc(25%-18px)] w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0 relative select-none group'>
                        <div className='relative overflow-hidden bg-gray-100 rounded-lg'>
                            <Link to={`/product/${product._id}`} className='block'>
                                <img
                                    src={product.images?.[0]?.url || 'https://via.placeholder.com/500'}
                                    alt={product.images?.[0]?.altText || product.name}
                                    className='w-full h-[450px] object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105'
                                    draggable={false}
                                />
                            </Link>

                            {/* Icons */}
                            <div className='absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                <button className='bg-white p-2 rounded-full shadow hover:bg-black hover:text-white transition'>
                                    <FiHeart className='text-lg' />
                                </button>
                                <button className='bg-white p-2 rounded-full shadow hover:bg-black hover:text-white transition'>
                                    <FiEye className='text-lg' />
                                </button>
                            </div>

                            {/* Quick Add Bar */}
                            <button className='absolute bottom-0 left-0 right-0 bg-neutral-900 text-white font-bold py-3 text-sm tracking-widest uppercase opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300'>
                                Quick Add
                            </button>
                        </div>
                        
                        {/* Product Info below image */}
                        <div className='mt-4 text-center'>
                            <Link to={`/product/${product._id}`} className='block'>
                                <h4 className='text-xs font-semibold uppercase tracking-wider text-gray-800 mb-1'>{product.name}</h4>
                                <p className='font-bold text-sm text-gray-900'>${Number(product.price).toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;