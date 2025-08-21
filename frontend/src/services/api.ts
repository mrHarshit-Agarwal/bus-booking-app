import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Bus APIs
export const searchBuses = (params: any) => API.get("/buses", { params });
export const getBusById = (id: string) => API.get(`/buses/${id}`);

// Booking APIs
export const reserveSeats = (data: any) => API.post("/booking/reserve", data);
export const confirmBooking = (data: any) => API.post("/booking/confirm", data);
