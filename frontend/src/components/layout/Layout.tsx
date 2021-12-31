import React, { useEffect, useState, FC } from "react";
import styled from "styled-components";

//comp
import Header from "./Header";

export interface Props {
  children?: any;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <Container>
      <Header />
      <Main>{children}</Main>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
`;

const Main = styled.main`
  width: 100%;
  max-width: 1040px;
  padding: 2rem;
  margin: 0 auto;
`;

export default Layout;
