import constants from "../configs/constants.js";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";

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

  const user = await User.create(userData);
  if (user) {
    return { ...user, token: generateToken(user.email) };
  } else {
    throw new Error("Invalid user");
  }
};

export const loginUser = async (userData) => {
  const user = await User.find({
    $or: [{ email: userData.email }, { phoneNumber: userData.phoneNumber }],
  });

  if (user && (await user.matchPassword(password))) {
    return {
      ...user,
      token: generateToken(user.email),
    };
  } else {
    throw new Error("Invalid email or password");
  }
};

export const getUserData = async (query, limit = 10, skip = 0) => {
  const usersInfo = await User.find(query).limit(limit).skip(skip);
  if (usersInfo && !usersInfo.length) {
    throw new Error("User Not found!");
  }
  return usersInfo;
};
