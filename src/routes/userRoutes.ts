import {
  getUser,
  getUserById,
  login,
  register
} from "$controllers/userController";
import express from "express";
import {
  validateLoginRequest,
  validateRegisterRequest,
  validateGetAllUserRequest,
  validateGetUserByIdRequest
} from "$validations/userValidation";
import { checkJwt } from "$middlewares/authMiddleware";

const userRoutes = express.Router();

userRoutes.get("/", checkJwt, getUser)
userRoutes.get("/:id", checkJwt, validateGetUserByIdRequest, getUserById)
userRoutes.post("/login", validateLoginRequest, login);
userRoutes.post(
  "/register",
  validateRegisterRequest,
  register
);

export default userRoutes;
