import React, { useEffect, useState } from "react";

export default function FavoritesModal({ isOpen, onClose }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
    }
  }, [isOpen]);

  const removeFav = (name) => {
    let stored = JSON.parse(localStorage.getItem("favorites")) || [];
    stored = stored.filter((i) => i.name !== name);
    localStorage.setItem("favorites", JSON.stringify(stored));
    setFavorites(stored);
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>Your Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <ul>
          {favorites.map((i) => (
            <li key={i.name}>
              <img src={i.image} alt="" style={{ width: 50, height: 50 }} />
              {i.name}
              <button onClick={() => removeFav(i.name)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
}
