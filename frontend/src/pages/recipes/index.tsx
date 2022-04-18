import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

//import components
import { Header } from "../../components/Header";
import { Grid } from "../../components/container/Grid";
import { DiagramCard } from "../../components/Cards2";
import { EmptyCard, Card } from "../../components/Card";
import { Section } from "../../components/Section";
import { Button } from "../../components/Buttons";
import { primaryColor, ratio } from "../../components/token";
import { Plus } from "../../assets/Icons";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../redux/recipeRedux";
import { RootState } from "../../redux/store";
import { Recipes } from "../../interfaces/interface";

const RecipesPresenter = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getRecipes(currentPage));
  }, [dispatch, currentPage]);

  const recipeList: Recipes = useSelector(
    (state: RootState) => state.recipe.recipes
  );

  const handleNew = () => {
    history.push("/recipes/new");
  };

  return (
    <Wrapper>
      <Header title="Recipes" />
      <Grid>
        {recipeList &&
          recipeList.data &&
          recipeList.data.map((recipe, idx) => (
            <Cardd>
              <DiagramCard
                linkToRecipe={`../recipe/${recipe._id}`}
                overline={recipe.type}
                header={recipe.name}
                caption="caption"
                ratio={ratio.square}
                ratioData={recipe.ratio}
                margin="0 0 1rem 0"
              />
            </Cardd>
          ))}
      </Grid>
      {/* <Collection>
        <Section>
          <EmptyCard label="Add my recipe" path="/recipes/add" />
          {props.recipes &&
            props.recipes.map((p, idx) => (
              <Card
                key={idx}
                id={p.id}
                imageUrl={p.image}
                roaster={p.roaster}
                name={p.name}
                toRecipe={true}
              />
            ))}
        </Section>
      </Collection> */}

      <>
        <Empty>
          <Header
            variant="small"
            title="No recipes yet"
            subtitle="Start adding your drink recipes into collections"
          />
          <Button
            label="Add Recipe"
            variant="primary"
            color={primaryColor.blue}
            icon={<Plus width="20" height="20" color="#fff" stroke="2" />}
            handleClick={handleNew}
          />
        </Empty>
      </>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  margin: 3em auto;

  @media (max-width: 980px) {
    margin: 1em auto;
  }
`;

const Empty = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 300px;
`;

const Cardd = styled.div`
  /* background-color: aliceblue; */
`;

export default RecipesPresenter;
