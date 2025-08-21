import React from "react";

interface SeatGridProps {
  seats: any[];
  selectedSeats: number[];
  onSelect: (seatNum: number) => void;
}

const SeatGrid: React.FC<SeatGridProps> = ({ seats, selectedSeats, onSelect }) => {
  return (
    <div className="d-flex flex-wrap gap-2">
      {seats.map((seat) => (
        <button
          key={seat.seatNumber}
          disabled={!seat.isAvailable || seat.isLocked}
          className={`btn btn-sm ${
            selectedSeats.includes(seat.seatNumber)
              ? "btn-primary"
              : !seat.isAvailable
              ? "btn-secondary"
              : "btn-outline-primary"
          }`}
          onClick={() => onSelect(seat.seatNumber)}
        >
          {seat.seatNumber}
        </button>
      ))}
    </div>
  );
};

export default SeatGrid;
