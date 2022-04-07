import React, { FC, ChangeEvent, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import styled from "styled-components";

//comp
import { Container, Flex } from "../../../components/container/Container";
import Header from "../../../components/Header";
import { Section } from "../../../components/container/Section";
import { Input } from "../../../components/Input";
import { Button, LinkButton } from "../../../components/Buttons";
import Modal from "../../../components/Modal";
import { primaryColor } from "../../../components/token";
import { Plus } from "../../../assets/Icons";
import Chips from "../../../components/Chips";

//interface
import {
  Recipe,
  RecipeErrors,
  Ingredients,
  Direction,
} from "../../../interfaces/interface";

//data
import { unitOptions } from "../../../data/data";

//redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { addIngredients } from "../../../redux/recipeRedux";

interface Props {
  errors: RecipeErrors;
  handleNext: (page: number) => void;
}

const AddDirections: FC<Props> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { recipeId } = useParams<{ recipeId: string }>();
  const recipes = useSelector((state: RootState) => state.recipe.recipes);
  const thisRecipe: Recipe = recipes.find(
    (recipe: { id: string }) => recipe.id === recipeId
  )!;

  const [directions, setDirections] = useState<Direction[]>([
    { id: nanoid(), direction: "" },
  ]);

  const handleChange = () => {};

  //add directions
  const handleAddDirection = () => {
    let newDirections = [...directions];
    newDirections = [...newDirections, { id: nanoid(), direction: "" }];
    setDirections(newDirections);
  };

  //delete directions
  const handleDeleteDirection = (id: string) => {
    let newDirections = [...directions];
    newDirections = newDirections.filter((i) => i.id !== id);
    setDirections(newDirections);
  };

  const handleNext = () => {};

  return (
    <Container>
      <Header title={thisRecipe.name} subtitle={thisRecipe.desc} />
      <Header variant="small" title="Directions" />
      <Section gap="1rem">
        {directions.map((item, idx) => (
          <Flex key={idx}>
            <span>{idx + 1}</span>
            <Input
              name="direction"
              onChange={handleChange}
              value={item.direction}
            />
            {idx !== 0 && (
              <div onClick={() => handleDeleteDirection(item.id!)}>delete</div>
            )}
          </Flex>
        ))}
        <LinkButton label="add" handleClick={handleAddDirection} />
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

export default AddDirections;
