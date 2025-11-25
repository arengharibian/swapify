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

  const addCart = (title, img) => {
    if (!localStorage.getItem("loggedIn")) {
      alert("Sign in first.");
      return navigate("/signin");
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name: title, image: img });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart.");
  };

  const addFav = (title, img) => {
    if (!localStorage.getItem("loggedIn")) {
      alert("Sign in first.");
      return navigate("/signin");
    }

    const fav = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!fav.find((x) => x.name === title)) {
      fav.push({ name: title, image: img });
      localStorage.setItem("favorites", JSON.stringify(fav));
      alert("Added to favorites.");
    }
  };

  const delListing = (title) => {
    const currentUser = localStorage.getItem("loggedInEmail");
    let stored = JSON.parse(localStorage.getItem("customListings")) || [];
    const listing = stored.find((x) => x.title === title);

    if (listing?.ownerEmail !== currentUser) return alert("Not your item.");

    if (!window.confirm(`Delete "${title}"?`)) return;

    stored = stored.filter((x) => x.title !== title);
    localStorage.setItem("customListings", JSON.stringify(stored));
    setListings(stored);
  };

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-background">
          <div className="sliding-images">
            <img src="https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7"/>
            <img src="https://images.unsplash.com/photo-1599236755629-17aff66ccda0"/>
            <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"/>
            <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"/>
          </div>
        </div>
        <div className="hero-overlay">
          <h1>Where Beautiful Things Are Designed, Bought, and Sold</h1>
          <button className="cta-button" onClick={() => navigate("/create")}>
            Start Selling
          </button>
        </div>
      </section>

      <section className="search-area">
        <input
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <main>
        <section className="recent-listings">
          <h2>Listed Recently</h2>
          <ul className="product-grid">
            {listings
              .filter((x) => x.title.toLowerCase().includes(search.toLowerCase()))
              .map((item) => {
                const me = localStorage.getItem("loggedInEmail");
                const owner = item.ownerEmail === me;

                return (
                  <li key={item.title} className="listing">
                    <img src={item.image} className="listing-img" />
                    <strong>{item.title}</strong> - ${item.price}
                    <div>
                      <button onClick={() => addCart(item.title, item.image)}>
                        Add to Cart
                      </button>
                      <span
                        className="favorite-icon"
                        onClick={() => addFav(item.title, item.image)}
                      >
                        &#9829;
                      </span>
                      {owner && (
                        <button onClick={() => delListing(item.title)}>Delete</button>
                      )}
                    </div>
                  </li>
                );
              })}
          </ul>
        </section>
      </main>
    </>
  );
}
