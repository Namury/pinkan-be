import {
    getSalesZone,
    getSalesZoneById
} from "$controllers/salesZoneController";
import express from "express";
import { checkJwt } from "$middlewares/authMiddleware";
import { validateSalesZoneByIdRequest } from "$validations/salesZoneValidation";

const salesZoneRoutes = express.Router();

salesZoneRoutes.get("/", checkJwt, getSalesZone);
salesZoneRoutes.get("/:id", checkJwt, validateSalesZoneByIdRequest, getSalesZoneById);

export default salesZoneRoutes;