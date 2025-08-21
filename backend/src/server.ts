import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../src/database/db";
import errorHandler from "../src/middleware/error";
import busRoutes from "../src/routes/busRoute";
import bookingRoutes from "../src/routes/bookingRoute";

dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use("/api/buses", busRoutes);
app.use("/api/booking", bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
