import {
    login,
    register
  } from "$controllers/userController";
  import express from "express";
  import {
    validateLoginRequest,
    validateRegisterRequest
  } from "$validations/userValidation";
  
  const userRoutes = express.Router();
  
  userRoutes.post("/login", validateLoginRequest, login);
  userRoutes.post(
    "/register",
    validateRegisterRequest,
    register
  );

  export default userRoutes;
  