import React from 'react'
import { RiDeleteBin3Line } from 'react-icons/ri'
import { updateCartItemQuantity, removeFromCart } from '../../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';

const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  // Handle adding or substracting to cart
  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      );
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(
      removeFromCart({
        productId,
        guestId,
        userId,
        size,
        color,
      })
    );
  };

  return (
    <div>
      {cart?.products?.map((product, index) => (
        <div
          key={index}
          className='flex items-start justify-between py-6 border-b border-neutral-200'
        >
          <div className='flex items-start'>
            <img src={product.image}
              alt={product.name}
              className='w-20 h-24 object-cover rounded-none border border-neutral-100'
            />
            <div className='ml-4 flex flex-col justify-between h-24'>
              <div>
                <h3 className='text-xs font-bold uppercase tracking-wider text-black'>{product.name}</h3>
                <p className='text-[10px] uppercase tracking-wide text-neutral-400 font-medium mt-1'>
                  size: {product.size} | color: {product.color}
                </p>
              </div>
              <div className='flex items-center mt-auto'>
                <button 
                  onClick={() => handleAddToCart(product.productId, -1, product.quantity, product.size, product.color)}
                  className='border border-neutral-300 w-8 h-8 flex items-center justify-center text-sm rounded-none hover:border-black hover:bg-neutral-50 transition-colors cursor-pointer'
                >
                  -
                </button>
                <span className='mx-4 text-xs font-bold text-black'>{product.quantity}</span>

                <button 
                  onClick={() => handleAddToCart(product.productId, 1, product.quantity, product.size, product.color)}
                  className='border border-neutral-300 w-8 h-8 flex items-center justify-center text-sm rounded-none hover:border-black hover:bg-neutral-50 transition-colors cursor-pointer'
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className='text-right flex flex-col justify-between h-24'>
            <p className='text-xs font-black text-black'>$ {product.price.toLocaleString()}</p>
            <button 
              onClick={() => handleRemoveFromCart(product.productId, product.size, product.color)}
              className="mt-auto self-end focus:outline-none"
            >
              <RiDeleteBin3Line className='h-5 w-5 text-neutral-400 hover:text-black transition-colors cursor-pointer' />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CartContents;