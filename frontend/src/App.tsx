import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../src/pages/home";
import BusList from "./pages/busList";
import SeatSelection from "./pages/seatSelection";
import BookingConfirmation from "./pages/bookingConfirmation";
import PassengerPage from "./pages/passengerPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/buses" element={<BusList />} />
      <Route path="/seats/:id" element={<SeatSelection />} />
      <Route path="/confirmation" element={<BookingConfirmation />} />
      <Route path="/passenger" element={<PassengerPage />} />
    </Routes>
  );
};

export default App;
