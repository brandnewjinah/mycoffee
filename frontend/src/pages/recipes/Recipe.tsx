import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

//comp
import { Container } from "../../components/container/Div";
import { Ul } from "../../components/Lists";
import { Section } from "../../components/container/Section";
import { Header } from "../../components/Header";
import Cup from "../../components/Cup";
import Loading from "../../components/Loading";
import { ListItem, RecipeItem } from "../../components/ListItem";
import { LinkButton } from "../../components/Buttons";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetails } from "../../redux/recipeDetailsRedux";
import { RootState } from "../../redux/store";
import { deleteRecipe, reset } from "../../redux/recipeActionsRedux";

const Recipe = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  //get this recipe data
  useEffect(() => {
    dispatch(getRecipeDetails(id));
  }, [dispatch, id]);

  const { recipeDetails, isLoading } = useSelector(
    (state: RootState) => state.recipeDetails
  );

  const handleDelete = () => {
    dispatch(deleteRecipe(id));
  };

  //actions after submitting button
  const { recipeDeleted } = useSelector(
    (state: RootState) => state.recipeActions
  );

  useEffect(() => {
    if (recipeDeleted.status === 200) {
      alert("Recipe successfully deleted");
      history.push(`/recipes`);
      dispatch(reset());
    } else if (recipeDeleted.status !== 200 && recipeDeleted.status !== 0) {
      alert("error");
    }
  });

  return isLoading ? (
    <Loading />
  ) : (
    <Container gap="1.5rem">
      <Header title={recipeDetails.name} />
      <Section>
        <Cup data={recipeDetails.ratio} />
      </Section>
      <Section>
        <Header variant="small" title="Ingredients" underline />
        <Ul>
          {recipeDetails &&
            recipeDetails.ingredients.map((ing, idx) => (
              <ListItem
                key={idx}
                title={ing.ingredient}
                value={`${ing.value}${ing.unit}`}
              />
            ))}
        </Ul>
      </Section>
      <Section>
        <Header variant="small" title="Directions" underline />
        {recipeDetails &&
          recipeDetails.directions.map((dir, idx) => (
            <RecipeItem
              key={idx}
              title={`${(idx + 1).toString()}`}
              value={dir.direction}
            />
          ))}
      </Section>
      <LinkButton
        label="Delete This Recipe"
        variant="tertiary"
        handleClick={handleDelete}
      />
    </Container>
  );
};

export default Recipe;
