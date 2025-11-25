import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ onOpenCart, onOpenFavorites }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    const name = localStorage.getItem("userName");
    if (loggedIn && name) {
      setUser(name.split(" ")[0]);
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("loggedInEmail");
    localStorage.removeItem("userName");
    alert("You have been logged out.");
    navigate("/");
  };

  const goToCreate = () => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    if (!loggedIn) {
      alert("Please sign in to post a listing.");
      navigate("/signin");
    } else {
      navigate("/create");
    }
  };

  return (
    <header className="site-header">
      {/* TOP BLACK BAR */}
      <div className="top-bar">
        <div className="top-bar-left">
          <img src="/images/logo.png" alt="Swapify Logo" className="top-logo" />
          <div className="top-brand">
            <span className="top-brand-title">Swapify</span>
            <span className="top-brand-subtitle">Campus Marketplace</span>
          </div>
        </div>

        <div className="top-bar-search">
          <input
            type="text"
            placeholder="Search product or listing..."
            aria-label="Search listings"
          />
          <button type="button">Search</button>
        </div>

        <div className="top-bar-right">
          {user ? (
            <>
              <span className="top-user-text">
                Hi, <b>{user}</b>
              </span>
              <button className="top-auth-btn" onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <button
              className="top-auth-btn"
              onClick={() => navigate("/signin")}
            >
              Sign in
            </button>
          )}

          <button
            type="button"
            className="icon-button"
            onClick={onOpenFavorites}
            aria-label="View favorites"
          >
            <img
              src="/images/heart-icon.png"
              alt="Favorites"
              className="icon-img"
            />
          </button>

          <button
            type="button"
            className="icon-button"
            onClick={onOpenCart}
            aria-label="View cart"
          >
            <img
              src="/images/cart-icon.png"
              alt="Cart"
              className="icon-img"
            />
          </button>
        </div>
      </div>

      {/* BLUE NAV BAR */}
      <nav className="main-nav">
        <div className="main-nav-left">
          <button type="button" className="category-toggle">
            <span className="category-toggle-icon">☰</span>
            <span>Category</span>
            <span className="category-caret">▾</span>
          </button>

          <ul className="main-nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/browse">Browse</Link>
            </li>
            <li>
              <button type="button" onClick={goToCreate}>
                Post a Listing
              </button>
            </li>
          </ul>
        </div>

        <div className="main-nav-right">
          <button type="button" className="text-link" onClick={() => navigate("/browse")}>
            Best Sellers
          </button>
          <button type="button" className="text-link" onClick={() => navigate("/checkout")}>
            Checkout
          </button>
          <button type="button" className="text-link" onClick={() => navigate("/signin")}>
            My Account
          </button>
        </div>
      </nav>
    </header>
  );
}
