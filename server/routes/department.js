import express from "express";

/* IMPORTS FROM CONTROLLERS */
import {
  createDepartment,
  getAllDepartments,
  editDepartment,
  deleteDepartment,
  getDepartmentById,
} from "../controllers/department.js";

/* IMPORTS FROM MIDDLEWARES */
import { isAuthorized, isAuthenticated } from "../middlewares/auth.js";

/* CREATE THE ROUTE */
const router = express.Router();

/* OPERATIONS */
router.post("/", createDepartment);
router.get("/", getAllDepartments);
router.get("/:id", getDepartmentById);
router.put("/:id", editDepartment);
router.delete("/:id", deleteDepartment);
export default router;
