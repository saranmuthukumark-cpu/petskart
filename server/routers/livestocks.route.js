import express from "express";
import { getLivestock } from "../controllers/livestocksController.js";

const router = express.Router();

router.get("/", getLivestock);

export default router;
