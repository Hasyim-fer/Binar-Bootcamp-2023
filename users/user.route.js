const express = require("express");
const userController = require("./user.controller");
const userRouter = express.Router();

// API to get all users data
userRouter.get("/data", userController.getAllUsers);

// API to get user by username
userRouter.post("/data", userController.getUserByUsername);

// API to get user by id (& biodata)
userRouter.get("/data/:id", userController.getUserById);

// API to Register a new User
userRouter.post("/register", userController.registerNewUser);

// API to Login
userRouter.get("/login", userController.loginExistingUser);

// API to get user biodata
userRouter.put("/biodata/:userId", userController.updateUserBiodata);

// API to get all games history by user id
userRouter.get("/games/:id", userController.getAllGames);

// API to create new games history
userRouter.put("/games/:id", userController.createGames);

module.exports = userRouter;
