import React, { FC, MouseEvent } from "react";
import styled from "styled-components";
import { fontSize, neutral } from "./token";

interface Props {
  label?: string;
  variant?: "primary" | "secondary" | "tertiary";
  fullWidth?: boolean;
  color?: string;
  icon?: any;
  handleClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const Button: FC<Props> = ({
  label,
  variant,
  fullWidth,
  color,
  icon,
  handleClick,
}) => {
  return (
    <Container
      onClick={handleClick}
      variant={variant}
      fullWidth={fullWidth}
      color={color}
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
  border: none;
  border-radius: ${(props) => (props.variant === "tertiary" ? 0 : "2rem")};
  border-bottom: ${(props) =>
    props.variant === "tertiary" && `1px solid ${neutral[200]}`};
  background-color: ${(props) =>
    props.variant === "primary" ? props.color : "transparent"};
  font-size: ${fontSize.base};
  font-weight: 600;
  color: ${(props) => (props.variant === "primary" ? "#fff" : props.color)};
  padding: ${(props) => (props.variant === "tertiary" ? "auto" : "1rem 2rem")};
  cursor: pointer;

  &:hover {
    border-bottom: ${(props) =>
      props.variant === "tertiary" && `1px solid ${neutral[300]}`};
    color: ${(props) => props.variant === "tertiary" && neutral[300]};
  }
`;
