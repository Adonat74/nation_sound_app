import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useState } from 'react';
import Paypal from './Paypal';
import './Checkout.css'
import { Helmet } from "react-helmet";

const initialOptions = {
    "client-id": "AcXDOsYzLskTO4VmEVLsRkbq3SGV2yhs4s8BTlBC7ar9iJGhHGrxj88m4MIvUo7Gx3SnxonogODiSJw6",
    currency: "EUR",
    intent: "capture",
};

export default function Checkout() {

  const [price, setPrice] = useState(50);

  

  return (
    <div className="checkout">
        <Helmet>
            <title>Nation-Sound Festival - Paiement</title>
            <meta name="title" content="Nation-Sound Festival - Paiement" />
            <meta name="description" content="Paiement." />
        </Helmet>
        <div className="numberTicketSelect">
            <h1>Billeterie</h1>
            <p>1 Billet = 50.00 EUR</p>
            <div>
                <select 
                    id="numberTicket" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                >
                    <option value="50">1 billet</option>
                    <option value="100">2 billets</option>
                    <option value="150">3 billets</option>
                    <option value="200">4 billets</option>
                </select>
            </div>
            <p>Total : € {price}</p>
        </div>
        <PayPalScriptProvider options={initialOptions}>
            <Paypal price={price}/>
        </PayPalScriptProvider>
    </div>
  );
}

// import { useRef, useEffect, useState } from "react";
// import './PayPal.css'

// export default function PayPal() {
//   const paypal = useRef();

//   const [price, setPrice] = useState(50);



//   useEffect(() => {
//     window.paypal
//       .Buttons({
//         createOrder: (data, actions, err) => {
//           return actions.order.create({
//             intent: "CAPTURE",
//             purchase_units: [
//               {
//                 description: "1 Ticket",
//                 amount: {
//                   currency_code: "EUR",
//                   value: price,
//                 },
//               },
//             ],
//           });
//         },
//         onApprove: async (data, actions) => {
//           const order = await actions.order.capture();
//           //console.log(order);
//         },
//         onError: (err) => {
//           //console.log(err);
//         },
//       })
//       .render(paypal.current);
//   }, []);

//   return (
//     <div className="paypal">
//         <div className="numberTicketSelect">
//             <h1>Billeterie</h1>
//             <p>1 Billet = 50.00 EUR</p>
//             <div>
//                 <select 
//                     id="numberTicket" 
//                     value={price}
//                     onChange={(e) => setPrice(parseInt(e.target.value))}
//                 >
//                     <option value="50">1 billet</option>
//                     <option value="100">2 billets</option>
//                     <option value="150">3 billets</option>
//                     <option value="200">4 billets</option>
//                 </select>
//             </div>
//             <p>Total : € {price}</p>
//         </div>
//         <div className="paypalContainer">
//             <h2>Règlement :</h2>
//             <div ref={paypal}></div>
//         </div>
//     </div>
//   );
// }