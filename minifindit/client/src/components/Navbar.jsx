import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <h2>🌿 Mini-FindIt</h2>

            <div className="nav-links">
                {token ? (
                    <>
                        <Link to="/">Home</Link>

                        <Link to="/add-item">Add Item</Link>

                        <Link to="/notifications">
                            <Bell size={17} />
                            Notifications
                        </Link>

                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;