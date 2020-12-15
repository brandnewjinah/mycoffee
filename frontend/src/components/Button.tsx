import React, { ChangeEvent, FC } from "react";

//import styles and assets
import styled from "styled-components";
import { ArrowRight, ArrowLeft, Plus, Close } from "../assets/Icons";
import { gray } from "./Colors";

interface Props {
  label?: string;
  type?: string;
  value?: string;
  name?: string;
  imp?: string;
  direction?: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClick?: () => void;
}

export const Button: FC<Props> = ({
  label,
  type,
  value,
  name,
  imp,
  handleClick,
}) => {
  return (
    <Wrapper
      style={{ backgroundColor: imp === "primary" ? "#d46f4a" : "#f2665c" }}
      onClick={handleClick}
    >
      {label}
    </Wrapper>
  );
};

export const BtnText: FC<Props> = ({ label, handleClick }) => {
  return <Text onClick={handleClick}>{label}</Text>;
};

export const BtnArrow: FC<Props> = ({ label, direction, handleClick }) => {
  return (
    <Circle onClick={handleClick}>
      {direction === "left" ? (
        <ArrowLeft width="20" height="20" color="#fff" stroke="2" />
      ) : (
        <ArrowRight width="20" height="20" color="#fff" stroke="2" />
      )}
    </Circle>
  );
};

export const BtnAdd: FC<Props> = ({ label, direction, handleClick }) => {
  return (
    <Circle onClick={handleClick}>
      <Plus width="20" height="20" color="#000" stroke="2" />
    </Circle>
  );
};

export const BtnClose: FC<Props> = ({ label, direction, handleClick }) => {
  return (
    <CircleSmall
      onClick={handleClick}
      style={{ backgroundColor: gray.lightgray }}
    >
      <Close width="14" height="14" color={gray.darkergray} stroke="2" />
    </CircleSmall>
  );
};

const Flex = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.6;
  }
`;

const Wrapper = styled.button`
  width: 100%;
  outline: transparent;
  border: transparent;
  border-radius: 3em;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.125em;
  text-transform: uppercase;
  padding: 1.5em 3.5em;
  cursor: pointer;
  transition: opacity 0.25s linear;
`;

const Text = styled.button`
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.025rem;
  color: #54494b;
  outline: transparent;
  border: transparent;
  background-color: transparent;
  border-bottom: 1px solid #54494b;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

const Circle = styled.button`
  display: flex;
  padding: 1em;
  border-radius: 50%;
  background-color: #d46f4a;
  border: none;
  outline: transparent;
  cursor: pointer;
`;

const CircleSmall = styled(Flex)`
  padding: 3px;
  border-radius: 50%;
  border: none;
  outline: transparent;
  cursor: pointer;
`;
