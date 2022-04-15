import React, { FC, ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { nanoid } from "nanoid";

//comp
import { Container } from "../../../components/container/Container";
import Header from "../../../components/Header";
import { Section } from "../../../components/container/Section";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Buttons";
import { primaryColor } from "../../../components/token";

//util
import { recipeValidate } from "../../../utils/validate";

//interface
import { Recipe, RecipeErrors } from "../../../interfaces/interface";

//redux
import { useDispatch } from "react-redux";
import { createRecipe } from "../../../redux/recipeActionsRedux";

interface Props {
  errors: RecipeErrors;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleNext: (page: number) => void;
}

const AddRecipe: FC<Props> = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [recipe, setRecipe] = useState<Recipe>({
    id: nanoid(),
    name: "",
    desc: "",
    ingredients: [],
    directions: [],
    ratio: [],
  });

  const [errors, setErrors] = useState<RecipeErrors>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const userInput = { ...recipe };
    if (name === "name") userInput.name = value;
    if (name === "desc") userInput.desc = value;
    setRecipe(userInput);
  };

  const handleNext = () => {
    const errors = recipeValidate(recipe);
    setErrors(errors || {});
    if (errors) return;

    dispatch(createRecipe(recipe));
    history.push(`/recipes/new/${recipe.id}/ingredients`);
  };

  return (
    <Container gap="2.5rem">
      <Header title="New Recipe" />
      <Section gap="1.625rem">
        <Input
          name="name"
          label="Name"
          error={errors.name}
          onChange={handleInputChange}
        />
        <Input
          name="desc"
          label="Drink Description"
          error={errors.desc}
          onChange={handleInputChange}
        />
      </Section>
      <Button
        label="Next"
        variant="primary"
        color={primaryColor.blue}
        handleClick={handleNext}
      />
    </Container>
  );
};

export default AddRecipe;
