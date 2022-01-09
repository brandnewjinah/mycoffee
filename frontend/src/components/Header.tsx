import React, { FC } from "react";
import styled from "styled-components";

//comp
import Text from "./Text";

export interface Props {
  title: string;
  subtitle?: string;
  overlay?: string;
}

const Header: FC<Props> = ({ overlay, title, subtitle }) => {
  return (
    <Wrapper>
      {overlay && <Text type="caption">{overlay}</Text>}
      <Text type="h1">{title}</Text>
      {subtitle && <Text>{subtitle}</Text>}
    </Wrapper>
  );
};

const Wrapper = styled.header`
  text-align: center;
  padding: 1rem 0;
`;

export default Header;
