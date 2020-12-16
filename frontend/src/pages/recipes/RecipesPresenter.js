import React from "react";

//import components
import { EmptyCard, Card } from "../../components/Card";
import { Section } from "../../components/Section";
import { BtnText } from "../../components/Button";

//redux
import { connect } from "react-redux";
import { resetCoffee } from "../../reducers/collectionReducer";

//import styles and assets
import styled from "styled-components";

const RecipesPresenter = (props) => {
  const handleReset = () => {
    props.resetCoffee(1);
  };
  return (
    <Wrapper>
      <Header>
        <h2>My Drinks</h2>
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
      <BtnText label="Delete All" handleClick={handleReset} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  margin: 3em auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  h2 {
    font-size: 2.8rem;
    font-weight: 500;
  }
`;

const Collection = styled.div`
  width: 100%;
  margin: 3em auto;
`;

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.recipes,
  };
};

export default connect(mapStateToProps, { resetCoffee })(RecipesPresenter);
