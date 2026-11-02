import { useEffect, useState } from "react";
import axios from "axios";
import { Search, Leaf } from "lucide-react";
import ItemCard from "../components/ItemCard";
import Navbar from "../components/Navbar";

function Home() {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");
    const [loading, setLoading] = useState(true);

    const fetchItems = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/items"
            );

            setItems(response.data);
        } catch (error) {
            console.log("Error fetching items:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    // Send claim request
    const handleClaim = async (id) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                `http://localhost:5000/api/notifications/claim/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(response.data.message);

        } catch (error) {
            console.log("Claim error:", error);

            alert(
                error.response?.data?.message ||
                "Claim request failed"
            );
        }
    };

    const filteredItems = items.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.location.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            status === "All" || item.status === status;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="home-page">
            <Navbar />

            <section className="hero">
                <div>
                    <h1>
                        Lost something?
                        <br />
                        <span>Found something?</span>
                    </h1>

                    <p>
                        Mini-FindIt helps you find and return
                        lost items on campus!
                    </p>
                </div>

                <Leaf size={100} />
            </section>

            <section className="search-section">
                <div className="search-box">
                    <Search size={22} />

                    <input
                        type="text"
                        placeholder="Search for items..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="All">All Status</option>
                    <option value="Available">Available</option>
                    <option value="Returned">Returned</option>
                </select>
            </section>

            <section className="items-section">
                <h2>🌿 Recent Found Items</h2>

                {loading ? (
                    <p>Loading items...</p>
                ) : filteredItems.length === 0 ? (
                    <p>No items found.</p>
                ) : (
                    <div className="items-grid">
                        {filteredItems.map((item) => (
                            <ItemCard
                                key={item._id}
                                item={item}
                                onClaim={handleClaim}
                            />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

export default Home;