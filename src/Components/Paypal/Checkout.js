import { useState } from "react";
import { PayPalButton } from 'react-paypal-button-v2';// Package permettant l'utilisation simplifiée de paypal
import { Helmet } from 'react-helmet-async';
import './Checkout.css'

export default function Checkout() {

  // Etat contenant le prix total
  const [price, setPrice] = useState(50);


  return (
    <div className="checkout">
        {/* Permet de changer les title et description pour chaques composants */}
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
            <PayPalButton
                amount={price}
                currency = "EUR"
                onSuccess={(details, data) => {
                  alert("Transaction completed by " + details.payer.name.given_name);
                }}
                options={{
                  clientId: 'AcXDOsYzLskTO4VmEVLsRkbq3SGV2yhs4s8BTlBC7ar9iJGhHGrxj88m4MIvUo7Gx3SnxonogODiSJw6',
                }}
            />
        </div>
    </div>
  );
}