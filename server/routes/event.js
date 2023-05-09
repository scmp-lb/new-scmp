import express from "express";

/* IMPORTS FROM CONTROLLERS */
import {
  createEvent,
  deleteEvent,
  editEvent,
  getAllEvents,
  getEventById,
} from "../controllers/event.js";

/* IMPORTS FROM MIDDLEWARES */
import { isAuthorized, isAuthenticated } from "../middlewares/auth.js";

/* CREATE THE ROUTE */
const router = express.Router();

/* OPERATIONS */
router.post("/", createEvent);
router.get("/", getAllEvents);
router.put("/:id", editEvent);
router.delete("/:id", deleteEvent);
router.get("/:id", getEventById);
export default router;
