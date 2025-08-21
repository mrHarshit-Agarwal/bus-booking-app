import mongoose, { Schema, Document } from "mongoose";

export interface ISeat {
  seatNumber: number;
  isAvailable: boolean;
  isLocked?: boolean;
  lockedUntil?: Date | null;
  row: number;
  column: number;
  seatType: "normal" | "semi-sleeper" | "sleeper";
  sleeperLevel?: "upper" | "lower";
}

export interface IBus extends Document {
  name: string;
  departureCity: string;
  arrivalCity: string;
  date: string;
  stops: { stopName: string; departureTime?: string; arrivalTime?: string }[];
  availableSeats: number;
  price: number;
  seatTypes: string[];
  isAC: boolean;
  seats: ISeat[];
}

const busSchema = new Schema<IBus>(
  {
    name: { type: String, required: true },
    departureCity: { type: String, required: true },
    arrivalCity: { type: String, required: true },
    date: { type: String, required: true },
    stops: [{ stopName: String, departureTime: String, arrivalTime: String }],
    availableSeats: { type: Number, required: true },
    price: { type: Number, required: true },
    seatTypes: [String],
    isAC: { type: Boolean, required: true },
    seats: [
      {
        seatNumber: Number,
        isAvailable: Boolean,
        isLocked: { type: Boolean, default: false },
        lockedUntil: { type: Date, default: null },
        row: Number,
        column: Number,
        seatType: String,
        sleeperLevel: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IBus>("Bus", busSchema);
