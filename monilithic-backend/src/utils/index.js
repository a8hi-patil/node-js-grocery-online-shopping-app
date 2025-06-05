const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("../config");
const createSalt = async () => {
  return bcrypt.genSalt();
};

const hashPassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

const validatePassword = async (
  givenPassword,
  originalHashedPassword,
  salt
) => {
  return (await bcrypt.hash(givenPassword, salt)) === originalHashedPassword;
};

const generateToken = async (paylaod) => {
  try {
    return await jwt.sign(paylaod, APP_SECRET, { expiresIn: "30d" });
  } catch (err) {
    throw err;
  }
};
const ValidateSignature = async (req) => {
  try {
    const signature = req.get("Authorization");
    if (!signature) return false;
    const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
    req.user = payload;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
module.exports = {
  createSalt,
  hashPassword,
  validatePassword,
  generateToken,
  ValidateSignature,
};
