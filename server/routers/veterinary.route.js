import express from "express";
import { getVeterinary } from "../controllers/veterinaryController.js";

const router = express.Router();

router.get("/", getVeterinary);

export default router;
