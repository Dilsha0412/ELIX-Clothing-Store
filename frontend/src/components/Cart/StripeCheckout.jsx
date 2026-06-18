import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

// Initialize Stripe outside of component to avoid recreating Stripe object
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "pk_test_mock");

const CheckoutForm = ({ checkoutId, onSuccess, onError, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/order-confirmation",
      },
      redirect: "if_required"
    });

    if (error) {
      setMessage(error.message);
      if (onError) onError(error);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("Payment succeeded!");
      onSuccess(paymentIntent);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <PaymentElement id="payment-element" />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="w-full bg-black hover:bg-neutral-800 text-white font-bold py-4 px-6 text-xs uppercase tracking-widest rounded-none transition duration-300 cursor-pointer shadow-sm mt-6"
      >
        <span id="button-text">
          {isLoading ? "Processing..." : `Pay $${amount}`}
        </span>
      </button>
      {message && <div id="payment-message" className="mt-4 text-red-500 text-sm font-semibold">{message}</div>}
    </form>
  );
};

const MockCheckoutForm = ({ amount, onSuccess }) => {
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [expiry, setExpiry] = useState("12/28");
  const [cvc, setCvc] = useState("123");
  const [name, setName] = useState("John Doe");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess({
        id: `mock_pi_${Math.random().toString(36).substr(2, 9)}`,
        status: "succeeded",
        amount: amount * 100,
        currency: "usd",
        payment_method_details: {
          card: {
            last4: "4242"
          }
        }
      });
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-amber-50 border border-amber-200 p-3 mb-4 text-xs text-amber-800">
        <strong>Demo Mode:</strong> Stripe API keys are not configured. You can use this simulated form to complete the checkout.
      </div>
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">Cardholder Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 text-sm border border-neutral-300 rounded-none focus:outline-none focus:border-black"
          required
        />
      </div>
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">Card Number</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="w-full p-3 text-sm border border-neutral-300 rounded-none focus:outline-none focus:border-black"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">Expiration Date</label>
          <input
            type="text"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="w-full p-3 text-sm border border-neutral-300 rounded-none focus:outline-none focus:border-black"
            required
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">CVC</label>
          <input
            type="text"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            className="w-full p-3 text-sm border border-neutral-300 rounded-none focus:outline-none focus:border-black"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-black hover:bg-neutral-800 text-white font-bold py-4 px-6 text-xs uppercase tracking-widest rounded-none transition duration-300 cursor-pointer shadow-sm mt-6"
      >
        {isLoading ? "Processing Demo Payment..." : `Pay $${amount} (Demo)`}
      </button>
    </form>
  );
};

const StripeCheckout = ({ checkoutId, onSuccess, onError, amount }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [isMock, setIsMock] = useState(false);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/+$/, '') || '';
        const res = await axios.post(
          `${backendUrl}/api/payment/create-payment-intent`,
          { checkoutId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );
        setClientSecret(res.data.clientSecret);
        setIsMock(!!res.data.isMock);
      } catch (err) {
        console.error("Failed to create payment intent", err);
        if (onError) onError(err);
      }
    };

    if (checkoutId) {
      createPaymentIntent();
    }
  }, [checkoutId]);

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#000000',
      colorBackground: '#ffffff',
      colorText: '#30313d',
      colorDanger: '#df1b41',
      fontFamily: 'Ideal Sans, system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '0px',
    }
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="StripeCheckout mt-6">
      {clientSecret ? (
        isMock ? (
          <MockCheckoutForm amount={amount} onSuccess={onSuccess} />
        ) : (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm checkoutId={checkoutId} onSuccess={onSuccess} onError={onError} amount={amount} />
          </Elements>
        )
      ) : (
        <p className="text-sm text-neutral-500">Loading payment details...</p>
      )}
    </div>
  );
};

export default StripeCheckout;
