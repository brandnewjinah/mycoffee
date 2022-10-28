import React, { FC, MouseEvent } from "react";
import styled from "styled-components";

//comp
import { Plus } from "../assets/Icons";
import { fontSize, neutral, primaryColor } from "./token";

interface Props {
  label?: string;
  variant?: "primary" | "secondary" | "tertiary";
  fullWidth?: boolean;
  addIcon?: boolean;
  size?: "small" | undefined;
  margin?: string;
  handleClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const Button: FC<Props> = ({
  label,
  variant,
  fullWidth,
  addIcon,
  size,
  margin,
  handleClick,
}) => {
  return (
    <Container
      variant={variant}
      fullWidth={fullWidth}
      size={size}
      margin={margin}
      onClick={handleClick}
    >
      {addIcon && (
        <Plus width="12" height="12" color={primaryColor.brickRed} stroke="3" />
      )}

      {label}
    </Container>
  );
};

const Container = styled.button<Props>`
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  height: auto;
  background-color: ${(props) =>
    props.variant === "secondary" ? "transparent" : primaryColor.brickRed};
  display: inline-block;
  justify-content: center;
  align-items: center;
  gap: 0.35rem;
  font-size: ${(props) =>
    props.size === "small" ? fontSize.sm3 : fontSize.sm1};
  font-weight: 700;
  color: ${(props) =>
    props.variant === "primary" ? "#fff" : primaryColor.brickRed};
  border-style: solid;
  border-width: 1px;
  border-color: ${(props) =>
    props.variant === "secondary" ? neutral[200] : "transparent"};
  border-radius: ${(props) => (props.variant === "tertiary" ? 0 : "2rem")};
  padding: ${(props) => (props.size === "small" ? ".5rem 1rem" : "1rem 2rem")};
  margin: ${(props) => props.margin && props.margin};
  cursor: pointer;

  &:hover {
    border-bottom: ${(props) =>
      props.variant === "tertiary" && `1px solid ${neutral[300]}`};
    color: ${(props) => props.variant === "tertiary" && neutral[300]};
  }
`;

export const LinkButton: FC<Props> = ({ label, size, margin, handleClick }) => {
  return (
    <LinkContainer onClick={handleClick} size={size} margin={margin}>
      {label}
    </LinkContainer>
  );
};

const LinkContainer = styled.button<Props>`
  position: relative;
  width: fit-content;
  background-color: transparent;
  border: none;
  font-size: ${fontSize.sm2};
  font-weight: 600;
  line-height: 1.5rem;
  color: ${primaryColor.brickRed};
  margin: ${(props) => props.margin && props.margin};

  &::after {
    content: "";
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    border-bottom: 2px solid ${primaryColor.brickRed};
  }
`;
