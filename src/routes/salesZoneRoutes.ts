import {
    getSalesZone,
    getSalesZoneById
} from "$controllers/salesZoneController";
import express from "express";
import { checkJwt } from "$middlewares/authMiddleware";

const salesZoneRoutes = express.Router();

salesZoneRoutes.get("/", checkJwt, getSalesZone);
salesZoneRoutes.get("/:id", checkJwt, getSalesZoneById);

export default salesZoneRoutes;