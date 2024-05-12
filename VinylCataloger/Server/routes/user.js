import express from "express";
import { getUser, getAvatar } from "../controllers/user.js";
const router = express.Router();

router.get("/find/:UserID", getUser);
router.get("/getAvatar", getAvatar);
export default router;
