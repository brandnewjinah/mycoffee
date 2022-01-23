import React, { useState, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import { nanoid } from "nanoid";

//comp
import NewPresenter from "./NewPresenter";

//util
import { recipeValidate } from "../../../utils/validate";

//interface
import { Recipe, RecipeErrors } from "../../../interfaces/interface";

const NewContainer = () => {
  const history = useHistory();
  const [page, setPage] = useState(1);

  const [recipe, setRecipe] = useState<Recipe>({
    id: nanoid(),
    name: "",
    desc: "",
    ingredients: [{ id: nanoid(), ingredient: "", amount: "", unit: "" }],
    directions: [{ id: 1, direction: "" }],
    ratio: [{ index: 1, id: 1, ingredient: "", value: "" }],
  });

  const [errors, setErrors] = useState<RecipeErrors>({});

  //common variables clones
  let newRecipe = { ...recipe };

  let newDir = [...newRecipe.directions];
  let newRatio = [...newRecipe.ratio];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const userInput = { ...recipe };
    userInput.name = value;
    setRecipe(userInput);
  };

  const handleIngredients = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value, name } = e.target;
    let index = recipe.ingredients.findIndex((i) => i.id === id);
    let newIng = [...newRecipe.ingredients];
    let currentItem = { ...newIng[index] };

    currentItem[name] = value;
    newIng[index] = currentItem;
    newRecipe = { ...newRecipe, ingredients: newIng };
    setRecipe(newRecipe);
  };

  const handleIngredientAdd = () => {
    let newIng = [...newRecipe.ingredients];
    newIng = [
      ...newIng,
      { id: nanoid(), ingredient: "", amount: "", unit: "" },
    ];
    setRecipe({ ...recipe, ingredients: newIng });
  };

  const handleNext = (page: number) => {
    if (page === 1) {
      const errors = recipeValidate(recipe);
      setErrors(errors || {});
      if (errors) return;
      setPage(page + 1);
    } else {
      // let newRecipe = { ...data, features };
      // dispatch(addNote({ newNote, beanId }));
      history.push(`/recipe/${recipe.id}`);
    }
  };

  //optional modal
  const [showModal, setShowModal] = useState(false);
  const [unitSelected, setUnitSelected] = useState<string>("");

  const handleModalSelect = (id: string, unit: string) => {
    let index = recipe.ingredients.findIndex((i) => i.id === id);
    let newIng = [...newRecipe.ingredients];
    let currentItem = { ...newIng[index] };

    currentItem.unit = unit;
    newIng[index] = currentItem;
    newRecipe = { ...newRecipe, ingredients: newIng };
    setRecipe(newRecipe);

    setShowModal!(false);
  };

  const handleUnitSelect = (unit: string) => {
    setUnitSelected(unit);
  };

  const handleIngredientSave = () => {
    console.log(unitSelected);
  };

  return (
    <NewPresenter
      page={page}
      recipe={recipe}
      errors={errors}
      handleInputChange={handleInputChange}
      handleIngredients={handleIngredients}
      handleIngredientAdd={handleIngredientAdd}
      handleIngredientSave={handleIngredientSave}
      handleNext={handleNext}
      showModal={showModal}
      unitSelected={unitSelected}
      handleUnitSelect={handleUnitSelect}
      setShowModal={setShowModal}
      handleModalSelect={handleModalSelect}
    />
  );
};

export default NewContainer;
