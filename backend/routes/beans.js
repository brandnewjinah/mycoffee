import express from "express";
import {
  getBeans,
  getBeanDetails,
  addBean,
  addNote,
} from "../controller/bean.js";

const router = express.Router();

// @route GET /beans
// @desc Get beans
// @access Public
router.get("/", getBeans);

// @route GET /beans/${id}
// @desc Get bean details
// @access Public
router.get("/:id", getBeanDetails);

// @route POST /beans
// @desc Add bean
// @access Private
router.post("/", addBean);

// @route PATCH /beans/${id}
// @desc Add note
// @access Private
router.patch("/:id", addNote);

export default router;
