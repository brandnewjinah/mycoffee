import React, { FC } from "react";
import styled from "styled-components";

//comp
import { Heading, Body } from "./Text";
import { Button } from "./Buttons";
import { breakpoint, neutral, primaryColor } from "./token";

export interface Props {
  title?: string;
  variant?: "small";
  subtitle?: string;
  overlay?: string;
  button?: boolean;
  addIcon?: boolean;
  btnLabel?: string;
  underline?: boolean;
  handleClick?: () => void;
  children?: any;
}

export const Header: FC<Props> = ({
  overlay,
  title,
  variant,
  subtitle,
  button,
  addIcon,
  btnLabel,
  underline,
  handleClick,
  children,
}) => {
  return (
    <Wrapper underline={underline}>
      {overlay && (
        <Body variant="caption" color={primaryColor.orange}>
          {overlay}
        </Body>
      )}
      {variant && variant === "small" ? (
        <Body
          variant="body_xsmall"
          bold
          uppercase
          spacing=".025rem"
          padding="1rem 0"
        >
          {title}
        </Body>
      ) : (
        <Heading padding="0 0 .65rem">{title}</Heading>
      )}
      {subtitle && (
        <Body variant="body_small" color={neutral[400]} padding="0 0 .65rem">
          {subtitle}
        </Body>
      )}
      {children && children}
      {button && (
        <Button
          label={btnLabel}
          variant="secondary"
          size="small"
          addIcon={addIcon}
          handleClick={handleClick}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.header<Props>`
  margin: 0 auto;
  text-align: center;
  border-bottom: ${(props) => props.underline && "1px solid ${neutral[200]"};

  button {
    margin: 0 auto;
  }

  @media ${breakpoint.m} {
    width: 100%;
    padding: 0 2rem;
  }
`;
