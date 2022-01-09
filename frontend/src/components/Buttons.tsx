import React, { FC, MouseEvent } from "react";
import styled from "styled-components";
import { neutral } from "./token";

interface Props {
  label?: string;
  variant?: "primary" | "secondary" | "tertiary";
  handleClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const Buttons: FC<Props> = ({ label, variant, handleClick }) => {
  return (
    <Container onClick={handleClick} variant={variant}>
      {label}
    </Container>
  );
};

const Container = styled.button<Props>`
  border: ${(props) => props.variant === "tertiary" && "none"};
  border-bottom: ${(props) =>
    props.variant === "tertiary" && `1px solid ${neutral[200]}`};
  background-color: ${(props) => props.variant === "tertiary" && "transparent"};
  color: ${(props) => props.variant === "tertiary" && neutral[200]};
  cursor: pointer;

  &:hover {
    border-bottom: ${(props) =>
      props.variant === "tertiary" && `1px solid ${neutral[300]}`};
    color: ${(props) => props.variant === "tertiary" && neutral[300]};
  }
`;
