import Recipe from "../models/recipe.js";
import mongoose from "mongoose";

//ADD RECIPE
export const addRecipe = async (req, res) => {
  const recipe = req.body;

  const newRecipe = new Recipe(recipe);
  try {
    await newRecipe.save();

    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET ALL RECIPES
export const getRecipes = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * pageSize;

  try {
    let recipes = Recipe.find();
    const total = await Recipe.countDocuments();
    const pages = Math.ceil(total / pageSize);
    recipes = recipes.skip(skip).limit(pageSize);
    const result = await recipes;
    res.status(200).json({
      status: "success",
      count: result.length,
      page,
      pages,
      data: result,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//GET RECIPE DETAILS
export const getRecipeDetails = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const recipe = await Recipe.findById(_id);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(404).json({ message: "Recipe doesn't exist" });
  }
};

//DELETE RECIPE
export const deleteRecipe = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send({ message: "Not a valid Id" });

  await Recipe.findByIdAndRemove(_id);
  res.status(200).json({ message: "Recipe deleted successfully" });
};
