import React, { FC, ChangeEvent, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import styled from "styled-components";

//comp
import { Container, Flex } from "../../../components/container/Container";
import Header from "../../../components/Header";
import { Section } from "../../../components/container/Section";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Buttons";
import Select from "../../../components/Select";
import Modal from "../../../components/Modal";
import { primaryColor } from "../../../components/token";
import { Plus } from "../../../assets/Icons";
import Chips from "../../../components/Chips";

//interface
import {
  Recipe,
  RecipeErrors,
  Ingredients,
} from "../../../interfaces/interface";

//data
import { unitOptions } from "../../../data/data";
import { categoryList } from "../../../data/category";

//redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { addIngredients } from "../../../redux/recipeRedux";

interface Props {
  errors: RecipeErrors;
  handleNext: (page: number) => void;
}

const AddRecipe: FC<Props> = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  //get this recipe
  const { recipeId } = useParams<{ recipeId: string }>();
  const thisRecipe: Recipe = useSelector(
    (state: RootState) => state.recipe.recipe
  );

  const [ingredients, setIngredients] = useState<Ingredients[]>([]);

  const [errors, setErrors] = useState<RecipeErrors>({});

  const handleIngredientDelete = (id: string) => {
    let newIngredients = [...ingredients];
    newIngredients = newIngredients.filter((ing) => ing.id !== id);
    setIngredients(newIngredients);
  };

  //modal
  const [showModal, setShowModal] = useState(false);

  const [thisIngredient, setThisIngredient] = useState<Ingredients>({});

  const handleIngredients = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    let currentIngredient = { ...thisIngredient };
    currentIngredient[name] = value;
    setThisIngredient(currentIngredient);
  };

  const handleUnitSelect = (unit: string) => {
    let currentIngredient = { ...thisIngredient };
    currentIngredient.unit = unit;
    setThisIngredient(currentIngredient);
  };

  const handleIngredientSave = () => {
    let newIngredients = [...ingredients];
    let newThisIngredient = { ...thisIngredient, id: nanoid() };
    newIngredients = [...newIngredients, newThisIngredient];
    setIngredients(newIngredients);
    setShowModal!(false);
    setThisIngredient({});
    //dispatch redux
  };

  const handleNext = () => {
    if (ingredients.length === 0) return;

    dispatch(addIngredients(ingredients));
    history.push(`/recipes/new/${recipeId}/directions`);
  };

  return (
    <Container gap="2.5rem">
      <Section gap="1rem">
        <Header title={thisRecipe.name} subtitle={thisRecipe.desc} />
        {ingredients &&
          ingredients.length > 0 &&
          ingredients.map((item, idx) => (
            <Flex key={idx}>
              <p>{item.value}</p>
              <p>{item.unit}</p>
              <p>{item.ingredient}</p>
              <div onClick={() => handleIngredientDelete(item.id!)}>delete</div>
            </Flex>
          ))}
        <Add>
          <Button
            label="Add Ingredient"
            variant="primary"
            color={primaryColor.blue}
            icon={<Plus width="20" height="20" color="#fff" stroke="2" />}
            handleClick={() => setShowModal!(true)}
          />
        </Add>
        <Modal
          header="Add Ingredient"
          open={showModal!}
          handleClose={() => setShowModal!(false)}
        >
          <Section gap="1rem">
            <Input
              name="ingredient"
              placeholder="Ingredient"
              onChange={handleIngredients}
            />

            <Input
              name="value"
              placeholder="Value"
              onChange={handleIngredients}
            />
            <ul>
              {unitOptions.map((unit) => (
                <Chips
                  key={unit.id}
                  label={unit.name}
                  selected={thisIngredient.unit === unit.abbr}
                  handleSelect={() => handleUnitSelect(unit.abbr)}
                />
              ))}
            </ul>
          </Section>
          <Button
            label="Add"
            variant="primary"
            color={primaryColor.blue}
            handleClick={handleIngredientSave}
          />
        </Modal>
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

const Add = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

export default AddRecipe;
