import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "./api";
import "./login.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password) {
            return alert("Fill all fields");
        }

        try {
            const res = await fetch(`${API}/api/auth/login`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("username", data.user.name);
                localStorage.setItem("token", data.token); // store JWT for future requests
                navigate("/dashboard");
            } else {
                alert(data.message || "Login failed");
            }


        } catch (error) {
            alert("Server error. Try again later.");
        }
    };

    return (
        <div className="login-body">
            <div className="login-container">

                <div className="logo">🎓</div>
                <h1>EduMate AI</h1>
                <p className="subtitle">Smart Study Partner</p>

                <input
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={handleLogin}>Login</button>

                <p className="subtitle">
                    Don't have account? <Link to="/register">Register</Link>
                </p>

            </div>
        </div>
    );
}

export default Login;