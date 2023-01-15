import {
  preparePayloadToCreateUser,
  createNewUser,
  loginUser,
  getUserData,
  prepareFinalReposnseForLoggedInUser,
} from "../methods/user.methods.js";
import mongoose from "mongoose";
import generateToken from "../utils/generateToken.js";

const registerUser = async (req) => {
  const preparedPayloadForUserCreation = await preparePayloadToCreateUser(
    req.body
  );

  const createdUserData = await createNewUser(preparedPayloadForUserCreation);

  const finalUserData = prepareFinalReposnseForLoggedInUser(
    createdUserData,
    generateToken(createdUserData.email)
  );
  return finalUserData;
};

const login = async (req, res) => {
  const loggedInUserData = await loginUser(req.body);
  const finalUserData = prepareFinalReposnseForLoggedInUser(
    loggedInUserData,
    generateToken(loggedInUserData.email)
  );
  return finalUserData;
};

const getUserDataById = async (req) => {
  const usersData = await getUserData({
    _id: new mongoose.Types.ObjectId(req.params.id),
  });
  return usersData[0];
};

export default { registerUser, login, getUserDataById };
