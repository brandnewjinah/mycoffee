import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

//comp
import { Container, Flex } from "../../components/container/Container";
import { Section } from "../../components/container/Section";
import Cup from "../../components/Cup";
import Text from "../../components/Text";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetails } from "../../redux/recipeRedux";
import { Header } from "../../components/Header";
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
      <Section>
        <Header variant="small" title="ingredients" />
        {recipeDetails &&
          recipeDetails.ingredients.map((ing, idx) => (
            <Flex>
              <Text
                variant="body_small"
                className="flexOne"
              >{`${ing.value} ${ing.unit}`}</Text>
              <Text variant="body_small" className="flexThree">
                {ing.ingredient}
              </Text>
            </Flex>
          ))}
      </Section>
      <Section>
        <Header variant="small" title="directions" />
        {recipeDetails &&
          recipeDetails.directions.map((dir, idx) => (
            <Flex>
              <Text variant="body_small" className="flexOne">
                {`${(idx + 1).toString()}.`}
              </Text>
              <Text variant="body_small" className="flexNine">
                {dir.direction}
              </Text>
            </Flex>
          ))}
      </Section>
    </Container>
  );
};

export default Recipe;
