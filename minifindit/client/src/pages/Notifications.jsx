import { useEffect, useState } from "react";
import axios from "axios";
import { Bell, CalendarDays, User, Package, CheckCircle } from "lucide-react";
import Navbar from "../components/Navbar";

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/api/notifications",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setNotifications(response.data);
        } catch (error) {
            console.log("Error fetching notifications:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleAccept = async (notificationId) => {
        const confirmAccept = window.confirm(
            "Have you handed over the item to this student?"
        );

        if (!confirmAccept) return;

        try {
            const token = localStorage.getItem("token");

            const response = await axios.patch(
                `http://localhost:5000/api/notifications/${notificationId}/accept`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(response.data.message);
            fetchNotifications();

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Unable to accept claim"
            );
        }
    };

    return (
        <div className="notifications-page">
            <Navbar />

            <div className="notifications-container">

                <div className="notification-heading">
                    <div className="notification-heading-icon">
                        <Bell size={26} />
                    </div>

                    <div>
                        <h1>Notifications</h1>
                        <p>Stay updated with your found items.</p>
                    </div>
                </div>

                <div className="notification-summary">
                    <h3>Claim Requests</h3>
                    <span>{notifications.length} Notifications</span>
                </div>

                {loading ? (
                    <p className="notification-message">
                        Loading notifications...
                    </p>
                ) : notifications.length === 0 ? (
                    <div className="notification-empty">
                        <Bell size={45} />
                        <h3>No notifications yet!</h3>
                        <p>
                            When someone claims your uploaded item,
                            their request will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="notifications-list">

                        {notifications.map((notification) => (

                            <div
                                className="notification-card"
                                key={notification._id}
                            >
                                <div className="notification-card-top">
                                    <div className="new-claim-icon">
                                        <Package size={23} />
                                    </div>

                                    <div className="claim-title">
                                        <h3>New Claim Request!</h3>
                                        <span>
                                            Someone is claiming your item
                                        </span>
                                    </div>

                                    <span className={`notification-status ${notification.status.toLowerCase()}`}>
                                        {notification.status}
                                    </span>
                                </div>

                                <div className="notification-card-body">

                                    <p className="claim-student">
                                        <User size={17} />
                                        <strong>
                                            {notification.sender?.name || "Student"}
                                        </strong>
                                        has claimed your item.
                                    </p>

                                    <div className="claimed-item-box">
                                        {notification.item?.image && (
                                            <img
                                                src={`http://localhost:5000${notification.item.image}`}
                                                alt={notification.item.name}
                                            />
                                        )}

                                        <div>
                                            <small>CLAIMED ITEM</small>
                                            <h4>
                                                {notification.item?.name || "Item"}
                                            </h4>
                                            <p>
                                                {notification.item?.location || ""}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="student-info">
                                        <p>
                                            <strong>Student ID:</strong>{" "}
                                            {notification.sender?.studentId || "N/A"}
                                        </p>

                                        <p>
                                            <CalendarDays size={15} />
                                            {new Date(
                                                notification.createdAt
                                            ).toLocaleString()}
                                        </p>
                                    </div>

                                    {notification.status === "Pending" &&
                                        notification.item?.status === "Available" && (
                                            <button
                                                className="accept-claim-button"
                                                onClick={() =>
                                                    handleAccept(notification._id)
                                                }
                                            >
                                                <CheckCircle size={18} />
                                                Accept & Mark as Returned
                                            </button>
                                        )}

                                    {notification.status === "Accepted" && (
                                        <p className="claim-success">
                                            ✓ Item successfully marked as returned.
                                        </p>
                                    )}

                                    {notification.status === "Rejected" && (
                                        <p className="claim-rejected">
                                            This claim request was rejected.
                                        </p>
                                    )}

                                </div>
                            </div>

                        ))}

                    </div>
                )}

            </div>
        </div>
    );
}

export default Notifications;