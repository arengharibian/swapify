import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Browse() {
  const [search, setSearch] = useState("");
  const [listings, setListings] = useState([]);
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
    if (!localStorage.getItem("loggedIn")) {
      alert("Please sign in first.");
      navigate("/signin");
      return;
    }
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name: title, image });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${title} added to cart`);
  };

  const addFav = (title, image) => {
    if (!localStorage.getItem("loggedIn")) {
      alert("Please sign in first.");
      navigate("/signin");
      return;
    }
    const fav = JSON.parse(localStorage.getItem("favorites")) || [];
    if (fav.find((f) => f.name === title)) {
      return alert("Already in favorites");
    }
    fav.push({ name: title, image });
    localStorage.setItem("favorites", JSON.stringify(fav));
    alert(`Added to favorites`);
  };

  const delListing = (title) => {
    const me = localStorage.getItem("loggedInEmail");
    let items = JSON.parse(localStorage.getItem("customListings")) || [];
    const listing = items.find((x) => x.title === title);

    if (!listing || listing.ownerEmail !== me)
      return alert("You can only delete your own listings.");

    if (!window.confirm(`Delete "${title}"?`)) return;

    items = items.filter(
      (x) => !(x.title === title && x.ownerEmail === me)
    );
    localStorage.setItem("customListings", JSON.stringify(items));
    setListings(items);
  };

  return (
    <main>
      <h1>Browse Listings</h1>

      <section className="search-area">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <ul className="product-grid">
        {listings
          .filter((i) => i.title.toLowerCase().includes(search.toLowerCase()))
          .map((item) => {
            const me = localStorage.getItem("loggedInEmail");
            const owner = item.ownerEmail === me;

            return (
              <li className="listing" key={item.title}>
                <img src={item.image} className="listing-img" />
                <strong>{item.title}</strong> – ${item.price}
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
    </main>
  );
}
