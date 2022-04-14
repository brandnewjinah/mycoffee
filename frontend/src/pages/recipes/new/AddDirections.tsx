import React, { useState, ChangeEvent } from "react";
import { useParams, useHistory } from "react-router-dom";
import { nanoid } from "nanoid";

//comp
import { Container, Flex } from "../../../components/container/Container";
import Header from "../../../components/Header";
import { Section } from "../../../components/container/Section";
import { Input } from "../../../components/Input";
import { Button, LinkButton } from "../../../components/Buttons";
import { primaryColor } from "../../../components/token";

//redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { addDirections } from "../../../redux/recipeRedux";
import { Recipe } from "../../../interfaces/interface";

const AddDirections = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  //get this recipe
  const { recipeId } = useParams<{ recipeId: string }>();
  const thisRecipe: Recipe = useSelector(
    (state: RootState) => state.recipe.recipe
  );

  //directions data
  const [directions, setDirections] = useState([
    { id: nanoid(), direction: "" },
  ]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    //find current item
    let newDirections = [...directions];
    let itemIndex = newDirections.findIndex((item) => item.id === id);
    let thisItem = newDirections[itemIndex];

    thisItem.direction = e.target.value;

    newDirections[itemIndex] = thisItem;
    setDirections(newDirections);
  };

  const handleDeleteDirection = (id: string) => {
    let newDirections = [...directions];
    newDirections = newDirections.filter((i) => i.id !== id);
    setDirections(newDirections);
  };

  const handleAddDirection = () => {
    let newDirections = [...directions];
    newDirections = [...newDirections, { id: nanoid(), direction: "" }];
    setDirections(newDirections);
  };

  const handleNext = () => {
    if (directions.length === 1 && directions[0].direction === "") return;

    dispatch(addDirections(directions));
    history.push(`/recipes/new/${recipeId}/ratio`);
  };

  return (
    <Container gap="2.5rem">
      <Header title={thisRecipe.name} subtitle={thisRecipe.desc} />
      <Section gap="1rem">
        {directions.map((item, idx) => (
          <Flex key={idx}>
            <span>{idx + 1}</span>
            <Input
              name="direction"
              value={item.direction}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInput(e, item.id!)
              }
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

export default AddDirections;
