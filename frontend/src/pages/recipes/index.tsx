import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

//import components
import { Flex } from "../../components/container/Div";
import { Header } from "../../components/Header";
import { Grid } from "../../components/container/Grid";
import { DiagramCard } from "../../components/DiagramCard";
import { ratio } from "../../components/token";
import Loading from "../../components/Loading";
import Empty from "../../components/EmptyPage";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../redux/recipeRedux";
import { RootState } from "../../redux/store";

const RecipesPresenter = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [currentPage, setCurrentPage] = useState(1);

  //01. get recipes API acll
  useEffect(() => {
    dispatch(getRecipes(currentPage));
  }, [dispatch, currentPage]);

  //get recipes list from redux
  const { recipes, isLoading } = useSelector(
    (state: RootState) => state.recipes
  );

  const handleNew = () => {
    history.push("/recipes/new");
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      {recipes && recipes.count > 0 ? (
        <Flex flexCol gap="2.5rem">
          <Header
            title="Recipes"
            subtitle="Add recipe to start creating collection."
            button
            addIcon
            btnLabel="Add Recipe"
            handleClick={handleNew}
          />
          <Grid>
            {recipes &&
              recipes.data &&
              recipes.data.length > 0 &&
              recipes.data.map((recipe) => (
                <DiagramCard
                  key={recipe._id}
                  linkToRecipe={`../recipe/${recipe._id}`}
                  overline={recipe.type}
                  header={recipe.name}
                  caption="caption"
                  ratio={ratio.square}
                  ratioData={recipe.ratio}
                />
              ))}
          </Grid>
        </Flex>
      ) : (
        <Empty
          title="No Recipes Yet"
          subtitle="Add a new recipe and start making your collection."
          btnLabel="Add Recipe"
          handleButtonClick={handleNew}
        />
      )}
    </>
  );
};

export default RecipesPresenter;
