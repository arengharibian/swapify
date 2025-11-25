import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CartModal({ isOpen, onClose }) {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      const stored = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(stored);
    }
  }, [isOpen]);

  const removeFromCart = (name) => {
    let stored = JSON.parse(localStorage.getItem("cart")) || [];
    stored = stored.filter((item) => item.name !== name);
    localStorage.setItem("cart", JSON.stringify(stored));
    setCart(stored);
  };

  const goToCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-panel">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p className="modal-empty-text">Your cart is empty.</p>
        ) : (
          <ul className="modal-list">
            {cart.map((item) => (
              <li key={item.name} className="modal-list-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="modal-item-image"
                />
                <div className="modal-item-info">
                  <span className="modal-item-title">{item.name}</span>
                </div>
                <button
                  type="button"
                  className="badge-button danger"
                  onClick={() => removeFromCart(item.name)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        {cart.length > 0 && (
          <button
            type="button"
            className="primary-btn full-width"
            onClick={goToCheckout}
          >
            Proceed to Checkout
          </button>
        )}

        <button
          type="button"
          className="ghost-btn full-width modal-close-btn"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
