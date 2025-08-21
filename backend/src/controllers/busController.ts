import { Request, Response } from "express";
import Bus from "../models/busModel";

/*------------- Create Bus -------------*/
export const createBus = async (req: Request, res: Response) => {
  try {
    const { name, departureCity, arrivalCity, date, stops, availableSeats, price, seatTypes, isAC, seats } = req.body;

    if (!name || !departureCity || !arrivalCity || !date) {
      return res.status(400).json({ success: false, error: "name, departureCity, arrivalCity, and date are required" });
    }

    const data = {
      name,
      departureCity,
      arrivalCity,
      date,
      stops: stops || [],
      availableSeats: availableSeats || 0,
      price: price || 0,
      seatTypes: seatTypes || ["normal"],
      isAC: isAC ?? false,
      seats: seats || [],
    };

    const createdBus = await Bus.create(data);
    res.status(201).json({ success: true, message: "Bus created successfully", data: createdBus });
  } catch (error) {
    console.error("Error creating bus:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

/*------------- Get All Buses (with filters & pagination) -------------*/
export const getBuses = async (req: Request, res: Response) => {
  try {
    const { departureCity, arrivalCity, date, seatType, isAC, departureSlot, page = 1, pageSize = 10 } = req.query;

    if (!departureCity || !arrivalCity || !date) {
      return res.status(400).json({ success: false, error: "departureCity, arrivalCity, and date are required" });
    }

    const filters: any = {
      departureCity: { $regex: new RegExp(departureCity as string, "i") },
      arrivalCity: { $regex: new RegExp(arrivalCity as string, "i") },
      date: date,
    };

    if (seatType) filters.seatTypes = { $in: [seatType] };
    if (isAC !== undefined) filters.isAC = isAC === "true";

    if (departureSlot) {
      switch (departureSlot.toString().toLowerCase()) {
        case "morning": filters["stops.departureTime"] = { $gte: "06:00 AM", $lt: "12:00 PM" }; break;
        case "afternoon": filters["stops.departureTime"] = { $gte: "12:00 PM", $lt: "04:00 PM" }; break;
        case "evening": filters["stops.departureTime"] = { $gte: "04:00 PM", $lt: "08:00 PM" }; break;
        case "night": filters["stops.departureTime"] = { $gte: "08:00 PM", $lt: "06:00 AM" }; break;
      }
    }

    const skip = (Number(page) - 1) * Number(pageSize);
    const totalBuses = await Bus.countDocuments(filters);
    const buses = await Bus.find(filters).skip(skip).limit(Number(pageSize));

    res.json({ success: true, message: "Buses retrieved successfully", page: Number(page), pageSize: Number(pageSize), totalPages: Math.ceil(totalBuses / Number(pageSize)), totalBuses, data: buses });
  } catch (error) {
    console.error("Error fetching buses:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

/*------------- Get Bus by ID -------------*/
export const getBusById = async (req: Request, res: Response) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) return res.status(404).json({ success: false, error: "Bus not found" });
    res.json({ success: true, message: "Bus retrieved successfully", data: bus });
  } catch (error) {
    console.error("Error fetching bus:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

/*------------- Update Bus -------------*/
export const updateBus = async (req: Request, res: Response) => {
  try {
    const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bus) return res.status(404).json({ success: false, error: "Bus not found" });
    res.json({ success: true, message: "Bus updated successfully", data: bus });
  } catch (error) {
    console.error("Error updating bus:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

/*------------- Delete Bus -------------*/
export const deleteBus = async (req: Request, res: Response) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id);
    if (!bus) return res.status(404).json({ success: false, error: "Bus not found" });
    res.json({ success: true, message: "Bus deleted successfully" });
  } catch (error) {
    console.error("Error deleting bus:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
