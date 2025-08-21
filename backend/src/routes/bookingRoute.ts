import express from "express";
import { reserveSeats, confirmBooking, getBookings, getBookingById, deleteBooking } from "../controllers/bookingController";

const router = express.Router();

router.post("/reserve", reserveSeats);
router.post("/confirm", confirmBooking);
router.get("/", getBookings);
router.get("/:id", getBookingById);
router.delete("/:id", deleteBooking);

export default router;
