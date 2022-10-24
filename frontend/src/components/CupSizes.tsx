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
}

export const Hot2oz: FC<Props> = () => {
  return <H2oz>CupSizes</H2oz>;
};

export const Hot5oz: FC<Props> = () => {
  return <H5oz>CupSizes</H5oz>;
};

export const Hot8oz: FC<Props> = ({ ingredients }) => {
  return (
    <H8oz>
      <LiquidContent ingredients={ingredients} />
    </H8oz>
  );
};

export const IcedBig: FC<Props> = () => {
  return <IBig>CupSizes</IBig>;
};

const Glass = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: #fff;
  border: 2px solid transparent;
  border-radius: 3px;
  box-shadow: 0 0 0 4px ${primaryColor.salmon};
  overflow: hidden;
`;

const IBig = styled(Glass)`
  width: 60px;
  height: 100%;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  /* transform: perspective(200px) rotateX(-10deg); */
`;

const H8oz = styled(Glass)`
  width: 95px;
  height: 75px;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
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
