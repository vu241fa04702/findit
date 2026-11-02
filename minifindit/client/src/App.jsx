import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddItem from "./pages/AddItem";
import ProtectedRoute from "./components/ProtectedRoute";
import Notifications from "./pages/Notifications";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/add-item"
                    element={
                        <ProtectedRoute>
                            <AddItem />
                        </ProtectedRoute>
                    }

                />
                <Route
        path="/notifications"
        element={<ProtectedRoute><Notifications /></ProtectedRoute>}
    />
            </Routes>
        </BrowserRouter>
    );
}

export default App;