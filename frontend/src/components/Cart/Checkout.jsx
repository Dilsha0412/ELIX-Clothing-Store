import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import StripeCheckout from './StripeCheckout';
import { useSelector, useDispatch } from 'react-redux';
import { createCheckout } from '../../redux/slices/checkoutSlice';
import axios from 'axios';

import { useCurrency } from '../../hooks/useCurrency';

const Checkout = () => {
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();
  const buyNowItem = location.state?.buyNowItem;
  const isBuyNow = location.state?.isBuyNow;

  const checkoutProducts = buyNowItem ? [buyNowItem] : cart?.products || [];
  const checkoutTotalPrice = buyNowItem ? (buyNowItem.price * buyNowItem.quantity) : cart?.totalPrice || 0;

  const [checkoutId, setCheckoutId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  // Ensure cart is loaded before proceeding
  useEffect(() => {
    if (!buyNowItem && (!cart || !cart.products || cart.products.length === 0)) {
        navigate("/");
    }
  }, [cart, navigate, buyNowItem]);

  const handleCreateCheckout = async (e) => {
    e.preventDefault();

    if (checkoutProducts.length > 0) {
      try {
        const result = await dispatch(
          createCheckout({
            checkoutItems: checkoutProducts,
            shippingAddress,
            paymentMethod: paymentMethod,
            totalPrice: checkoutTotalPrice,
            isBuyNow: isBuyNow || false,
          })
        ).unwrap();

        if (result && result._id) {
          if (paymentMethod === "stripe") {
            setCheckoutId(result._id); // Set checkout ID if successful
          } else {
            handleFinalizeCheckout(result._id); // Finalize immediately for COD
          }
        }
      } catch (err) {
        alert(err?.message || "Failed to create checkout. Try again.");
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/+$/, '') || '';
      const response = await axios.put(
        `${backendUrl}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: "paid", paymentDetails: details },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      if (response.status === 200) {
         await handleFinalizeCheckout(checkoutId); // Finalize checkout if payment is successful
      }
    } catch (error) {
      console.error("Payment registration error:", error);
      alert(error.response?.data?.message || "Failed to register payment on the server. Please try again.");
    }
  };

  const handleFinalizeCheckout = async (id) => {
    try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/+$/, '') || '';
        await axios.post(
            `${backendUrl}/api/checkout/${id}/finalize`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            }
        );
      navigate("/order-confirmation");
    } catch (error) {
        console.error("Finalize checkout error:", error);
        alert(error.response?.data?.message || "Failed to finalize the checkout. Please try again.");
    }
  };

  if (loading) return <p>Loading cart ...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!checkoutProducts || checkoutProducts.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 tracking-tighter bg-white'>

      {/* Left Section - Form */}
      <div className='bg-white rounded-none border border-neutral-200 p-6 md:p-8 shadow-none'>
        <h2 className='text-3xl font-black uppercase tracking-wider text-black mb-1'>Checkout</h2>
        <p className="text-xs text-neutral-500 tracking-wide font-medium mb-8">Complete your purchase details to place the order</p>
        
        <form onSubmit={handleCreateCheckout}>
          <h3 className='text-xs font-bold uppercase tracking-widest text-neutral-800 border-b border-neutral-200 pb-3 mb-6'>Contact Details</h3>
          <div className='mb-6'>
            <label className='block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2'>Email</label>
            <input
              type="email"
              value={user ? user.email : ""}
              className='w-full p-3 text-sm border border-neutral-200 rounded-none bg-neutral-50 text-neutral-400 focus:outline-none focus:ring-0 cursor-not-allowed'
              disabled
              />
          </div>
            
          <h3 className='text-xs font-bold uppercase tracking-widest text-neutral-800 border-b border-neutral-200 pb-3 mb-6 mt-8'>Delivery Address</h3>
          <div className='mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div>
              <label className='block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2'>First Name</label>
              <input
                type="text"
                value={shippingAddress.firstName} 
                onChange={(e) => 
                  setShippingAddress({
                    ...shippingAddress, 
                    firstName: e.target.value
                  })
                }
                className='w-full p-3 text-sm border border-neutral-300 rounded-none focus:outline-none focus:border-black focus:ring-0 bg-white transition-all'
                required
                />
              </div>

               <div>
              <label className='block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2'>Last Name</label>
              <input
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) => 
                  setShippingAddress({
                    ...shippingAddress, 
                    lastName: e.target.value
                  })
                }
                className='w-full p-3 text-sm border border-neutral-300 rounded-none focus:outline-none focus:border-black focus:ring-0 bg-white transition-all'
                required
                />
              </div>
            </div>
            <div className='mb-6'>
              <label className='block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2'>Address</label>
              <input
                type="text"
                value={shippingAddress.address}
                onChange={(e) => 
                  setShippingAddress({
                    ...shippingAddress, 
                    address: e.target.value
                  })
                }
                className='w-full p-3 text-sm border border-neutral-300 rounded-none focus:outline-none focus:border-black focus:ring-0 bg-white transition-all'
                required
                />
              </div>
              <div className='mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
              <label className='block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2'>City</label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) => 
                  setShippingAddress({
                    ...shippingAddress, 
                    city: e.target.value
                  })
                }
                className='w-full p-3 text-sm border border-neutral-300 rounded-none focus:outline-none focus:border-black focus:ring-0 bg-white transition-all'
                required
                />
              </div>

               <div>
              <label className='block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2'>Postal Code</label>
              <input
                type="text"
                value={shippingAddress.postalCode}
                onChange={(e) => 
                  setShippingAddress({
                    ...shippingAddress, 
                    postalCode: e.target.value
                  })
                }
                className='w-full p-3 text-sm border border-neutral-300 rounded-none focus:outline-none focus:border-black focus:ring-0 bg-white transition-all'
                required
                />
              </div>
              </div>

              <div className='mb-6'>
              <label className='block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2'>Country</label>
              <input
                type="text"
                value={shippingAddress.country}
                onChange={(e) => 
                  setShippingAddress({
                    ...shippingAddress, 
                    country: e.target.value
                  })
                }
                className='w-full p-3 text-sm border border-neutral-300 rounded-none focus:outline-none focus:border-black focus:ring-0 bg-white transition-all'
                required
                />
              </div>

              <div className='mb-6'>
              <label className='block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2'>Phone</label>
              <input
                type="tel"
                value={shippingAddress.phone}
                onChange={(e) => 
                  setShippingAddress({
                    ...shippingAddress, 
                    phone: e.target.value
                  })
                }
                className='w-full p-3 text-sm border border-neutral-300 rounded-none focus:outline-none focus:border-black focus:ring-0 bg-white transition-all'
                required
                />
              </div>

              <h3 className='text-xs font-bold uppercase tracking-widest text-neutral-800 border-b border-neutral-200 pb-3 mb-6 mt-8'>Payment Method</h3>
              <div className='mb-6'>
                <label 
                  htmlFor="stripe"
                  className="flex items-center mb-4 cursor-pointer"
                >
                  <input
                    type="radio"
                    id="stripe"
                    name="paymentMethod"
                    value="stripe"
                    checked={paymentMethod === "stripe"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 flex items-center justify-center rounded-sm border transition-colors ${paymentMethod === 'stripe' ? 'bg-black border-black' : 'bg-white border-neutral-300'}`}>
                    {paymentMethod === 'stripe' && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path>
                      </svg>
                    )}
                  </div>
                  <span className="ml-3 text-[10px] font-bold uppercase tracking-widest text-neutral-800">
                    Stripe (Credit Card)
                  </span>
                </label>

                <label 
                  htmlFor="cod"
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="Cash On Delivery"
                    checked={paymentMethod === "Cash On Delivery"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 flex items-center justify-center rounded-sm border transition-colors ${paymentMethod === 'Cash On Delivery' ? 'bg-black border-black' : 'bg-white border-neutral-300'}`}>
                    {paymentMethod === 'Cash On Delivery' && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path>
                      </svg>
                    )}
                  </div>
                  <span className="ml-3 text-[10px] font-bold uppercase tracking-widest text-neutral-800">
                    Cash On Delivery
                  </span>
                </label>
              </div>

              <div className='mt-8'>
                {!checkoutId && (
                  <button
                   type='submit'
                   className='w-full bg-black hover:bg-neutral-800 text-white font-bold py-4 px-6 text-xs uppercase tracking-widest rounded-none transition duration-300 cursor-pointer shadow-sm'
                   >
                    {paymentMethod === "stripe" ? "Continue to Payment" : "Place Order"}
                  </button>
                )}
              </div>
          </form>

          {checkoutId && (
            <div className="mt-6 border-t border-neutral-200 pt-6">
              <h3 className='text-xs font-bold uppercase tracking-widest text-neutral-800 mb-4'>Pay with Stripe</h3>
              <StripeCheckout
                checkoutId={checkoutId}
                amount={Number(checkoutTotalPrice).toFixed(2)} 
                onSuccess={handlePaymentSuccess} 
                onError={(err) => alert("Payment failed. Try again.")}
               />
              </div>
          )}
      </div>

     {/* Right Section - Summary */}
     <div className='bg-neutral-50 rounded-none border border-neutral-200 p-6 md:p-8 shadow-none h-fit'>
        <h3 className='text-xs font-bold uppercase tracking-widest text-neutral-800 border-b border-neutral-200 pb-3 mb-6'>Order Summary</h3>
        <div className='divide-y divide-neutral-200 py-2 mb-6'>
          {checkoutProducts.map((product, index) => (
            <div 
            key={index}
            className='flex items-start justify-between py-4'
            >
              <div className='flex items-start'>
                <img
                  src={product.image}
                  alt={product.name}
                  className='w-20 h-24 object-cover rounded-none border border-neutral-200 mr-4'
                />
                <div>
                  <h3 className='text-xs font-bold uppercase tracking-wider text-neutral-800 mb-2'>{product.name}</h3>
                  <p className='text-[10px] font-semibold text-neutral-400 uppercase tracking-wide mb-1'>Size: {product.size}</p>
                  <p className='text-[10px] font-semibold text-neutral-400 uppercase tracking-wide mb-1'>Color: {product.color}</p>
                  <p className='text-[10px] font-semibold text-neutral-400 uppercase tracking-wide'>Qty: {product.quantity}</p>
                </div>
              </div>
              <p className='text-sm font-bold text-neutral-800'>{formatPrice(product.price * product.quantity)}</p>
            </div>
          ))}
        </div> 

        <div className='flex justify-between items-center text-xs font-bold uppercase tracking-wider text-neutral-500 mb-4'>
          <p>Subtotal</p>
          <p className="text-neutral-800">{formatPrice(checkoutTotalPrice)}</p>
        </div>

        <div className='flex justify-between items-center text-xs font-bold uppercase tracking-wider text-neutral-500 mb-4'>
          <p>Shipping</p>
          <p className="text-neutral-800">Free</p> 
        </div>

        <div className='flex justify-between items-center text-sm font-black uppercase tracking-widest text-neutral-800 mt-4 border-t border-neutral-200 pt-4'>
          <p>Total</p>
          <p className="text-lg">{formatPrice(checkoutTotalPrice)}</p>
        </div>

      </div>  
    </div>
  );
};

export default Checkout;