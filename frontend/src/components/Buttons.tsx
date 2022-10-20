import React, { FC, MouseEvent } from "react";
import styled from "styled-components";
import { fontSize, neutral } from "./token";

interface Props {
  label?: string;
  variant?: "primary" | "secondary" | "tertiary";
  fullWidth?: boolean;
  color?: string;
  bgColor?: string;
  icon?: any;
  size?: "big" | "small" | undefined;
  handleClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const Button: FC<Props> = ({
  label,
  variant,
  fullWidth,
  color,
  bgColor,
  icon,
  size,
  handleClick,
}) => {
  return (
    <Container
      variant={variant}
      fullWidth={fullWidth}
      bgColor={bgColor}
      color={color}
      size={size}
      onClick={handleClick}
    >
      {icon && icon}
      {label}
    </Container>
  );
};

const Container = styled.button<Props>`
  width: ${(props) => props.fullWidth && "100%"};
  font-size: ${(props) =>
    props.size === "small" ? fontSize.sm3 : fontSize.sm1};
  font-weight: 700;
  color: ${(props) => (props.variant === "primary" ? "#fff" : props.color)};
  background-color: ${(props) =>
    props.variant === "secondary" ? "transparent" : props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.35rem;
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  height: auto;
  border-style: solid;
  border-width: 1px;
  border-color: ${(props) =>
    props.variant === "secondary" ? neutral[200] : "transparent"};
  border-radius: ${(props) => (props.variant === "tertiary" ? 0 : "2rem")};
  padding: ${(props) => (props.size === "small" ? ".65rem 1rem" : "1rem 2rem")};
  cursor: pointer;

  &:hover {
    border-bottom: ${(props) =>
      props.variant === "tertiary" && `1px solid ${neutral[300]}`};
    color: ${(props) => props.variant === "tertiary" && neutral[300]};
  }
`;

export const LinkButton: FC<Props> = ({ label, color, size, handleClick }) => {
  return (
    <LinkContainer onClick={handleClick} color={color} size={size}>
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
