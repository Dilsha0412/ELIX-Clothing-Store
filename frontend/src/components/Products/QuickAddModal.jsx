import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { toast } from "sonner";
import { FiX } from "react-icons/fi";

import { useCurrency } from "../../hooks/useCurrency";

const QuickAddModal = ({ product, onClose }) => {
  const { formatPrice } = useCurrency();
  const dispatch = useDispatch();
  const { user, guestId } = useSelector((state) => state.auth);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  if (!product) return null;

  const handleQuantityChange = (action) => {
    if (action === "plus") setQuantity((prev) => prev + 1);
    if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (product.sizes?.length > 0 && !selectedSize) {
      toast.error("Please select a size first.", { duration: 1500 });
      return;
    }
    if (product.colors?.length > 0 && !selectedColor) {
      toast.error("Please select a color first.", { duration: 1500 });
      return;
    }

    setIsAddingToCart(true);

    dispatch(
      addToCart({
        productId: product._id,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Product added to cart!", { duration: 1500 });
        onClose();
      })
      .catch((err) => {
        console.error(err);
        toast.error(err?.message || "Failed to add product to cart.");
      })
      .finally(() => {
        setIsAddingToCart(false);
      });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-none border border-neutral-200 max-w-md w-full p-6 shadow-none relative overflow-hidden transition-all transform scale-100 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-none border border-neutral-100 hover:border-black hover:bg-black hover:text-white text-gray-500 transition duration-200 cursor-pointer"
        >
          <FiX className="text-sm" />
        </button>

        {/* Product Summary */}
        <div className="flex gap-4 items-center border-b pb-4">
          <img
            src={product.images?.[0]?.url || "https://via.placeholder.com/150"}
            alt={product.images?.[0]?.altText || product.name}
            className="w-20 h-20 object-cover rounded-none border border-neutral-100"
          />
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-neutral-800 line-clamp-2">{product.name}</h3>
            <p className="font-bold text-neutral-900 mt-1">
              {formatPrice(product.price)}
            </p>
          </div>
        </div>

        {/* Color Selection */}
        {product.colors?.length > 0 && (
          <div>
            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">
              Select Color:
            </p>
            <div className="flex gap-3 flex-wrap mt-1">
              {product.colors.map((color) => (
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
        )}

        {/* Size Selection */}
        {product.sizes?.length > 0 && (
          <div>
            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">
              Select Size:
            </p>
            <div className="flex gap-2 flex-wrap mt-1">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border rounded-none transition-all duration-200 cursor-pointer ${
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
        )}

        {/* Quantity Selector */}
        <div>
          <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">
            Quantity:
          </p>
          <div className="flex items-center mt-1">
            <button
              onClick={() => handleQuantityChange("minus")}
              className="px-3 py-1.5 bg-white border border-neutral-200 text-xs font-bold hover:bg-black hover:text-white rounded-none transition duration-200 cursor-pointer"
            >
              -
            </button>
            <span className="text-xs font-bold w-10 text-center select-none">{quantity}</span>
            <button
              onClick={() => handleQuantityChange("plus")}
              className="px-3 py-1.5 bg-white border border-neutral-200 text-xs font-bold hover:bg-black hover:text-white rounded-none transition duration-200 cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className={`w-full bg-black hover:bg-neutral-800 text-white font-bold py-3.5 px-6 text-xs uppercase tracking-widest rounded-none transition duration-300 cursor-pointer ${
            isAddingToCart ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isAddingToCart ? "Adding..." : "Add to Cart"}
        </button>

      </div>
    </div>
  );
};

export default QuickAddModal;
