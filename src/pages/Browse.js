import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Browse() {
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    if (!loggedIn) {
      alert("You must sign in to access Browse.");
      navigate("/signin");
      return;
    }
    const stored = JSON.parse(localStorage.getItem("customListings")) || [];
    setListings(stored);
  }, [navigate]);

  const addCart = (title, image) => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    if (!loggedIn) {
      alert("Please sign in to use the cart.");
      navigate("/signin");
      return;
    }
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name: title, image });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${title} added to cart.`);
  };

  const addFav = (title, image) => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    if (!loggedIn) {
      alert("Please sign in to use favorites.");
      navigate("/signin");
      return;
    }
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.find((f) => f.name === title)) {
      favorites.push({ name: title, image });
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert(`${title} added to favorites.`);
    } else {
      alert(`${title} is already in your favorites.`);
    }
  };

  const deleteListing = (title) => {
    const me = localStorage.getItem("loggedInEmail");
    let stored = JSON.parse(localStorage.getItem("customListings")) || [];
    const listing = stored.find((x) => x.title === title);

    if (!listing || listing.ownerEmail !== me) {
      alert("You can only delete your own listings.");
      return;
    }

    if (!window.confirm(`Delete "${title}"?`)) return;

    stored = stored.filter(
      (x) => !(x.title === title && x.ownerEmail === me)
    );
    localStorage.setItem("customListings", JSON.stringify(stored));
    setListings(stored);
    alert("Listing deleted.");
  };

  const filteredListings = listings.filter((l) =>
    l.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="browse-main">
      <div className="home-toolbar">
        <div className="home-toolbar-left">
          <h2>Browse all listings</h2>
          <p>Filter and discover what other students are selling.</p>
        </div>
        <div className="home-toolbar-right">
          <input
            type="text"
            className="home-search-input"
            placeholder="Search listings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <ul className="product-grid">
        {filteredListings.map((item) => {
          const me = localStorage.getItem("loggedInEmail");
          const isOwner = item.ownerEmail === me;

          return (
            <li className="listing" key={item.title}>
              <img
                src={item.image}
                alt={item.title}
                className="listing-img"
              />
              <div className="listing-body">
                <div className="listing-header">
                  <strong className="listing-title">{item.title}</strong>
                  <span className="listing-price">${item.price}</span>
                </div>
                <p className="listing-meta">Posted by a Swapify user</p>
                <div className="listing-actions">
                  <button
                    type="button"
                    onClick={() => addCart(item.title, item.image)}
                  >
                    Add to cart
                  </button>
                  <button
                    type="button"
                    className="outline-btn"
                    onClick={() => addFav(item.title, item.image)}
                  >
                    ♥ Favorite
                  </button>
                  {isOwner && (
                    <button
                      type="button"
                      className="danger-btn"
                      onClick={() => deleteListing(item.title)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </li>
          );
        })}

        {filteredListings.length === 0 && (
          <p className="empty-state">
            No listings found. Try a different search term.
          </p>
        )}
      </ul>
    </main>
  );
}
