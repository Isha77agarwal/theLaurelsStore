import express from "express";
import userHandlers from "../handlers/user.handlers.js";
import routeExecutor from "../helpers/routeHelper.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(routeExecutor(userHandlers.registerUser))
  .get(protect, admin, routeExecutor(userHandlers.getUsersData));
router.route("/login").post(routeExecutor(userHandlers.login));
router
  .route("/:id")
  .get(protect, routeExecutor(userHandlers.getUserDataById))
  .patch(protect, routeExecutor(userHandlers.updateUserData))
  .delete(protect, admin, routeExecutor(userHandlers.deleteUser));

export default router;
