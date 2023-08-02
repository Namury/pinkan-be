import {
  editLoggedInUser,
  editUser,
  getUser,
  getUserById,
  getUserByLoggedInUser,
  login,
  register
} from "$controllers/userController";
import express from "express";
import {
  validateLoginRequest,
  validateRegisterRequest,
  validateGetAllUserRequest,
  validateGetUserByIdRequest,
  validateEditRequest,
  validateEditLoggedInUserRequest
} from "$validations/userValidation";
import { checkJwt } from "$middlewares/authMiddleware";

const userRoutes = express.Router();

userRoutes.get("/", checkJwt, getUser)
userRoutes.get("/profile", checkJwt, getUserByLoggedInUser)
userRoutes.get("/:id", checkJwt, validateGetUserByIdRequest, getUserById)
userRoutes.post("/login", validateLoginRequest, login);
userRoutes.put("/edit", checkJwt, validateEditLoggedInUserRequest, editLoggedInUser)
userRoutes.put("/edit/:id", checkJwt, validateEditRequest, editUser)
userRoutes.post(
  "/register",
  validateRegisterRequest,
  register
);

export default userRoutes;
