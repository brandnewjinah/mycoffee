import React, { useEffect, FC } from "react";
import styled from "styled-components";
import { size } from "../token";

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
  max-width: ${size.xlg};
  margin: -4rem auto 0;
`;

export default Layout;
