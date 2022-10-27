import express from "express";
import { searchBeans } from "../controller/search.js";

const router = express.Router();

// @route GET /search
// @desc Get beans
// @access Public
router.get("/", searchBeans);

export default router;
