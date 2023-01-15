import express from "express";
import userHandlers from "../handlers/user.handlers.js";
import routeExecutor from "../helpers/routeHelper.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(routeExecutor(userHandlers.registerUser));
router.route("/login").post(routeExecutor(userHandlers.login));
router.route("/:id").get(protect, routeExecutor(userHandlers.getUserDataById));

export default router;
