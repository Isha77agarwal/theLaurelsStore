import {
  preparePayloadToCreateUser,
  createNewUser,
  loginUser,
  getUserData,
} from "../methods/user.methods.js";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";

const registerUser = expressAsyncHandler(async (req, res) => {
  try {
    const preparedPayloadForUserCreation = await preparePayloadToCreateUser(
      req.data
    );

    const createdUserData = await createNewUser(preparedPayloadForUserCreation);
    res.json(createdUserData);
  } catch (error) {
    res.status(404);
    res.json({
      message: error.message,
      stack: process.env.NODE_ENV === "production" ? null : error.stack,
    });
  }
});

const login = expressAsyncHandler(async (req, res) => {
  try {
    const loggedInUserData = await loginUser(req.body);
    res.json(loggedInUserData);
  } catch (error) {
    res.status(401);
    res.json({
      message: error.message,
      stack: process.env.NODE_ENV === "production" ? null : error.stack,
    });
  }
});

const getUserDataById = expressAsyncHandler(async (req, res) => {
  try {
    const usersData = await getUserData({
      _id: new mongoose.Types.ObjectId(req.params.id),
    });
    res.json(usersData[0]);
  } catch (error) {
    res.status(404);
    res.json({
      message: error.message,
      stack: process.env.NODE_ENV === "production" ? null : error.stack,
    });
  }
});

export default { registerUser, login, getUserDataById };
