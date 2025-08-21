import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmBooking } from "../services/api";

const PassengerPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { busId, seats } = location.state as { busId: string; seats: string[] };

  const [passengerDetails, setPassengerDetails] = useState(
    seats.map(() => ({ name: "", age: "", gender: "" }))
  );

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...passengerDetails];
    (updated[index] as any)[field] = value;
    setPassengerDetails(updated);
  };

  const handleConfirm = async () => {
    try {
      const payload = { busId, seats, passengerDetails };
      const res = await confirmBooking(payload);

      // after booking → go to confirmation page
      navigate("/confirmation", { state: res.data.data });
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Confirm Booking</h2>
      <p>Bus ID: {busId}</p>
      <p>Seats: {seats.join(", ")}</p>

      <h4 className="mt-4">Passenger Details</h4>
      {seats.map((seat, index) => (
        <div key={seat} className="card p-3 mb-3">
          <h5>Seat {seat}</h5>
          <div className="row g-2">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={passengerDetails[index].name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                placeholder="Age"
                value={passengerDetails[index].age}
                onChange={(e) => handleChange(index, "age", e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-control"
                value={passengerDetails[index].gender}
                onChange={(e) => handleChange(index, "gender", e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>
      ))}

      <button className="btn btn-success mt-3" onClick={handleConfirm}>
        Confirm Booking
      </button>
    </div>
  );
};

export default PassengerPage;
