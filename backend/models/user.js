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
    },
    shippingAddress: { type: String },
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

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
