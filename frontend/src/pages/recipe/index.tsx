import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

//comp
import { Container, Flex } from "../../components/container/Container";
import { Section } from "../../components/container/Section";
import { Header } from "../../components/Header";
import Cup from "../../components/Cup";
import Text from "../../components/Text";
import Loading from "../../components/Loading";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetails } from "../../redux/recipeRedux";
import { RootState } from "../../redux/store";
import { ListItem, Ul } from "../../components/Lists";

const Recipe = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  //get this recipe data
  useEffect(() => {
    dispatch(getRecipeDetails(id));
  }, [dispatch, id]);

  const { recipeDetails, isLoading } = useSelector(
    (state: RootState) => state.recipe
  );

  return isLoading ? (
    <Loading />
  ) : (
    <Container gap="1.5rem">
      <Header title={recipeDetails.name} />
      <Section>
        <Cup data={recipeDetails.ratio} />
      </Section>
      <Section>
        <Header variant="small" title="ingredients" underline />
        <Ul>
          {recipeDetails &&
            recipeDetails.ingredients.map((ing, idx) => (
              <ListItem>{`${ing.value}${ing.unit} ${ing.ingredient}`}</ListItem>
            ))}
        </Ul>
      </Section>
      <Section>
        <Header variant="small" title="directions" underline />
        {recipeDetails &&
          recipeDetails.directions.map((dir, idx) => (
            <Flex alignItems="flex-start">
              <Text variant="body_xsmall" className="flexOne">
                {`${(idx + 1).toString()}.`}
              </Text>
              <Text variant="body_xsmall" className="flexTen">
                {dir.direction}
              </Text>
            </Flex>
          ))}
      </Section>
    </Container>
  );
};

export default Recipe;
