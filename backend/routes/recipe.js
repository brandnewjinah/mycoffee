import express from "express";
import {
  addRecipe,
  getRecipes,
  getRecipeDetails,
  deleteRecipe,
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

// @route DELETE /berecipeans/${id}
// @desc Delete recipe
// @access Private
router.delete("/:id", deleteRecipe);

export default router;
