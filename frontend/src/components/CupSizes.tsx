import React, { FC } from "react";
import styled from "styled-components";
import LiquidContent from "./cups/Liquid";
import { primaryColor } from "./token";

interface Ingredient {
  id: number;
  value: string;
  label: string;
  volume: number;
}

interface Props {
  ingredients?: Array<Ingredient>;
  pathIsRecipe?: boolean;
}

export const Hot2oz: FC<Props> = ({ pathIsRecipe }) => {
  return <H2oz>CupSizes</H2oz>;
};

export const Hot5oz: FC<Props> = ({ pathIsRecipe }) => {
  return <H5oz>CupSizes</H5oz>;
};

export const Hot6oz: FC<Props> = ({ ingredients, pathIsRecipe }) => {
  return (
    <H6oz pathIsRecipe={pathIsRecipe}>
      <LiquidContent ingredients={ingredients} pathIsRecipe={pathIsRecipe} />
    </H6oz>
  );
};

export const Hot8oz: FC<Props> = ({ ingredients, pathIsRecipe }) => {
  return (
    <H8oz pathIsRecipe={pathIsRecipe}>
      <LiquidContent ingredients={ingredients} pathIsRecipe={pathIsRecipe} />
    </H8oz>
  );
};

export const Hot12oz: FC<Props> = ({ ingredients, pathIsRecipe }) => {
  return (
    <H12oz pathIsRecipe={pathIsRecipe}>
      <LiquidContent ingredients={ingredients} pathIsRecipe={pathIsRecipe} />
    </H12oz>
  );
};

export const IcedBig: FC<Props> = ({ ingredients, pathIsRecipe }) => {
  return (
    <IBig pathIsRecipe={pathIsRecipe}>
      <LiquidContent ingredients={ingredients} pathIsRecipe={pathIsRecipe} />
    </IBig>
  );
};

const Glass = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: #fff;
  border: 2px solid transparent;
  border-radius: 3px;
  /* box-shadow: 0 0 0 4px ${primaryColor.salmon}; */
  box-shadow: 0 0 0 4px #ebe9e5;
  overflow: hidden;
`;

const IBig = styled(Glass)<Props>`
  width: ${(props) => (props.pathIsRecipe ? "70px" : "60px")};
  height: 100%;
  border-bottom-left-radius: ${(props) =>
    props.pathIsRecipe ? "12px" : "10px"};
  border-bottom-right-radius: ${(props) =>
    props.pathIsRecipe ? "12px" : "10px"};
  /* transform: perspective(200px) rotateX(-10deg); */
`;

const H12oz = styled(Glass)<Props>`
  width: ${(props) => (props.pathIsRecipe ? "120px" : "100px")};
  height: ${(props) => (props.pathIsRecipe ? "95px" : "80px")};
  border-bottom-left-radius: ${(props) =>
    props.pathIsRecipe ? "52px" : "42px"};
  border-bottom-right-radius: ${(props) =>
    props.pathIsRecipe ? "52px" : "42px"};
`;

const H8oz = styled(Glass)<Props>`
  width: ${(props) => (props.pathIsRecipe ? "105px" : "95px")};
  height: ${(props) => (props.pathIsRecipe ? "85px" : "75px")};
  border-bottom-left-radius: ${(props) =>
    props.pathIsRecipe ? "48px" : "42px"};
  border-bottom-right-radius: ${(props) =>
    props.pathIsRecipe ? "48px" : "42px"};
`;

const H6oz = styled(Glass)<Props>`
  width: ${(props) => (props.pathIsRecipe ? "95px" : "80px")};
  height: ${(props) => (props.pathIsRecipe ? "75px" : "65px")};
  border-bottom-left-radius: ${(props) =>
    props.pathIsRecipe ? "42px" : "36px"};
  border-bottom-right-radius: ${(props) =>
    props.pathIsRecipe ? "42px" : "36px"};
`;

const H5oz = styled(Glass)`
  width: 56px;
  height: 75px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  /* transform: perspective(200px) rotateX(-20deg); */
`;

const H2oz = styled(Glass)`
  width: 65px;
  height: 59px;
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;
  /* transform: perspective(200px) rotateX(-20deg); */
`;
