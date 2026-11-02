import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function AddItem() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [dateFound, setDateFound] = useState("");
    const [image, setImage] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        formData.append("location", location);
        formData.append("dateFound", dateFound);

        if (image) {
            formData.append("image", image);
        }

        try {
            const token = localStorage.getItem("token");

            await axios.post(
                "http://localhost:5000/api/items",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Item Added Successfully!");
            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message || "Failed to Add Item");
        }
    };

    return (
        <>
            <Navbar />

            <div className="add-item-container">
                <h2>Add Found Item</h2>
                <p>Enter the details of the item you found.</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Item Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <textarea
                        placeholder="Item Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Found Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />

                    <label>Date Found</label>
                    <input
                        type="date"
                        value={dateFound}
                        onChange={(e) => setDateFound(e.target.value)}
                        required
                    />

                    <label>Upload Item Image</label>
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(e) => setImage(e.target.files[0])}
                    />

                    {image && (
                        <p>Selected image: {image.name}</p>
                    )}

                    <button type="submit">Add Item</button>
                </form>
            </div>
        </>
    );
}

export default AddItem;