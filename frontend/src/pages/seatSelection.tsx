import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBusById, reserveSeats } from "../services/api";
import SeatGrid from "../components/seatGrid";
import BackButton from "../components/backButton";
import Loader from "../components/loader";

const SeatSelection: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bus, setBus] = useState<any>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [timer, setTimer] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getBusById(id)
        .then((res) => setBus(res.data.data))
        .catch(() => alert("Error fetching bus"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleReserve = () => {
    if (!id || selectedSeats.length === 0) return;
    setLoading(true);
    reserveSeats({ busId: id, seats: selectedSeats })
      .then((res) => {
        alert(res.data.message);
        setTimer(120);

        // 👉 navigate to ConfirmBooking page with busId + seats
        navigate("/passenger", { state: { busId: id, seats: selectedSeats } });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  return (
    <div className="container mt-4">
      <BackButton />
      <h2>Seat Selection</h2>
      {timer > 0 && (
        <p className="text-danger">Reservation expires in {timer}s</p>
      )}
      {loading ? (
        <Loader />
      ) : (
        bus && (
          <SeatGrid
            seats={bus.seats}
            selectedSeats={selectedSeats}
            onSelect={(num) => {
              setSelectedSeats((prev) =>
                prev.includes(num)
                  ? prev.filter((s) => s !== num)
                  : [...prev, num]
              );
            }}
          />
        )
      )}
      <div className="mt-3">
        <button
          className="btn btn-success"
          onClick={handleReserve}
          disabled={loading || selectedSeats.length === 0}
        >
          Proceed to Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;
