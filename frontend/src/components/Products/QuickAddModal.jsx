import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { toast } from "sonner";
import { FiX } from "react-icons/fi";

const QuickAddModal = ({ product, onClose }) => {
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden transition-all transform scale-100 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-black transition duration-200"
        >
          <FiX className="text-xl" />
        </button>

        {/* Product Summary */}
        <div className="flex gap-4 items-center border-b pb-4">
          <img
            src={product.images?.[0]?.url || "https://via.placeholder.com/150"}
            alt={product.images?.[0]?.altText || product.name}
            className="w-20 h-20 object-cover rounded-xl"
          />
          <div>
            <h3 className="font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
            <p className="font-bold text-neutral-900 mt-1">
              ${Number(product.price).toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Color Selection */}
        {product.colors?.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Select Color:
            </p>
            <div className="flex gap-2.5 flex-wrap">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                    selectedColor === color ? "border-black scale-105 shadow-sm" : "border-gray-200"
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
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Select Size:
            </p>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1.5 min-w-[40px] text-sm font-medium border rounded-lg transition-all duration-200 ${
                    selectedSize === size
                      ? "bg-black text-white border-black shadow-sm"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
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
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Quantity:
          </p>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleQuantityChange("minus")}
              className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg text-lg font-bold hover:bg-gray-200 transition active:scale-95"
            >
              -
            </button>
            <span className="text-base font-semibold w-6 text-center select-none">{quantity}</span>
            <button
              onClick={() => handleQuantityChange("plus")}
              className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg text-lg font-bold hover:bg-gray-200 transition active:scale-95"
            >
              +
            </button>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className={`w-full bg-black text-white py-3.5 rounded-xl font-bold tracking-wider uppercase text-xs transition shadow-md ${
            isAddingToCart
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-neutral-800 active:scale-[0.98]"
          }`}
        >
          {isAddingToCart ? "Adding..." : "Add to Cart"}
        </button>

      </div>
    </div>
  );
};

export default QuickAddModal;
