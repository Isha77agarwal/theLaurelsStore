import express from "express";
import userHandlers from "../handlers/user.handlers.js";

const router = express.Router();

router.route("/").post(userHandlers.registerUser);

export default router;
