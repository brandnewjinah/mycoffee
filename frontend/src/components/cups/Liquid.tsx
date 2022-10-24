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
}

const LiquidContent: FC<Props> = ({ ingredients }) => {
  return (
    <>
      {ingredients &&
        ingredients.map((item, idx) => (
          <Liquid
            key={item.id}
            type={item.value}
            volume={
              item.value === "espresso"
                ? `${(item.volume / 150) * 100 + 10}%`
                : `${(item.volume / 150) * 100}%`
            }
          />
        ))}
    </>
  );
};

const Liquid = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.type === "espresso" ? "#fff" : "#000")};
  border-top: ${(props) => props.type === "espresso" && "3px solid #ba6324"};
  height: ${(props) => props.volume && props.volume};
  background-color: ${(props) =>
    props.type === "espresso"
      ? "#593431"
      : props.type === "steamedMilk"
      ? "#fdfff5"
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
