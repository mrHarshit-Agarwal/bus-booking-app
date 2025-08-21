import { Request, Response } from "express";
import Booking from "../models/bookingModel";
import Bus from "../models/busModel";

/*------------- Reserve Seats (2 min lock) -------------*/
export const reserveSeats = async (req: Request, res: Response) => {
  try {
    const { busId, seats } = req.body;
    if (!busId || !seats || seats.length === 0) {
      return res.status(400).json({ success: false, error: "busId and seats are required" });
    }

    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).json({ success: false, error: "Bus not found" });

    const now = new Date();
    for (const seat of bus.seats) {
      if (seat.isLocked && seat.lockedUntil && seat.lockedUntil < now) {
        seat.isLocked = false;
        seat.lockedUntil = null;
        seat.isAvailable = true;
      }
    }

    const unavailableSeats: number[] = [];
    for (const seatNum of seats) {
      const seat = bus.seats.find((s) => s.seatNumber === seatNum);
      if (!seat || !seat.isAvailable || seat.isLocked) {
        unavailableSeats.push(seatNum);
      }
    }

    if (unavailableSeats.length > 0) {
      return res.status(400).json({ success: false, error: "Some seats are not available", unavailableSeats });
    }

    const lockUntil = new Date(Date.now() + 2 * 60 * 1000);
    for (const seatNum of seats) {
      const seat = bus.seats.find((s) => s.seatNumber === seatNum);
      if (seat) {
        seat.isLocked = true;
        seat.lockedUntil = lockUntil;
      }
    }

    await bus.save();
    res.status(200).json({ success: true, message: "Seats reserved for 2 minutes", reservedSeats: seats, expiresAt: lockUntil });
  } catch (error) {
    console.error("Error reserving seats:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

/*------------- Confirm Booking -------------*/
export const confirmBooking = async (req: Request, res: Response) => {
  try {
    const { busId, seats, passengerDetails } = req.body;
    if (!busId || !seats || seats.length === 0) {
      return res.status(400).json({ success: false, error: "busId and seats are required" });
    }

    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).json({ success: false, error: "Bus not found" });

    const now = new Date();
    for (const seat of bus.seats) {
      if (seat.isLocked && seat.lockedUntil && seat.lockedUntil < now) {
        seat.isLocked = false;
        seat.lockedUntil = null;
        seat.isAvailable = true;
      }
    }

    const unavailableSeats: number[] = [];
    for (const seatNum of seats) {
      const seat = bus.seats.find((s) => s.seatNumber === seatNum);
      if (!seat || !seat.isLocked) {
        unavailableSeats.push(seatNum);
      }
    }

    if (unavailableSeats.length > 0) {
      return res.status(400).json({ success: false, error: "Some seats are not available or reservation expired", unavailableSeats });
    }

    for (const seatNum of seats) {
      const seat = bus.seats.find((s) => s.seatNumber === seatNum);
      if (seat) {
        seat.isAvailable = false;
        seat.isLocked = false;
        seat.lockedUntil = null;
      }
    }

    bus.availableSeats -= seats.length;
    await bus.save();

    const totalPrice = bus.price * seats.length;
    const booking = await Booking.create({ busId, seats, passengerDetails, totalPrice });

    res.status(201).json({ success: true, message: "Booking confirmed successfully", data: booking });
  } catch (error) {
    console.error("Error confirming booking:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

/*------------- Get All Bookings -------------*/
export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find().populate("busId");
    res.json({ success: true, message: "Bookings retrieved successfully", data: bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

/*------------- Get Booking by ID -------------*/
export const getBookingById = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("busId");
    if (!booking) return res.status(404).json({ success: false, error: "Booking not found" });
    res.json({ success: true, message: "Booking retrieved successfully", data: booking });
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

/*------------- Delete Booking -------------*/
export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ success: false, error: "Booking not found" });
    res.json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
