import { MapPin, CalendarDays, Tag } from "lucide-react";

function ItemCard({ item, onClaim }) {
    return (
        <div className="item-card">

            <div className="item-image">

                <div className={`status-badge ${item.status.toLowerCase()}`}>
                    {item.status}
                </div>

                {item.image ? (
                    <img
                        src={`http://localhost:5000${item.image}`}
                        alt={item.name}
                        className="uploaded-item-image"
                    />
                ) : (
                    <div className="image-placeholder">
                        <Tag size={40} />
                    </div>
                )}

            </div>

            <div className="item-details">

                <h3>{item.name}</h3>

                <p className="item-description">
                    {item.description}
                </p>

                <p>
                    <MapPin size={16} />
                    {item.location}
                </p>

                <p>
                    <CalendarDays size={16} />
                    {new Date(item.dateFound).toLocaleDateString()}
                </p>

                {item.status === "Available" && (
                    <button
                        className="return-button"
                        onClick={() => onClaim(item._id)}
                    >
                        This is Mine
                    </button>
                )}

                {item.status === "Returned" && (
                    <p className="returned-message">
                        ✓ This item has been returned
                    </p>
                )}

            </div>
        </div>
    );
}

export default ItemCard;