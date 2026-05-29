import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiChevronLeft, FiChevronRight, FiHeart, FiEye } from 'react-icons/fi';
import { fetchProductDetails, fetchSimilarProducts } from "../../redux/slices/productsSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import QuickAddModal from "./QuickAddModal";

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
  const [selectedQuickAddProduct, setSelectedQuickAddProduct] = useState(null);

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
            <div className="max-w-6xl mx-auto bg-white p-8 rounded-none border border-neutral-200 mb-12 shadow-none">
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-stretch">
                <div className="hidden md:flex flex-col space-y-4 shrink-0">
                  {selectedProduct?.images?.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt={image.altText || `Thumbnail ${index}`}
                      className={`w-20 h-20 object-cover rounded-none cursor-pointer border ${mainImage === image.url ? "border-black" : "border-neutral-200"
                        }`}
                      onClick={() => setMainImage(image.url)}
                    />
                  ))}
                </div>

                {/* Middle Main Image */}
                <div className="flex-1 flex flex-col">
                  <div className="flex-1 mb-4 md:mb-0 flex overflow-hidden group rounded-none border border-neutral-200 shadow-none">
                    {mainImage && (
                      <img
                        src={mainImage}
                        alt="Main Product"
                        className="w-full md:h-full h-[400px] object-cover rounded-none transition-transform duration-500 group-hover:scale-105 cursor-zoom-in"
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
                        className={`w-20 h-20 object-cover rounded-none border ${mainImage === image.url ? "border-black" : "border-transparent"
                          }`}
                        onClick={() => setMainImage(image.url)}
                      />
                    ))}
                  </div>
                </div>

                {/* Right Info Section */}
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wider text-gray-900 mb-2">
                    {selectedProduct.name}
                  </h1>

                  <div className="mb-2">
                    {selectedProduct.originalPrice && Number(selectedProduct.originalPrice) > Number(selectedProduct.price) && (
                      <p className="text-lg text-gray-400 line-through">
                        ${Number(selectedProduct.originalPrice).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                    )}
                    <p className="text-2xl font-bold text-gray-900">
                      ${Number(selectedProduct.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  {/* Color Selection */}
                  <div className="mb-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">Color:</p>
                    <div className="flex gap-3 mt-2">
                      {selectedProduct?.colors?.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-8 h-8 rounded-full border border-neutral-300 cursor-pointer transition-all duration-200 hover:scale-110 ${
                            selectedColor === color ? "ring-2 ring-black ring-offset-2 scale-110" : ""
                          }`}
                          style={{ backgroundColor: color.toLowerCase() }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div className="mb-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">Size:</p>
                    <div className="flex gap-2 mt-2">
                      {selectedProduct?.sizes?.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border rounded-none transition-all duration-200 ${
                            selectedSize === size
                              ? "bg-black text-white border-black"
                              : "bg-white text-black border-neutral-200 hover:bg-neutral-50 hover:border-black"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="mb-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Quantity:</p>
                    <div className="flex items-center mt-2">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange("minus")}
                        className="px-4 py-2 bg-white border border-neutral-200 text-sm font-bold hover:bg-black hover:text-white rounded-none transition duration-200 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-sm font-bold w-12 text-center select-none">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange("plus")}
                        className="px-4 py-2 bg-white border border-neutral-200 text-sm font-bold hover:bg-black hover:text-white rounded-none transition duration-200 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    disabled={isButtonDisabled}
                    className={`bg-black hover:bg-neutral-800 text-white font-bold py-4 px-6 text-xs uppercase tracking-widest rounded-none transition duration-300 w-full mb-6 cursor-pointer ${
                      isButtonDisabled ? "cursor-not-allowed opacity-50" : ""
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
          <div className="mb-16 w-full px-4 sm:px-6 lg:px-8 max-w-[1750px] mx-auto">
            <div className='flex items-center justify-center mb-8 relative'>
              <h2 className='text-lg md:text-xl font-bold uppercase tracking-widest text-center'>
                You May Also Like
              </h2>
            </div>

            {/* Scrollable Content Container */}
            <div className="relative group">
              {/* Floating Left Scroll Button */}
              {canScrollLeft && (
                <button
                  onClick={() => scroll("left")}
                  className="absolute left-2 top-[225px] -translate-y-1/2 text-neutral-700 hover:text-black hover:scale-125 active:scale-95 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none group-hover:pointer-events-auto p-2"
                >
                  <FiChevronLeft className='text-3xl' />
                </button>
              )}

              {/* Scrollable Content */}
              <div
                ref={scrollRef}
                className={`overflow-x-scroll flex space-x-6 relative no-scrollbar ${isDragging ? "cursor-grabbing" : "cursor-grab"
                  } pb-4`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
              >
                {similarProducts?.map((product) => (
                  <div key={product._id} className='min-w-full sm:min-w-[calc(50%-12px)] lg:min-w-[calc(25%-18px)] w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0 relative select-none group/card'>
                    <div className='relative overflow-hidden bg-gray-100 rounded-none border border-neutral-200'>
                      <Link to={`/product/${product._id}`} className='block'>
                        <img
                          src={product.images?.[0]?.url || 'https://via.placeholder.com/500'}
                          alt={product.images?.[0]?.altText || product.name}
                          className='w-full h-[450px] object-cover pointer-events-none transition-transform duration-500 group-hover/card:scale-105'
                          draggable={false}
                        />
                      </Link>

                      {/* Quick Add Bar */}
                      <button
                        onClick={() => setSelectedQuickAddProduct(product)}
                        className='absolute bottom-0 left-0 right-0 bg-black text-white font-bold py-3 text-xs tracking-widest uppercase opacity-0 translate-y-full group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-300 rounded-none cursor-pointer'
                      >
                        Quick Add
                      </button>
                    </div>

                    {/* Product Info below image */}
                    <div className='mt-4 text-center'>
                      <Link to={`/product/${product._id}`} className='block'>
                        <h4 className='text-xs font-semibold uppercase tracking-wider text-gray-800 mb-1'>{product.name}</h4>
                        <p className='font-bold text-sm text-gray-900'>${Number(product.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Floating Right Scroll Button */}
              {canScrollRight && (
                <button
                  onClick={() => scroll("right")}
                  className="absolute right-2 top-[225px] -translate-y-1/2 text-neutral-700 hover:text-black hover:scale-125 active:scale-95 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none group-hover:pointer-events-auto p-2"
                >
                  <FiChevronRight className='text-3xl' />
                </button>
              )}
            </div>
            {selectedQuickAddProduct && (
              <QuickAddModal
                product={selectedQuickAddProduct}
                onClose={() => setSelectedQuickAddProduct(null)}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;