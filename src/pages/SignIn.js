import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const submit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email && u.password === pass);

    if (!user) return alert("Invalid credentials.");

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("loggedInEmail", user.email);
    localStorage.setItem("userName", user.name);

    alert("Welcome back!");
    nav("/");
  };

  return (
    <main className="form-container">
      <h1>Sign In</h1>
      <form className="form" onSubmit={submit}>
        <input
          placeholder="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          required
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button type="submit">Sign In</button>

        <p className="form-text">
          Don't have an account? <Link to="/signup">Create one</Link>
        </p>
      </form>
    </main>
  );
}
