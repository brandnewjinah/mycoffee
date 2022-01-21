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

//data
import { unitOptions } from "../../../data/data";

//interface
import { Recipe, RecipeErrors } from "../../../interfaces/interface";
import { utimes } from "fs";
import { ListItem } from "../../../components/Lists";

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
  const [showModal, setShowModal] = useState(false);

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
            <>
              <InputContainer key={idx}>
                <div className="flexThree">
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
                    name="ingredient"
                    placeholder="Amount"
                    value={item.ingredient}
                    onChange={props.handleIngredients}
                  />
                </div>
                <div className="flexOne">
                  <button onClick={() => setShowModal(true)}>unit</button>
                </div>
              </InputContainer>
              <Modal
                header="Select Unit"
                open={showModal}
                handleClose={() => setShowModal(false)}
              >
                <div>
                  <ul>
                    {unitOptions.map((unit) => (
                      <ListItem
                        key={unit.id}
                        label={`${unit.name} (${unit.abbr})`}
                      />
                    ))}
                  </ul>
                </div>
              </Modal>
            </>
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

const InputContainer = styled.div`
  display: flex;
  gap: 0.25rem;
`;

export default RecipesPresenter;
