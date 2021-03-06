import React from "react";
import PropTypes from "prop-types";

//import components
import { EmptyCard, Card } from "../../components/Card";
import { Section } from "../../components/Section";

//redux
import { connect } from "react-redux";
import { resetCoffee } from "../../reducers/collectionReducer";

//import styles and assets
import styled from "styled-components";

const RecipesPresenter = (props) => {
  return (
    <Wrapper>
      <Header>
        <h2>My Drinks</h2>
        <h4>My coffee recipes</h4>
      </Header>

      <Collection>
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
      </Collection>
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

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    font-size: 2.8rem;
    font-weight: 500;
  }

  h4 {
    font-size: 1.5rem;
    line-height: 2.8rem;
    letter-spacing: 0.125rem;
    margin: 0.75em 0;
    text-rendering: optimizeLegibility;
  }
`;

const Collection = styled.div`
  width: 100%;
  margin: 3em auto;
`;

RecipesPresenter.propTypes = {
  resetCoffee: PropTypes.func,
  recipes: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.recipes,
  };
};

export default connect(mapStateToProps, { resetCoffee })(RecipesPresenter);
