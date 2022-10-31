import React, { useState, ChangeEvent } from "react";
import { useParams, useHistory } from "react-router-dom";
import { nanoid } from "nanoid";

//comp
import { Flex } from "../../../components/container/Div";
import { Header } from "../../../components/Header";
import { Section } from "../../../components/container/Section";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Buttons";

//redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { addDirections } from "../../../redux/recipeActionsRedux";
import { Directions, Recipe } from "../../../interfaces/recipeInterface";

const AddDirections = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  //get this recipe
  const { recipeId } = useParams<{ recipeId: string }>();
  const thisRecipe: Recipe = useSelector(
    (state: RootState) => state.recipeActions.recipe
  );

  //directions data
  const [directions, setDirections] = useState<Directions[]>([
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
    <Flex flexCol gap="2.5rem">
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
        <Flex flexCol>
          <Button
            label="Add Row"
            variant="secondary"
            size="small"
            addIcon
            handleClick={handleAddDirection}
          />
        </Flex>
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

export default AddDirections;
