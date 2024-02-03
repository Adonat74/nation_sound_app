import React, { useRef, useEffect } from "react";
import './PayPal.css'

export default function PayPal() {
  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "1 Ticket",
                amount: {
                  currency_code: "EUR",
                  value: 50.00,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div className="paypal">
        <div className="paypalContainer">
            <div ref={paypal}></div>
        </div>
    </div>
  );
}