import constants from "../configs/constants.js";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

export const preparePayloadToCreateUser = async (userData) => {
  const salt = await bcrypt.genSalt(10);
  const userPayload = {
    name: userData.name,
    email: userData.email,
    phoneNumber: userData.phoneNumber,
    userRoleSlug: constants.userRoleSlugs.buyer,
  };
  if (userData.address) {
    userPayload.address = userData.address;
  }

  if (userData.shippingAddress) {
    userPayload.shippingAddress = userData.shippingAddress;
  }

  userPayload.password = await bcrypt.hash(userData.password, salt);
  return userPayload;
};

export const createNewUser = async (userData) => {
  const userExists = await User.find({
    $or: [{ email: userData.email }, { phoneNumber: userData.phoneNumber }],
  });

  if (userExists && userExists.length > 0) {
    throw new Error("User already exists");
  }

  const data = new User(userData);
  const user = await data.save();
  if (user) {
    return user;
  } else {
    throw new Error("Invalid user");
  }
};

const matchPassword = async function (enteredPassword, userPassword) {
  return await bcrypt.compare(enteredPassword, userPassword);
};

export const loginUser = async (userData) => {
  const user = await User.findOne({
    $or: [{ email: userData.email }, { phoneNumber: userData.phoneNumber }],
  });

  if (user && (await matchPassword(userData.password, user.password))) {
    return user;
  } else {
    throw new Error("Invalid email or password");
  }
};

export const prepareFinalReposnseForLoggedInUser = (userData, token) => {
  const finalUserData = {
    name: userData.name,
    email: userData.email,
    phoneNumber: userData.phoneNumber,
    address: userData.address,
    shippingAddress: userData.shippingAddress,
    userRoleSlug: userData.userRoleSlug,
    token,
  };

  return finalUserData;
};

export const getUserData = async (query, limit = 10, skip = 0) => {
  const usersInfo = await User.find(query)
    .select("-password")
    .limit(limit)
    .skip(skip);
  if (usersInfo && !usersInfo.length) {
    throw new Error("User Not found!");
  }
  return usersInfo;
};
