import {
    getSalesZone,
    getSalesZoneById,
    addSalesZone,
    editSalesZone,
    deleteSalesZone
} from "$controllers/salesZoneController";
import express from "express";
import { 
    validateSalesZoneByIdRequest,
    validateAddSalesZoneRequest,
    validateEditSalesZoneRequest,
    validateDeleteSalesZoneRequest
} from "$validations/salesZoneValidation";
import { checkJwt } from "$middlewares/authMiddleware";

const salesZoneRoutes = express.Router();

salesZoneRoutes.get("/", getSalesZone);
salesZoneRoutes.get("/:id", validateSalesZoneByIdRequest, getSalesZoneById);
salesZoneRoutes.post("/add", checkJwt, validateAddSalesZoneRequest, addSalesZone);
salesZoneRoutes.put("/:id/edit", checkJwt, validateEditSalesZoneRequest, editSalesZone);
salesZoneRoutes.delete("/:id", checkJwt, validateDeleteSalesZoneRequest, deleteSalesZone);

export default salesZoneRoutes;