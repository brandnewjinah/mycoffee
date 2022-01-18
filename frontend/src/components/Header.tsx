import React, { FC } from "react";
import styled from "styled-components";

//comp
import Text from "./Text";

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
      {overlay && <Text variant="caption">{overlay}</Text>}
      {variant && variant === "small" ? (
        <Text bold>{title}</Text>
      ) : (
        <Text variant="h1">{title}</Text>
      )}

      {subtitle && <Text>{subtitle}</Text>}
      {children && children}
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
`;

export default Header;
