import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

//import components
import Header from "../../components/Header";
import { EmptyCard, Card } from "../../components/Card";
import { Section } from "../../components/Section";
import { Button } from "../../components/Buttons";
import { primaryColor } from "../../components/token";
import { Plus } from "../../assets/Icons";

const RecipesPresenter = () => {
  const history = useHistory();

  const handleNew = () => {
    history.push("/recipes/new");
  };

  return (
    <Wrapper>
      {/* <Header title="My Recipes" /> */}

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

export default RecipesPresenter;
