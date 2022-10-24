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

export const Hot6oz: FC<Props> = ({ ingredients }) => {
  return (
    <H6oz>
      <LiquidContent ingredients={ingredients} />
    </H6oz>
  );
};

export const Hot8oz: FC<Props> = ({ ingredients }) => {
  return (
    <H8oz>
      <LiquidContent ingredients={ingredients} />
    </H8oz>
  );
};

export const Hot12oz: FC<Props> = ({ ingredients }) => {
  return (
    <H12oz>
      <LiquidContent ingredients={ingredients} />
    </H12oz>
  );
};

export const IcedBig: FC<Props> = ({ ingredients }) => {
  return (
    <IBig>
      <LiquidContent ingredients={ingredients} />
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

const IBig = styled(Glass)`
  width: 60px;
  height: 100%;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  /* transform: perspective(200px) rotateX(-10deg); */
`;

const H12oz = styled(Glass)`
  width: 100px;
  height: 80px;
  border-bottom-left-radius: 42px;
  border-bottom-right-radius: 42px;
`;

const H8oz = styled(Glass)`
  width: 95px;
  height: 75px;
  border-bottom-left-radius: 42px;
  border-bottom-right-radius: 42px;
`;

const H6oz = styled(Glass)`
  width: 80px;
  height: 65px;
  border-bottom-left-radius: 36px;
  border-bottom-right-radius: 36px;
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
