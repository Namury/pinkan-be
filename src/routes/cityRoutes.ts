import {
    getCity,
    getCityById
} from "$controllers/cityController";
import express from "express";
import { validateSalesZoneByIdRequest } from "$validations/salesZoneValidation";

const cityRoutes = express.Router();

cityRoutes.get("/", getCity);
cityRoutes.get("/:id", validateSalesZoneByIdRequest, getCityById);

export default cityRoutes;