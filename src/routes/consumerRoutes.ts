import {
  getConsumer,
  getConsumerType,
  getConsumerTypeById,
  getConsumerById,
  addConsumer,
  editConsumer,
  deleteConsumer,
  bypassUpdateConsumptionDaysRemaining,
  bypassUpdateConsumptionDaysRemainingHistory,
  exportConsumer,
  getConsumerCount,
  getConsumerReminderList,
  getConsumerReminderListCount,
  exportConsumerListReminder,
  bypassUpdateConsumerWeeklyHistory,
  exportConsumerWeeklyHistory,
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
consumerRoutes.get("/export/weekly", checkJwt, exportConsumerWeeklyHistory);
consumerRoutes.get("/types", checkJwt, getConsumerType);
consumerRoutes.get("/list-reminder", checkJwt, getConsumerReminderList);
consumerRoutes.get("/list-reminder/count", checkJwt, getConsumerReminderListCount);
consumerRoutes.get("/list-reminder/export", checkJwt, exportConsumerListReminder);
consumerRoutes.get("/bypass-consumption-days-remaining", bypassUpdateConsumptionDaysRemaining);
consumerRoutes.get("/bypass-consumption-days-remaining-history", bypassUpdateConsumptionDaysRemainingHistory);
consumerRoutes.get("/bypass-update-consumer-weekly-history", bypassUpdateConsumerWeeklyHistory);
consumerRoutes.get("/:id", checkJwt,validateGetConsumerByIdRequest, getConsumerById);
consumerRoutes.get("/types/:id", checkJwt, validateGetConsumerTypeByIdRequest, getConsumerTypeById);
consumerRoutes.post("/add", checkJwt, validateAddConsumerRequest, addConsumer);
consumerRoutes.put("/:id/edit", checkJwt, validateEditConsumerRequest, editConsumer);
consumerRoutes.delete("/:id", checkJwt, validateDeleteConsumerRequest, deleteConsumer);


export default consumerRoutes;
  