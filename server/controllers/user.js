/* IMPORTS FROM MODELS */
import User from "../models/user.js";
import jwt from "jsonwebtoken";

/* IMPORTS FROM UTILS */
import catchAsync from "../utils/catchAsync.js";
import createSendToken from "../utils/jwt.js";
import ErrorHandler from "../utils/errorHandler.js";

//USER: register a new user => /api/v1/user/register
export const register = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  createSendToken(user, 201, res);
});

//USER: login user => /api/v1/user/login
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //check if user entered an email and password
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  //checking user existence by email
  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 404));
  }

  //Check if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  createSendToken(user, 200, res);
});

//USER: logout user => /api/v1/auth/logout
export const logout = (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
