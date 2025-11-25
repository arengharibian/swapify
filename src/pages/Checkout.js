import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");

  const submit = (e) => {
    e.preventDefault();

    if (!cardName || !cardNumber || !expiration || !cvv)
      return alert("Fill all fields.");

    if (!/^\d{16}$/.test(cardNumber.replace(/\s+/g, "")))
      return alert("Card number must be 16 digits.");

    if (!/^\d{2}\/\d{2}$/.test(expiration))
      return alert("Expiration: MM/YY");

    if (!/^\d{3,4}$/.test(cvv))
      return alert("Invalid CVV");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const listings = JSON.parse(localStorage.getItem("customListings")) || [];

    const updated = listings.filter(
      (l) => !cart.some((c) => c.name === l.title)
    );

    localStorage.setItem("customListings", JSON.stringify(updated));
    localStorage.removeItem("cart");

    alert("Thank you! Items purchased.");
    navigate("/");
  };

  return (
    <main className="form-container">
      <h1>Checkout</h1>
      <form className="form" onSubmit={submit}>
        <input
          placeholder="Name on Card"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />
        <input
          placeholder="Card Number"
          maxLength={19}
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <input
          placeholder="MM/YY"
          maxLength={5}
          value={expiration}
          onChange={(e) => setExpiration(e.target.value)}
        />
        <input
          placeholder="CVV"
          maxLength={4}
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />
        <button type="submit">Complete Purchase</button>
      </form>
    </main>
  );
}
