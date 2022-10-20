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
        <Text variant="caption" color={primaryColor.orange}>
          {overlay}
        </Text>
      )}
      {variant && variant === "small" ? (
        <Text variant="body_small" bold spacing=".025rem">
          {title}
        </Text>
      ) : (
        <Text variant="h1" padding="0 0 .65rem">
          {title}
        </Text>
      )}
      {subtitle && (
        <Text variant="body_small" color={neutral[400]} padding="0 0 .65rem">
          {subtitle}
        </Text>
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
