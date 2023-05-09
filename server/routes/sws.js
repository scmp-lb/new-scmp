import express from "express";

/* IMPORTS FROM CONTROLLERS */
import {
  createSws,
  deleteSWSEvent,
  getAllSws,
  editSWSEvent,
  getOneSws,
} from "../controllers/sws.js";

/* IMPORTS FROM MIDDLEWARES */
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

/* CREATE THE ROUTE */
const router = express.Router();

/* OPERATIONS */
router.post("/", createSws);
router.delete("/:id", deleteSWSEvent);
router.get("/", getAllSws);
router.put("/:id", editSWSEvent);
router.get("/:id", getOneSws);

export default router;
