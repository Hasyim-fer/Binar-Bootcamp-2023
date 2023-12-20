const express = require("express");
const userModel = require("./user.model");
const userController = require("./user.controller");
const userRouter = express.Router();

// API to get all users data
userRouter.get("/data", userController.getAllUsers);

// API to get user by username
userRouter.post("/data", userController.getUserByUsername);

// API to Register a new User
userRouter.post("/register", userController.registerNewUser);

// API to Login
userRouter.get("/login", userController.loginExistUser);

module.exports = userRouter;
