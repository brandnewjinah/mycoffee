import express from "express";
import { getBeans, addBean } from "../controller/bean.js";

const router = express.Router();

// @route GET /beans
// @desc Get beans
// @access Public
router.get("/", getBeans);

// @route POST /beans
// @desc Add bean
// @access Private
router.post("/", addBean);

export default router;
