import React from "react";
import { useParams } from "react-router-dom";

//comp
import { Container } from "../../../components/container/Container";
import Header from "../../../components/Header";

//redux
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Recipe } from "../../../interfaces/interface";
import { Section } from "../../../components/container/Section";

const AddRatio = () => {
  //get this recipe
  const { recipeId } = useParams<{ recipeId: string }>();
  const thisRecipe: Recipe = useSelector(
    (state: RootState) => state.recipe.recipe
  );

  return (
    <Container gap="2.5rem">
      <Header title={thisRecipe.name} subtitle={thisRecipe.desc} />
      <Section gap="1rem"></Section>
    </Container>
  );
};

export default AddRatio;
