import React, { FC } from "react";
import styled from "styled-components";

//comp
import Text from "./Text";
import { neutral, primaryColor } from "./token";

export interface Props {
  title: string;
  variant?: "small";
  subtitle?: string;
  overlay?: string;
  children?: any;
}

const Header: FC<Props> = ({ overlay, title, variant, subtitle, children }) => {
  return (
    <Wrapper>
      {overlay && (
        <Text variant="caption" color={primaryColor.orange}>
          {overlay}
        </Text>
      )}
      {variant && variant === "small" ? (
        <Text bold>{title}</Text>
      ) : (
        <Text variant="h1" padding=".35rem 0">
          {title}
        </Text>
      )}
      {subtitle && <Text color={neutral[400]}>{subtitle}</Text>}
      {children && children}
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* background-color: honeydew; */
`;

export default Header;
