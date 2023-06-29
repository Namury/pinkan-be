import {
  getConsumer,
  getConsumerType,
  getConsumerTypeById,
  getConsumerById,
  addConsumer,
  editConsumer,
  deleteConsumer,
  } from "$controllers/consumerController";
import express from "express";
import { checkJwt } from "$middlewares/authMiddleware";
import {
  validateGetConsumerByIdRequest,
  validateGetConsumerTypeByIdRequest,
  validateAddConsumerRequest,
  validateEditConsumerRequest,
  validateDeleteConsumerRequest,
} from "$validations/consumerValidation";

const consumerRoutes = express.Router();

consumerRoutes.get("/", checkJwt, getConsumer);
consumerRoutes.get("/types", checkJwt, getConsumerType);
consumerRoutes.get("/:id", checkJwt,validateGetConsumerByIdRequest, getConsumerById);
consumerRoutes.get("/types/:id", checkJwt, validateGetConsumerTypeByIdRequest, getConsumerTypeById);
consumerRoutes.post("/add", checkJwt, validateAddConsumerRequest, addConsumer);
consumerRoutes.put("/:id/edit", checkJwt, validateEditConsumerRequest, editConsumer);
consumerRoutes.delete("/:id", checkJwt, validateDeleteConsumerRequest, deleteConsumer);


export default consumerRoutes;
  