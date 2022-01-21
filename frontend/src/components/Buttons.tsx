import React, { FC, MouseEvent } from "react";
import styled from "styled-components";
import { BooleanLiteral } from "typescript";
import { fontSize, neutral } from "./token";

interface Props {
  label?: string;
  variant?: "primary" | "secondary" | "tertiary";
  fullWidth?: boolean;
  color?: string;
  bgColor?: string;
  icon?: any;
  small?: boolean;
  handleClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const Button: FC<Props> = ({
  label,
  variant,
  fullWidth,
  color,
  bgColor,
  icon,
  small,
  handleClick,
}) => {
  return (
    <Container
      onClick={handleClick}
      variant={variant}
      fullWidth={fullWidth}
      bgColor={bgColor}
      color={color}
      small={small}
    >
      {icon && icon}
      {label}
    </Container>
  );
};

const Container = styled.button<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.35rem;
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  height: auto;
  border: none;
  border-radius: ${(props) => (props.variant === "tertiary" ? 0 : "2rem")};
  background-color: ${(props) =>
    props.variant === "primary"
      ? props.color
      : props.variant === "secondary"
      ? props.bgColor
      : "transparent"};
  font-size: ${(props) => (props.small ? fontSize.sm2 : fontSize.base)};
  font-weight: 600;
  color: ${(props) => (props.variant === "primary" ? "#fff" : props.color)};
  padding: ${(props) =>
    props.variant === "tertiary"
      ? "auto"
      : props.small
      ? ".65rem 1rem"
      : "1rem 2rem"};
  cursor: pointer;

  &:hover {
    border-bottom: ${(props) =>
      props.variant === "tertiary" && `1px solid ${neutral[300]}`};
    color: ${(props) => props.variant === "tertiary" && neutral[300]};
  }
`;

export const LinkButton: FC<Props> = ({ label, color, small, handleClick }) => {
  return (
    <LinkContainer onClick={handleClick} color={color} small={small}>
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
  color: ${(props) => props.color};

  &::after {
    content: "";
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    border-bottom: 2px solid ${(props) => props.color};
  }
`;
