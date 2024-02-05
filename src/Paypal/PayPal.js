import { useRef, useEffect, useState } from "react";
import './PayPal.css'

export default function PayPal() {
  const paypal = useRef();

  const [price, setPrice] = useState(50);



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
                  value: price,
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
        <div className="numberTicketSelect">
            <h1>Billeterie</h1>
            <p>1 Billet = 50.00 EUR</p>
            <div>
                <select 
                    id="numberTicket" 
                    value={price}
                    onChange={(e) => setPrice(parseInt(e.target.value))}
                >
                    <option value="50">1 billet</option>
                    <option value="100">2 billets</option>
                    <option value="150">3 billets</option>
                    <option value="200">4 billets</option>
                </select>
            </div>
            <p>Total : € {price}</p>
        </div>
        <div className="paypalContainer">
            <h2>Règlement :</h2>
            <div ref={paypal}></div>
        </div>
    </div>
  );
}