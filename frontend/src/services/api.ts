import axios from "axios";

// Use environment variable, fallback to localhost
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000/api",
});


// Bus APIs
export const searchBuses = (params: any) => API.get("/buses", { params });
export const getBusById = (id: string) => API.get(`/buses/${id}`);

// Booking APIs
export const reserveSeats = (data: any) => API.post("/booking/reserve", data);
export const confirmBooking = (data: any) => API.post("/booking/confirm", data);
