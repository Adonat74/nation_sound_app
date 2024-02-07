import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import React, { useState, useEffect } from 'react';


export default function Paypal(props) {


  const onCreateOrder = (data, actions) => {
      return actions.order.create({
          purchase_units: [
              {
                  amount: {
                      value: props.price,
                  },
              },
          ],
      });
  }


  const onApproveOrder = (data,actions) => {
      return actions.order.capture().then((details) => {
          const name = details.payer.name.given_name;
          alert(`Transaction completed by ${name}`);
      });
  }

  return (
        <div className="paypal">
            <div className="paypalContainer">
                <PayPalButtons 
                    style={{ layout: "vertical" }}
                    createOrder={(data, actions) => onCreateOrder(data, actions)}
                    onApprove={(data, actions) => onApproveOrder(data, actions)}
                />
            </div>
        </div>
    );
}