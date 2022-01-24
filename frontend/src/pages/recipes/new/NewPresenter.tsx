import React, { useState, ChangeEvent, FC } from "react";
import styled from "styled-components";

//import components
import { Container } from "../../../components/container/Container";
import Header from "../../../components/Header";
import { Section } from "../../../components/container/Section";
import { Button, LinkButton } from "../../../components/Buttons";
import { primaryColor } from "../../../components/token";
import { Input } from "../../../components/Input";
import Modal from "../../../components/Modal";
import { ListItem } from "../../../components/Lists";

//data
import { unitOptions } from "../../../data/data";

//interface
import {
  Recipe,
  Ingredients,
  RecipeErrors,
} from "../../../interfaces/interface";
import { Plus } from "../../../assets/Icons";
import Chips from "../../../components/Chips";

interface Props {
  page: number;
  recipe: Recipe;
  errors: RecipeErrors;
  showModal?: boolean;
  thisIngredient: Ingredients;
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
  handleModalSelect?: (id: string, unit: string) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleIngredients: (e: ChangeEvent<HTMLInputElement>) => void;
  handleIngredientAdd: () => void;
  handleIngredientSave: () => void;
  handleUnitSelect: (unit: string) => void;
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
        <Section gap="1rem">
          <Header variant="small" title="Ingredients" />
          {props.recipe.ingredients &&
            props.recipe.ingredients.length > 0 &&
            props.recipe.ingredients.map((item, idx) => (
              <div key={idx}>{item.id}</div>
            ))}
          {/* {props.recipe.ingredients.map((item, idx) => (
            <>
              <InputContainer key={idx}>
                <div className="flexFour">
                  <Input
                    id={item.id}
                    name="ingredient"
                    placeholder="Ingredient"
                    value={item.ingredient}
                    onChange={props.handleIngredients}
                  />
                </div>
                <div className="flexOne">
                  <Input
                    id={item.id}
                    name="amount"
                    type="number"
                    placeholder="Amount"
                    value={item.amount}
                    onChange={props.handleIngredients}
                  />
                </div>
                <div className="flexOne">
                  <button onClick={() => props.setShowModal!(true)}>
                    {item.unit !== "" ? item.unit : "unit"}
                  </button>
                </div>
              </InputContainer>
              
            </>
          ))} */}
          <Add>
            <Button
              label="Add Ingredient"
              variant="primary"
              color={primaryColor.blue}
              icon={<Plus width="20" height="20" color="#fff" stroke="2" />}
              handleClick={() => props.setShowModal!(true)}
            />
          </Add>
          <Modal
            header="Add Ingredient"
            open={props.showModal!}
            handleClose={() => props.setShowModal!(false)}
          >
            <Section gap="1rem">
              <Input
                name="ingredient"
                placeholder="Ingredient"
                onChange={props.handleIngredients}
              />
              <Input
                name="value"
                placeholder="Value"
                onChange={props.handleIngredients}
              />
              <ul>
                {unitOptions.map((unit) => (
                  <Chips
                    key={unit.id}
                    label={unit.name}
                    selected={props.thisIngredient.unit === unit.name}
                    handleSelect={() => props.handleUnitSelect(unit.name)}
                  />
                ))}
              </ul>
            </Section>
            <Button
              label="Add"
              variant="primary"
              color={primaryColor.blue}
              handleClick={props.handleIngredientSave}
            />
          </Modal>
        </Section>
      )}
    </Container>
  );
};

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.25rem;

  button {
    width: 100%;
    height: 100%;
    padding: 0.25rem;
  }
`;

const Add = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

export default RecipesPresenter;
