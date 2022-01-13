import React, { FC, MouseEvent } from "react";
import styled from "styled-components";
import { fontSize, neutral } from "./token";

interface Props {
  label?: string;
  variant?: "primary" | "secondary" | "tertiary";
  color?: string;
  handleClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const Button: FC<Props> = ({ label, variant, color, handleClick }) => {
  return (
    <Container onClick={handleClick} variant={variant} color={color}>
      {label}
    </Container>
  );
};

const Container = styled.button<Props>`
  width: ${(props) => (props.variant === "tertiary" ? "auto" : "100%")};
  border: none;
  border-radius: ${(props) => (props.variant === "tertiary" ? 0 : "2rem")};
  border-bottom: ${(props) =>
    props.variant === "tertiary" && `1px solid ${neutral[200]}`};
  background-color: ${(props) =>
    props.variant === "primary" ? props.color : "transparent"};
  font-size: ${fontSize.base};
  font-weight: 600;
  color: ${(props) =>
    props.variant === "primary"
      ? "#fff"
      : props.variant === "secondary"
      ? props.color
      : neutral[200]};
  padding: ${(props) => (props.variant === "tertiary" ? "auto" : "1rem 0")};
  cursor: pointer;

  &:hover {
    border-bottom: ${(props) =>
      props.variant === "tertiary" && `1px solid ${neutral[300]}`};
    color: ${(props) => props.variant === "tertiary" && neutral[300]};
  }
`;
