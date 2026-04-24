import express from "express";
import { upload, createListing, updateListing, deleteListing } from "../controllers/adminListController.js";

const router = express.Router();

router.post("/:category", upload.single("image"), createListing);
router.put("/:category/:id", upload.single("image"), updateListing);
router.delete("/:category/:id", deleteListing);

export default router;
