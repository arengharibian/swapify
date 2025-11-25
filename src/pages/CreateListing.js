import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const submitListing = (e) => {
    e.preventDefault();
    const email = localStorage.getItem("loggedInEmail");

    if (!email) {
      alert("Sign in to post a listing.");
      return navigate("/signin");
    }

    if (!file) return alert("Please select an image.");

    const reader = new FileReader();
    reader.onload = () => {
      const image = reader.result;
      const stored = JSON.parse(localStorage.getItem("customListings")) || [];
      stored.push({ title, price, image, ownerEmail: email });
      localStorage.setItem("customListings", JSON.stringify(stored));
      alert("Listing created!");
      navigate("/");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="form-container">
      <h1>Create a Listing</h1>
      <form className="form" onSubmit={submitListing}>
        <input
          placeholder="Item Title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Price"
          value={price}
          required
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Post Listing</button>
      </form>
    </div>
  );
}
