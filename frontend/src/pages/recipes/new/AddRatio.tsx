import React, { useState, ChangeEvent, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { nanoid } from "nanoid";

//comp
import { Flex } from "../../../components/container/Div";
import { Header } from "../../../components/Header";
import { Section } from "../../../components/container/Section";
import Select from "../../../components/Select";
import { Input } from "../../../components/Input";
import { Button, LinkButton } from "../../../components/Buttons";
import { primaryColor } from "../../../components/token";
import Text from "../../../components/Text";

//redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Recipe } from "../../../interfaces/interface";
import { addRecipe, reset } from "../../../redux/recipeActionsRedux";

//data
import { categoryList } from "../../../data/category";

const AddRatio = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  //get this recipe
  // const { recipeId } = useParams<{ recipeId: string }>();
  const thisRecipe: Recipe = useSelector(
    (state: RootState) => state.recipeActions.recipe
  );

  //ratio data
  const [ratio, setRatio] = useState([
    { id: nanoid(), ingredient: "", value: "" },
  ]);

  const handleCategory =
    (id: string) => (e: ChangeEvent<HTMLSelectElement>) => {
      //find current item
      let newRatio = [...ratio];
      let itemIndex = newRatio.findIndex((item) => item.id === id);
      let thisItem = newRatio[itemIndex];

      thisItem.ingredient = e.target.value;

      newRatio[itemIndex] = thisItem;
      setRatio(newRatio);
    };

  const handleValueChange =
    (id: string) => (e: ChangeEvent<HTMLInputElement>) => {
      //find current item
      let newRatio = [...ratio];
      let itemIndex = newRatio.findIndex((item) => item.id === id);
      let thisItem = newRatio[itemIndex];

      thisItem.value = e.target.value;

      newRatio[itemIndex] = thisItem;
      setRatio(newRatio);
    };

  const handleAddRatio = () => {
    let newRatio = [...ratio];
    newRatio = [...newRatio, { id: nanoid(), ingredient: "", value: "" }];
    setRatio(newRatio);
  };

  const handleDeleteRatio = (id: string) => {
    let newRatio = [...ratio];
    newRatio = newRatio.filter((i) => i.id !== id);
    setRatio(newRatio);
  };

  const { recipeAdded, recipe } = useSelector(
    (state: RootState) => state.recipeActions
  );

  useEffect(() => {
    if (recipeAdded) {
      alert("success");
      dispatch(reset());
      history.push(`/recipe/${recipe._id}`);
    }
  }, [recipeAdded, dispatch, history, recipe._id]);

  const handleSubmit = () => {
    //if any of the ingredient or value is missing
    const validate = ratio.every(
      (item) => item.ingredient !== "" && item.value !== ""
    );

    //add error messge to error
    if (!validate) return;

    const newRecipe = { ...thisRecipe, ratio: ratio };
    dispatch(addRecipe(newRecipe));
  };

  // const handleSkip = () => {};

  return (
    <Flex flexCol gap="2.5rem">
      <Header title={thisRecipe.name} subtitle={thisRecipe.desc} />
      <Text variant="caption">only in same unit, parts, ratio...</Text>
      <Section gap="1rem">
        {ratio.map((item, idx) => (
          <Flex key={idx}>
            <div className="flexFour">
              <Select
                key={idx}
                options={categoryList}
                selected={item.ingredient}
                onChange={handleCategory(item.id)}
                fullWidth
              />
            </div>
            <div className="flexTwo">
              <Input
                name="value"
                placeholder="value"
                onChange={handleValueChange(item.id)}
              />
            </div>
            <div className="flexHalf">
              {idx !== 0 && (
                <div onClick={() => handleDeleteRatio(item.id!)}>del</div>
              )}
            </div>
          </Flex>
        ))}
        <LinkButton label="add" handleClick={handleAddRatio} />
      </Section>
      <Button
        label="Submit"
        variant="primary"
        color={primaryColor.brickRed}
        handleClick={handleSubmit}
      />
      <Button
        label="Skip and Submit"
        variant="primary"
        color={primaryColor.brickRed}
        handleClick={handleSubmit}
      />
    </Flex>
  );
};

export default AddRatio;
