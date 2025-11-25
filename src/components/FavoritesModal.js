import React, { useEffect, useState } from "react";

export default function FavoritesModal({ isOpen, onClose }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const stored = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(stored);
    }
  }, [isOpen]);

  const removeFromFavorites = (name) => {
    let stored = JSON.parse(localStorage.getItem("favorites")) || [];
    stored = stored.filter((item) => item.name !== name);
    localStorage.setItem("favorites", JSON.stringify(stored));
    setFavorites(stored);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-panel">
        <h2>Your Favorites</h2>
        {favorites.length === 0 ? (
          <p className="modal-empty-text">No favorites yet.</p>
        ) : (
          <ul className="modal-list">
            {favorites.map((item) => (
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
                  onClick={() => removeFromFavorites(item.name)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
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
