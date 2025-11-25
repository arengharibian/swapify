import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CartModal({ isOpen, onClose }) {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setCart(JSON.parse(localStorage.getItem("cart")) || []);
    }
  }, [isOpen]);

  const removeItem = (name) => {
    let stored = JSON.parse(localStorage.getItem("cart")) || [];
    stored = stored.filter((x) => x.name !== name);
    localStorage.setItem("cart", JSON.stringify(stored));
    setCart(stored);
  };

  const checkout = () => {
    onClose();
    navigate("/checkout");
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>Your Cart</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {cart.map((i) => (
                <li key={i.name}>
                  <img src={i.image} alt="" style={{ width: 50, height: 50 }} />
                  {i.name}
                  <button onClick={() => removeItem(i.name)}>Remove</button>
                </li>
              ))}
            </ul>
            <button className="checkout-button" onClick={checkout}>
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
