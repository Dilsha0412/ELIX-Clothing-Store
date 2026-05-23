import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  if (!import.meta.env.VITE_PAYPAL_CLIENT_ID) {
    console.error("PayPal Client ID is missing from .env!");
  }

  return (
    <PayPalScriptProvider 
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID || "sb",
        currency: "USD", 
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: parseFloat(amount).toFixed(2), currency_code: "USD" } }],
          });
        }} 
        onApprove={async (data, actions) => {
          try {
            const details = await actions.order.capture();
            onSuccess(details);
          } catch (err) {
            console.error("Capture Error:", err);
            if (onError) onError(err);
          }
        }}
        onError={(err) => {
          console.error("PayPal Script Error:", err);
          if (onError) onError(err);
        }}
      /> 
    </PayPalScriptProvider>
  );
};

export default PayPalButton;