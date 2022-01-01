import React, { FC } from "react";
import styled from "styled-components";

//comp
import Text from "./Text";

export interface Props {
  title: string;
  subtitle?: string;
}

const Header: FC<Props> = ({ title, subtitle }) => {
  return (
    <Wrapper>
      <Text type="h1">{title}</Text>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  text-align: center;
  padding: 1rem 0;
`;

export default Header;
