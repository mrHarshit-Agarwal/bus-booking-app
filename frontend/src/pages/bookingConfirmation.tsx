import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../components/backButton";
import Loader from "../components/loader";

const BookingConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mt-5">
      <BackButton />
      <div className="card p-4 shadow">
        <h2 className="mb-3">Booking Confirmation</h2>

        {loading ? (
          <Loader />
        ) : booking ? (
          <>
            <p>
              <strong>Booking ID:</strong> {booking._id}
            </p>
            <p>
              <strong>Bus ID:</strong> {booking.busId}
            </p>
            <p>
              <strong>Seats:</strong> {booking.seats.join(", ")}
            </p>
            <p>
              <strong>Total Price:</strong> ₹{booking.totalPrice}
            </p>

            {/* Passenger Details */}
            {booking.passengerDetails && booking.passengerDetails.length > 0 && (
              <div className="mt-4">
                <h4>Passenger Details</h4>
                {booking.passengerDetails.map(
                  (p: { name: string; age: number; gender: string }, index: number) => (
                    <div key={index} className="border rounded p-2 mb-2">
                      <p>
                        <strong>Name:</strong> {p.name}
                      </p>
                      <p>
                        <strong>Age:</strong> {p.age}
                      </p>
                      <p>
                        <strong>Gender:</strong> {p.gender}
                      </p>
                    </div>
                  )
                )}
              </div>
            )}
          </>
        ) : (
          <p>No booking found</p>
        )}

        {/* Home button */}
        {!loading && (
          <button
            className="btn btn-primary mt-4"
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingConfirmation;
