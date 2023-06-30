import {
    getSalesZone,
    getSalesZoneById
} from "$controllers/salesZoneController";
import express from "express";
import { validateSalesZoneByIdRequest } from "$validations/salesZoneValidation";

const salesZoneRoutes = express.Router();

salesZoneRoutes.get("/", getSalesZone);
salesZoneRoutes.get("/:id", validateSalesZoneByIdRequest, getSalesZoneById);

export default salesZoneRoutes;