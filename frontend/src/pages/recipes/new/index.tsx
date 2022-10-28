import React, { FC, ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { nanoid } from "nanoid";

//comp
import { Flex } from "../../../components/container/Div";
import { Header } from "../../../components/Header";
import { Section } from "../../../components/container/Section";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Buttons";
import { Radio } from "../../../components/RadioButton";

//util
import { recipeValidate } from "../../../utils/validate";

//interface
import { Recipe, RecipeErrors } from "../../../interfaces/recipeInterface";

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
    type: "hot",
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

  //select recipe type
  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRecipe({ ...recipe, type: value });
  };

  const handleNext = () => {
    const errors = recipeValidate(recipe);
    setErrors(errors || {});
    if (errors) return;

    dispatch(createRecipe(recipe));
    history.push(`/recipes/new/${recipe.id}/ingredients`);
  };

  return (
    <Flex flexCol gap="2.5rem">
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
        <article>
          <h4>Roast Level</h4>
          <div>
            <Radio
              label="Hot"
              name="group"
              value="hot"
              checked={recipe.type === "hot"}
              onChange={handleSelect}
            />
            <Radio
              label="Iced"
              name="group"
              value="iced"
              checked={recipe.type === "iced"}
              onChange={handleSelect}
            />
          </div>
        </article>
      </Section>
      <Button
        label="Next"
        variant="primary"
        fullWidth
        handleClick={handleNext}
      />
    </Flex>
  );
};

export default AddRecipe;
