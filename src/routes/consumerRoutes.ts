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
  validateAddConsumerRequest,
  validateEditConsumerRequest,
} from "$validations/consumerValidation";

const consumerRoutes = express.Router();

consumerRoutes.get("/", checkJwt, getConsumer);
consumerRoutes.get("/types", checkJwt, getConsumerType);
consumerRoutes.get("/types/:id", checkJwt, getConsumerTypeById);
consumerRoutes.get("/:id", checkJwt, getConsumerById);
consumerRoutes.post("/add", checkJwt, validateAddConsumerRequest, addConsumer);
consumerRoutes.put("/:id/edit", checkJwt, validateEditConsumerRequest, editConsumer);
consumerRoutes.delete("/:id", checkJwt, deleteConsumer);


export default consumerRoutes;
  