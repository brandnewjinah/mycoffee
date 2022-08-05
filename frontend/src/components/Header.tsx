import React, { FC } from "react";
import styled from "styled-components";

//comp
import Text from "./Text";
import { Button } from "./Buttons";
import { breakpoint, neutral, primaryColor } from "./token";

export interface Props {
  title?: string;
  variant?: "small";
  subtitle?: string;
  overlay?: string;
  button?: boolean;
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
  btnLabel,
  underline,
  handleClick,
  children,
}) => {
  return (
    <Wrapper underline={underline}>
      {overlay && (
        <Text variant="caption" color={primaryColor.orange}>
          {overlay}
        </Text>
      )}
      {variant && variant === "small" ? (
        <Text variant="body_small" bold spacing=".025rem">
          {title}
        </Text>
      ) : (
        <Text variant="h1" padding="0 0 .75rem">
          {title}
        </Text>
      )}
      {subtitle && (
        <Text variant="body_small" color={neutral[400]} padding="0 0 .75rem">
          {subtitle}
        </Text>
      )}
      {children && children}
      {button && (
        <Button
          label={btnLabel}
          variant="tertiary"
          color={primaryColor.blue}
          bgColor={primaryColor.lightBlue}
          small
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
    max-width: 250px;
  }
`;
