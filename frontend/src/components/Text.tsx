import React, { FC } from "react";
import styled, { css } from "styled-components";

interface Props {
  type?: "heading" | "body" | undefined;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "body_large"
    | "body_small"
    | "body_xsmall"
    | "caption"
    | undefined;
  bold?: boolean;
  uppercase?: boolean;
  capitalize?: boolean;
  padding?: string;
  spacing?: string;
  color?: string;
  className?: string;
  children?: string | number | undefined;
}

export const Heading: FC<Props> = ({
  variant,
  type,
  bold,
  padding,
  uppercase,
  capitalize,
  spacing,
  color,
  children,
}) => {
  return (
    <H1 color={color} uppercase={uppercase} spacing={spacing} padding={padding}>
      {children}
    </H1>
  );
};

export const Body: FC<Props> = ({
  className,
  variant,
  bold,
  padding,
  uppercase,
  capitalize,
  spacing,
  color,
  children,
}) => {
  return (
    <P
      className={className}
      variant={variant}
      bold={bold}
      uppercase={uppercase}
      capitalize={capitalize}
      color={color}
      spacing={spacing}
      padding={padding}
    >
      {children}
    </P>
  );
};

const Basics = css<Props>`
  color: ${(props) => (props.color ? props.color : "#000")};
  text-transform: ${(props) => props.uppercase && "uppercase"};
  letter-spacing: ${(props) => props.spacing && props.spacing};
  padding: ${(props) => props.padding};
`;

const H1 = styled.h1<Props>`
  ${Basics}
  font-family: "Saira Condensed", sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
`;

const P = styled.p<Props>`
  ${Basics}
  font-size: ${(props) =>
    props.variant === "body_large"
      ? "1.125rem"
      : props.variant === "body_small"
      ? "0.9375rem"
      : props.variant === "body_xsmall"
      ? "0.75rem"
      : props.variant === "caption"
      ? "0.625rem"
      : "16px"};
  line-height: ${(props) =>
    props.variant === "body_large"
      ? "1.625rem"
      : props.variant === "body_small"
      ? "1.25rem"
      : props.variant === "body_xsmall"
      ? "1.25rem"
      : props.variant === "caption"
      ? "1.25rem"
      : "1.625rem"};
  font-weight: ${(props) => (props.bold ? 600 : 400)};
  text-transform: ${(props) =>
    props.capitalize ? "capitalize" : props.uppercase ? "uppsercase" : null};
`;
