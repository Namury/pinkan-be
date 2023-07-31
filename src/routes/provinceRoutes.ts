import {
    getProvince,
    getProvinceById
} from "$controllers/provinceController";
import express from "express";
import { validateSalesZoneByIdRequest } from "$validations/salesZoneValidation";

const provinceRoutes = express.Router();

provinceRoutes.get("/", getProvince);
provinceRoutes.get("/:id", validateSalesZoneByIdRequest, getProvinceById);

export default provinceRoutes;