import React from "react";
import { useNavigate } from "react-router-dom";

interface BusCardProps {
  bus: any;
}

const BusCard: React.FC<BusCardProps> = ({ bus }) => {
  const navigate = useNavigate();

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{bus.name}</h5>
        <p className="card-text">
          {bus.departureCity} → {bus.arrivalCity}
        </p>
        <p className="card-text">
          Seats: {bus.availableSeats} | ₹{bus.price}
        </p>
        <p className="card-text">
          AC: {bus.isAC ? "Yes" : "No"} | Types: {bus.seatTypes.join(", ")}
        </p>
        <button
          className="btn btn-success"
          onClick={() => navigate(`/seats/${bus._id}`)}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default BusCard;
