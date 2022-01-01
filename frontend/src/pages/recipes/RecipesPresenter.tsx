import React from "react";
import styled from "styled-components";

//import components
import Header from "../../components/Header";
import { EmptyCard, Card } from "../../components/Card";
import { Section } from "../../components/Section";

//redux
import { connect } from "react-redux";
import { resetCoffee } from "../../reducers/collectionReducer";

const RecipesPresenter = () => {
  return (
    <Wrapper>
      <Header title="My Recipes" />

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

const Collection = styled.div`
  width: 100%;
  margin: 3em auto;
`;

// const mapStateToProps = (state) => {
//   return {
//     recipes: state.recipes.recipes,
//   };
// };

export default RecipesPresenter;
