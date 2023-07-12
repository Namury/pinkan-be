import {
  getConsumer,
  getConsumerType,
  getConsumerTypeById,
  getConsumerById,
  addConsumer,
  editConsumer,
  deleteConsumer,
  bypassUpdateConsumptionDaysRemaining,
  exportConsumer,
  getConsumerCount,
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
consumerRoutes.get("/count", checkJwt, getConsumerCount);
consumerRoutes.get("/export", checkJwt, exportConsumer);
consumerRoutes.get("/types", checkJwt, getConsumerType);
consumerRoutes.get("/bypass-consumption-days-remaining", checkJwt, bypassUpdateConsumptionDaysRemaining);
consumerRoutes.get("/:id", checkJwt,validateGetConsumerByIdRequest, getConsumerById);
consumerRoutes.get("/types/:id", checkJwt, validateGetConsumerTypeByIdRequest, getConsumerTypeById);
consumerRoutes.post("/add", checkJwt, validateAddConsumerRequest, addConsumer);
consumerRoutes.put("/:id/edit", checkJwt, validateEditConsumerRequest, editConsumer);
consumerRoutes.delete("/:id", checkJwt, validateDeleteConsumerRequest, deleteConsumer);


export default consumerRoutes;
  