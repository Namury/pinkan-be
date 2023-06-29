import {
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

const userRoutes = express.Router();

// userRoutes.get("/", validateGetAllUserRequest, getAllUser)
// userRoutes.get("/:id", validateGetUserByIdRequest, getUserById)
userRoutes.post("/login", validateLoginRequest, login);
userRoutes.post(
  "/register",
  validateRegisterRequest,
  register
);

export default userRoutes;
