import Recipe from "../models/recipe.js";

//ADD BEAN
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
