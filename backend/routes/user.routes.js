import express from "express";
import userHandlers from "../handlers/user.handlers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(userHandlers.registerUser);
router.route("/login").post(userHandlers.login);
router.route("/:id").post(protect, userHandlers.getUserDataById);

export default router;
