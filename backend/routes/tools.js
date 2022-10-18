import express from "express";
import { addTool, getTools, getToolDetails } from "../controller/tool.js";

const router = express.Router();

// @route POST /tools
// @desc Add Tool
// @access Public
router.post("/", addTool);

// @route GET /tools
// @desc Get Tool
// @access Public
router.get("/", getTools);

// @route GET /tools/${id}
// @desc Get tool details
// @access Public
router.get("/:id", getToolDetails);

export default router;
