import express from "express";
import {
  getMe,
  loginUser,
  logoutUser,
  registerUser,
  getAllUsers, 
} from "../controllers/authController.js";
import auth from "../middlewares/auth.js";

const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);
authRouter.get("/me", auth, getMe);
authRouter.get("/logout", auth, logoutUser);
authRouter.get("/users", auth, getAllUsers);

export default authRouter;
