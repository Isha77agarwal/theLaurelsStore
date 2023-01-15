import bcrypt from "bcryptjs";

const generateHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hash(password, salt);

  return hashedPassword;
};

export default generateHashedPassword;
