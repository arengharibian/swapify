import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("customListings")) || [];
    setListings(stored);
  }, []);

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
    const currentUserEmail = localStorage.getItem("loggedInEmail");
    let stored = JSON.parse(localStorage.getItem("customListings")) || [];
    const listing = stored.find((x) => x.title === title);

    if (!listing || listing.ownerEmail !== currentUserEmail) {
      alert("You can only delete your own listings.");
      return;
    }

    if (!window.confirm(`Delete "${title}"?`)) return;

    stored = stored.filter(
      (x) => !(x.title === title && x.ownerEmail === currentUserEmail)
    );
    localStorage.setItem("customListings", JSON.stringify(stored));
    setListings(stored);
    alert("Listing deleted.");
  };

  const filteredListings = listings.filter((l) =>
    l.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-page">
      {/* HERO ROW */}
      <section className="hero-row">
        {/* LEFT CATEGORY SIDEBAR */}
        <aside className="hero-sidebar">
          <div className="hero-sidebar-header">
            <span className="hero-sidebar-dot">●</span>
            <span className="hero-sidebar-title">Market</span>
          </div>
          <ul className="category-list">
            <li>Accessories</li>
            <li>Best Sellers</li>
            <li>Clothing</li>
            <li>Tech & Gadgets</li>
            <li>Sports & Outdoors</li>
            <li>Books & Study</li>
            <li>Dorm Essentials</li>
            <li>Furniture</li>
            <li>Free & Giveaways</li>
          </ul>
        </aside>

        {/* CENTER HERO BANNER */}
        <div className="hero-main">
          <div className="hero-banner">
            <div className="hero-banner-text">
              <p className="hero-pill">Campus verified • Local pickup</p>
              <h1>Marketplace for every semester.</h1>
              <p className="hero-banner-sub">
                Buy and sell textbooks, dorm gear, and everything in between —
                safely with other students.
              </p>
              <button
                type="button"
                className="primary-btn"
                onClick={() => navigate("/create")}
              >
                Start selling now →
              </button>
            </div>
            <div className="hero-banner-image">
              {/* You can swap this to your own promo image later */}
              <img
                src="https://images.unsplash.com/photo-1514996937319-344454492b37"
                alt="Student shopping online"
              />
            </div>
          </div>
        </div>

        {/* RIGHT PROMO COLUMN */}
        <aside className="hero-promos">
          <div className="promo-card promo-clearance">
            <p className="promo-label">Clearance</p>
            <h3>End-of-term deals</h3>
            <button type="button" onClick={() => navigate("/browse")}>
              Shop now
            </button>
          </div>

          <div className="promo-card promo-small">
            <p className="promo-label">Cool Offers</p>
            <h3>Tech & accessories</h3>
          </div>

          <div className="promo-card promo-small">
            <p className="promo-label">New Drops</p>
            <h3>Fresh listings daily</h3>
          </div>
        </aside>
      </section>

      {/* SEARCH + LISTINGS */}
      <section className="home-main">
        <div className="home-toolbar">
          <div className="home-toolbar-left">
            <h2>Latest listings</h2>
            <p>Browse what students near you are selling.</p>
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
              No listings yet. Be the first to{" "}
              <button
                type="button"
                className="inline-link"
                onClick={() => navigate("/create")}
              >
                post an item
              </button>
              .
            </p>
          )}
        </ul>
      </section>
    </div>
  );
}
