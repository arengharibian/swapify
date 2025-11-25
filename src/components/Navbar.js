import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ onOpenCart, onOpenFavorites }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    const name = localStorage.getItem("userName");
    if (loggedIn && name) setUser(name.split(" ")[0]);
    else setUser(null);
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("loggedInEmail");
    localStorage.removeItem("userName");
    alert("You logged out.");
    navigate("/");
  };

  const postListing = () => {
    if (!localStorage.getItem("loggedIn")) {
      alert("Sign in first.");
      return navigate("/signin");
    }
    navigate("/create");
  };

  return (
    <header className="navbar">
      <div className="nav-left">
        <img src="/images/logo.png" alt="Swapify Logo" className="nav-logo" />
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/browse">Browse</Link>
          <button
            style={{ background: "none", border: "none", cursor: "pointer" }}
            onClick={postListing}
          >
            Post a Listing
          </button>
        </nav>
      </div>

      <div className="nav-right">
        {user ? (
          <>
            <span>Welcome, <b>{user}</b></span>
            <button onClick={logout}>Log Out</button>
          </>
        ) : (
          <button onClick={() => navigate("/signin")}>Sign In</button>
        )}

        <img
          src="/images/heart-icon.png"
          alt="Favorites"
          className="icon-img"
          onClick={onOpenFavorites}
        />
        <img
          src="/images/cart-icon.png"
          alt="Cart"
          className="icon-img"
          onClick={onOpenCart}
        />
      </div>
    </header>
  );
}
