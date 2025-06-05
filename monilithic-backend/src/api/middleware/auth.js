const { model } = require("mongoose");
const { ValidateSignature } = require("../../utils");

const isAuth = async (req, res, next) => {
  let isAuthenticated = await ValidateSignature(req);
  if (!isAuthenticated) {
    res.status(401);
    res.json({ message: "Token expired" });
  }
  next();
};

module.exports = isAuth;
