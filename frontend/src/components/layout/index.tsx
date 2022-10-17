import React, { FC } from "react";
import styled from "styled-components";

//comp
import { Wrapper } from "../container/Div";
import Header from "./Header";
import { size, primaryColor } from "../token";

export interface Props {
  children?: any;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <Wrapper bgColor={primaryColor.ivory} minHeight="100vh">
      <Header />
      <Main>{children}</Main>
    </Wrapper>
  );
};

const Main = styled.main`
  width: 100%;
  max-width: ${size.lg};
  min-height: calc(100vh - 60px);
  padding: 2rem 1.3125rem;
  margin: 0 auto;
`;

export default Layout;
