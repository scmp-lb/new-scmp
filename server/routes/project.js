import express from "express";

/* IMPORTS FROM CONTROLLERS */
import {
  createProject,
  getAllProjects,
  chooseWinnerProject,
  getWinnerProject,
} from "../controllers/project.js";

/* IMPORTS FROM MIDDLEWARES */
import { isAuthorized } from "../middlewares/auth.js";

/* CREATE THE ROUTE */
const router = express.Router();

/* OPERATIONS */
router.post("/", createProject);
router.get("/", getAllProjects);
router.get("/:id", chooseWinnerProject);
router.get("/winner", getWinnerProject);

export default router;
