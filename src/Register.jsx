import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "./api";
import "./Login.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password || !confirmPassword) {
      return alert("Fill all fields");
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful");
        navigate("/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="login-body">
      <div className="login-container">

        <div className="logo">🎓</div>
        <h1>Signup</h1>

        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button onClick={handleRegister}>Signup</button>

        <p className="subtitle">
          Already have account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;