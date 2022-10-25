import React, { FC } from "react";
import styled from "styled-components";

interface Ingredient {
  id: number;
  value: string;
  label: string;
  volume: number;
}

interface Props {
  type?: string;
  volume?: string;
  ingredients?: Array<Ingredient>;
  pathIsRecipe?: boolean;
}

const LiquidContent: FC<Props> = ({ ingredients, pathIsRecipe }) => {
  return (
    <>
      {ingredients &&
        ingredients.map((item) => (
          <Liquid
            pathIsRecipe={pathIsRecipe}
            key={item.id}
            type={item.value}
            volume={
              item.value === "espresso" && !pathIsRecipe
                ? `${(item.volume / 150) * 100 + 15}%`
                : item.value === "espresso" && pathIsRecipe
                ? `${(item.volume / 150) * 100 + 10}%`
                : `${(item.volume / 150) * 100}%`
            }
          >
            {pathIsRecipe && item.label}
          </Liquid>
        ))}
    </>
  );
};

const Liquid = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => (props.pathIsRecipe ? "0.675rem" : "0.6rem")};
  color: ${(props) => (props.type === "espresso" ? "#fff" : "#000")};
  border-top: ${(props) => props.type === "espresso" && "3px solid #ba6324"};
  height: ${(props) => props.volume && props.volume};
  background-color: ${(props) =>
    props.type === "espresso"
      ? "#593431"
      : props.type === "steamedMilk"
      ? "#f8f6f0"
      : props.type === "milkFoam"
      ? "#e6e8dc"
      : props.type === "microFoam"
      ? "#FDFFF6"
      : props.type === "water"
      ? "#d4f1f9"
      : ""};
  background-image: ${(props) =>
      props.type === "microFoam" &&
      "radial-gradient(#eaebe1 10%, transparent 11%)"},
    ${(props) =>
      props.type === "microFoam" &&
      "radial-gradient(#eaebe1 10%, transparent 11%)"};
  background-size: 14px 14px;
  background-position: 0 0, 7px 7px;
  background-repeat: repeat;
`;

export default LiquidContent;
