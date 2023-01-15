import {
  preparePayloadToCreateUser,
  createNewUser,
  loginUser,
  getUserData,
  prepareFinalReposnseForLoggedInUser,
  preparePayloadToUpdateUser,
  updateUser,
  deleteUserData,
  prepareQueryToGetUsersData,
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

const login = async (req) => {
  const loggedInUserData = await loginUser(req.body);
  const finalUserData = prepareFinalReposnseForLoggedInUser(
    loggedInUserData,
    generateToken(loggedInUserData.email)
  );
  return finalUserData;
};

const getUsersData = async (req) => {
  const preparedQuery = prepareQueryToGetUsersData(req.query);

  const usersData = await getUserData(preparedQuery);

  return usersData;
};

const getUserDataById = async (req) => {
  const usersData = await getUserData({
    _id: new mongoose.Types.ObjectId(req.params.id),
  });

  //throw error if user is not found
  if (usersData && !usersData.length) {
    throw new Error("User Not found!");
  }

  return usersData[0];
};

const updateUserData = async (req) => {
  const userId = req.params.id;

  const preparedUpdatedUserData = await preparePayloadToUpdateUser(req.body);

  const updatedUserData = await updateUser(userId, preparedUpdatedUserData);

  return updatedUserData;
};

const deleteUser = async (req) => {
  const userId = req.params.id;

  const deletedUserResponse = await deleteUserData(userId, { new: true });

  return deletedUserResponse;
};

export default {
  registerUser,
  login,
  getUsersData,
  getUserDataById,
  updateUserData,
  deleteUser,
};
