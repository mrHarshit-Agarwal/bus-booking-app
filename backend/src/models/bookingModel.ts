import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  busId: mongoose.Schema.Types.ObjectId;
  seats: number[];
  passengerDetails: { name: string; age: number; gender: string }[];
  totalPrice: number;
}

const bookingSchema = new Schema<IBooking>(
  {
    busId: { type: Schema.Types.ObjectId, ref: "Bus", required: true },
    seats: { type: [Number], required: true },
    passengerDetails: [
      {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        gender: { type: String, required: true }
      }
    ],
    totalPrice: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<IBooking>("Booking", bookingSchema);
