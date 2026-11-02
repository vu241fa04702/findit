import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
const [name, setName] = useState("");
const [studentId, setStudentId] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");


const navigate = useNavigate();

const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        await axios.post(
            "http://localhost:5000/api/auth/register",
            { name, studentId, email, password }
        );

        alert("Registration Successful! Please Login.");
        navigate("/login");

    } catch (error) {
        alert(error.response?.data?.message || "Registration Failed");
    }
};

return (
    <div className="register-page">
        <div className="register-container">

            <h2>Create Account 🌿</h2>
            <p>Join the Mini-FindIt community</p>

            <form onSubmit={handleRegister}>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Student ID"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    required
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <button type="submit">
                    Create Account
                </button>

            </form>

            <p className="auth-link">
                Already have an account?{" "}
                <Link to="/login">Login</Link>
            </p>

        </div>
    </div>
);


}

export default Register;
