import express from "express";
import { getPharmacy } from "../controllers/pharmacyController.js";

const router = express.Router();

router.get("/", getPharmacy);

export default router;
