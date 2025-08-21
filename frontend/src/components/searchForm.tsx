import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchForm: React.FC = () => {
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!departureCity || !arrivalCity || !date) {
      alert("All fields required");
      return;
    }
    navigate(`/buses?departureCity=${departureCity}&arrivalCity=${arrivalCity}&date=${date}`);
  };

  return (
    <div className="container mt-4">
      <div className="row g-2">
        <div className="col-md-3">
          <input
            className="form-control"
            type="text"
            placeholder="From"
            value={departureCity}
            onChange={(e) => setDepartureCity(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            className="form-control"
            type="text"
            placeholder="To"
            value={arrivalCity}
            onChange={(e) => setArrivalCity(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            className="form-control"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary w-100" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
