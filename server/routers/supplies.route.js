import express from "express";
import { getSupplies } from "../controllers/suppliesController.js";

const router = express.Router();

router.get("/", getSupplies);

export default router;
