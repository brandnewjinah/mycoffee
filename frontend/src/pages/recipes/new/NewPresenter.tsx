import React, { useState, ChangeEvent, FC } from "react";
import styled from "styled-components";

//import components
import { Container } from "../../../components/container/Container";
import Header from "../../../components/Header";
import { Section } from "../../../components/container/Section";
import { Button, LinkButton } from "../../../components/Buttons";
import { primaryColor } from "../../../components/token";
import { Input } from "../../../components/Input";

//interface
import { Recipe, RecipeErrors } from "../../../interfaces/interface";

interface Props {
  page: number;
  recipe: Recipe;
  errors: RecipeErrors;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleIngredients: (e: ChangeEvent<HTMLInputElement>) => void;
  handleIngredientAdd: () => void;
  handleNext: (page: number) => void;
}

const RecipesPresenter: FC<Props> = (props) => {
  return (
    <Container gap="2.5rem">
      <Header title="New Recipe" />
      {props.page === 1 && (
        <>
          <Section gap="1.625rem">
            <Input
              name="name"
              label="Name"
              error={props.errors.name}
              onChange={props.handleInputChange}
            />
            <Input
              name="desc"
              label="Drink Description"
              error={props.errors.desc}
              onChange={props.handleInputChange}
            />
          </Section>
          <Button
            label="Next"
            variant="primary"
            color={primaryColor.blue}
            handleClick={() => props.handleNext(1)}
          />
        </>
      )}
      {props.page === 2 && (
        <>
          {props.recipe.ingredients.map((item, idx) => (
            <InputContainer key={idx}>
              <Input
                id={item.id}
                name="ingredient"
                label="Ingredient"
                value={item.ingredient}
                onChange={props.handleIngredients}
              />
            </InputContainer>
          ))}

          <LinkButton
            label="Add More"
            handleClick={props.handleIngredientAdd}
          />
        </>
      )}
    </Container>
  );
};

const InputContainer = styled.div``;

export default RecipesPresenter;
