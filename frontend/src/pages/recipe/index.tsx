import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

//comp
import { Container } from "../../components/container/Container";
import { Section } from "../../components/container/Section";
import Cup from "../../components/Cup";
import Test from "../../components/Test";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetails } from "../../redux/recipeRedux";
import Header from "../../components/Header";
import { RootState } from "../../redux/store";

const Recipe = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  //get this recipe data
  useEffect(() => {
    dispatch(getRecipeDetails(id));
  }, [dispatch, id]);

  const { recipeDetails } = useSelector((state: RootState) => state.recipe);

  return (
    <Container gap="1.5rem">
      <Header title={recipeDetails.name} />
      <Section>
        <Cup data={recipeDetails.ratio} />
      </Section>
    </Container>
  );
};

export default Recipe;
