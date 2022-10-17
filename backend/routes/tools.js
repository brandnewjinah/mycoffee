import express from "express";
import { addTool } from "../controller/tool.js";

const router = express.Router();

// @route POST /tools
// @desc Add Tool
// @access Public
router.post("/", addTool);

export default router;
