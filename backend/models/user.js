import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import constants from "../configs/constants.js";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: null,
    },
    shippingAddress: { type: String, default: null },
    userRoleSlug: {
      type: String,
      required: true,
      enum: Object.keys(constants.userRoleSlugs),
      default: constants.userRoleSlugs.buyer,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
