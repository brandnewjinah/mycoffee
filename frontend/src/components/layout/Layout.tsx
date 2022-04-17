import React, { FC } from "react";
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

  .flex {
    display: flex;
    align-items: center;
  }

  .flexOne {
    flex: 1;
  }

  .flexTwo {
    flex: 2;
  }

  .flexThree {
    flex: 3;
  }

  .flexFour {
    flex: 4;
  }
`;

const Main = styled.main`
  width: 100%;
  max-width: ${size.xlg};
  padding: 2rem 1.3125rem;
  margin: 0 auto;
`;

export default Layout;
