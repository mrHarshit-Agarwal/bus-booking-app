import express from "express";
import { createBus, getBuses, getBusById, updateBus, deleteBus } from "../controllers/busController";

const router = express.Router();

router.post("/", createBus);
router.get("/", getBuses);
router.get("/:id", getBusById);
router.put("/:id", updateBus);
router.delete("/:id", deleteBus);

export default router;
