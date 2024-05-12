import express from "express";
import { getVinylInfo, getVinylImage } from "../controllers/vinyl.js";
const router = express.Router();

router.get("/:UserID/:VinylID", getVinylInfo);
router.get("/getVinylImage", getVinylImage);
export default router;
