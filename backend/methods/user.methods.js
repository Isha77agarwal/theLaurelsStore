import constants from "../configs/constants.js";
import User from "../models/user.js";
import mongoose from "mongoose";
import generateHashedPassword from "../utils/generateHashedPassword.js";

export const preparePayloadToCreateUser = async (userData) => {
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

  userPayload.password = await generateHashedPassword(userData.password);
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

export const prepareQueryToGetUsersData = (queryData) => {
  const query = {};

  if (queryData.email && Array.isArray(queryData.email)) {
    query.email = { $in: queryData.email };
  } else if (queryData.email) {
    query.email = queryData.email;
  }

  if (queryData.phoneNumber && Array.isArray(queryData.phoneNumber)) {
    query.phoneNumber = { $in: queryData.phoneNumber };
  } else if (queryData.phoneNumber) {
    query.phoneNumber = queryData.phoneNumber;
  }

  if (queryData.userRoleSlug && Array.isArray(queryData.userRoleSlug)) {
    query.userRoleSlug = { $in: queryData.userRoleSlug };
  } else if (queryData.userRoleSlug) {
    query.userRoleSlug = queryData.userRoleSlug;
  }

  if (queryData._id && Array.isArray(queryData._id)) {
    query._id = {
      $in: queryData._id.map((id) => new mongoose.Types.ObjectId(id)),
    };
  } else if (queryData._id) {
    query._id = new mongoose.Types.ObjectId(queryData._id);
  }

  return query;
};

export const prepareFinalReposnseForLoggedInUser = (userData, token) => {
  const finalUserData = {
    _id: userData._id,
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

export const preparePayloadToUpdateUser = async (userInfo) => {
  const preparedUserInfo = {};

  if (userInfo.name) {
    preparedUserInfo.name = userInfo.name;
  }

  if (userInfo.password) {
    preparedUserInfo.password = await generateHashedPassword(userInfo.password);
  }

  if (userInfo.userRoleSlug) {
    preparedUserInfo.userRoleSlug = userInfo.userRoleSlug;
  }

  if (userInfo.address) {
    preparedUserInfo.address = userInfo.address;
  }

  if (userInfo.shippingAddress) {
    preparedUserInfo.shippingAddress = userInfo.shippingAddress;
  }

  return preparedUserInfo;
};

export const updateUser = async (userId, updatedUserData) => {
  const _id = new mongoose.Types.ObjectId(userId);
  const updatedUserResponse = await User.findOneAndUpdate(
    { _id },
    { $set: updatedUserData },
    { new: true }
  );

  return updatedUserResponse;
};

export const deleteUserData = async (userId) => {
  const _id = new mongoose.Types.ObjectId(userId);
  const updatedUserResponse = await User.deleteOne({ _id });

  return updatedUserResponse;
};

export const getUserData = async (query, limit = 10, skip = 0) => {
  const usersInfo = await User.find(query)
    .select("-password")
    .limit(limit)
    .skip(skip);
  return usersInfo;
};
