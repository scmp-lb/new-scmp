import express from "express";

/* IMPORTS FROM CONTROLLERS */
import { register, login, logout } from "../controllers/user.js";

/* CREATE THE ROUTE */
const router = express.Router();

/* OPERATIONS */
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

export default router;
