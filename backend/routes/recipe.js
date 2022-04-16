import express from "express";
import {
  addRecipe,
  getRecipes,
  getRecipeDetails,
} from "../controller/recipe.js";

const router = express.Router();

// @route POST /recipes
// @desc Add recipe
// @access Private
router.post("/", addRecipe);

// @route GET /recipes
// @desc View all recipes
// @access Public
router.get("/", getRecipes);

// @route GET /recipe/${id}
// @desc Get recipe details
// @access Public
router.get("/:id", getRecipeDetails);

export default router;
