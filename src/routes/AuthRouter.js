const express = require("express");
const authRouter = express.Router();
const {
  login,
  logout,
  registerUser,
  loginGoogle,
} = require("../app/controllers/AuthController");
const loginLimiter = require("../app/middleware/loginLimiter");

authRouter.route("/register").post(registerUser);

authRouter.route("/login").post(loginLimiter, login);

authRouter.route("/loginGoogle").post(loginLimiter, loginGoogle);

authRouter.route("/logout").post(logout);

module.exports = authRouter;
