// components/PaymentForm.js

import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PaymentForm = ({ nextStep, prevStep }) => {
  const handlePaymentSuccess = (details) => {
    // Handle payment success logic here
    console.log("Payment success:", details);
    nextStep(); // Move to confirmation step
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "Abrd8YZVQR652MGnjXfmStyBGHCJwrX8JG5XY-BVXq1ps0WuGuZftLeVftF-Lp3DEireg53qF6Vv5npR" }}>
      <h2>Payment</h2>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: { value: "1850.00" }
            }]
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(handlePaymentSuccess);
        }}
      />
      <button onClick={prevStep}>Back</button>
    </PayPalScriptProvider>
  );
};

export default PaymentForm;
