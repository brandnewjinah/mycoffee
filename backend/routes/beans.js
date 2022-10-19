import express from "express";
import {
  getBeans,
  getBeanDetails,
  addBean,
  updateBean,
  deleteBean,
  addNote,
  deleteNote,
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
// @desc Update bean
// @access Admin only
router.patch("/:id", updateBean);

// @route DELETE /beans/${id}
// @desc Delete bean
// @access Private
router.delete("/:id", deleteBean);

// @route PATCH /beans/addnote/${id}
// @desc Add note
// @access Private
router.patch("/addnote/:id", addNote);

// @route PATCH /beans/deletenote/${id}
// @desc Delete note
// @access Private
router.patch("/deletenote/:id", deleteNote);

export default router;
