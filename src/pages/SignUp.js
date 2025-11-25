import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [previous, setPrevious] = useState([]);

  useEffect(() => {
    setPrevious(JSON.parse(localStorage.getItem("previousPasswords")) || []);
  }, []);

  const validPass = (p) => {
    return (
      p.length >= 8 &&
      p.length <= 16 &&
      /[a-z]/.test(p) &&
      /[A-Z]/.test(p) &&
      /\d/.test(p) &&
      /[!#$&*()\-=\\|[\]';:/?.]/.test(p) &&
      !previous.includes(p)
    );
  };

  const submit = (e) => {
    e.preventDefault();

    if (!validPass(pass))
      return alert("Password does not meet requirements.");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.email === email))
      return alert("Email already exists.");

    const newUsers = [...users, { name, email, password: pass }];
    localStorage.setItem("users", JSON.stringify(newUsers));

    const updatedPrev = [...previous, pass];
    localStorage.setItem("previousPasswords", JSON.stringify(updatedPrev));

    alert("Account created! Sign in.");
    nav("/signin");
  };

  return (
    <main className="form-container">
      <h1>Create Account</h1>
      <form className="form" onSubmit={submit}>
      <input
        placeholder="Full Name"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        type="email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={pass}
        required
        onChange={(e) => setPass(e.target.value)}
      />

      <button type="submit">Sign Up</button>

      <p className="form-text">
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
      </form>
    </main>
  );
}
