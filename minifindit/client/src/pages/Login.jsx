import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");


const navigate = useNavigate();

const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(
            "http://localhost:5000/api/auth/login",
            {
                email: email,
                password: password
            }
        );

        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
            "user",
            JSON.stringify(response.data.user)
        );

        alert("Login Successful!");
        navigate("/");

    } catch (error) {
        console.log(error);
        alert(
            error.response?.data?.message || "Login Failed"
        );
    }
};

return (
    <div className="login-container">

        <h2>Welcome Back!</h2>
        <p>Login to your Mini-FindIt account</p>

        <form onSubmit={handleLogin}>

            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <button type="submit">
                Login
            </button>

        </form>

        <p>
            Don't have an account?{" "}
            <Link to="/register">Register</Link>
        </p>

    </div>
);


}

export default Login;
