import React, { FC } from "react";

//import styles and assets
import styled from "styled-components";
import { breakpoint } from "../token";

export interface Props {
  children: any;
}

export const Grid: FC<Props> = ({ children }) => {
  return <Section>{children}</Section>;
};

const Section = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 2rem;
  padding: 2rem 0;

  @media ${breakpoint.xlg} {
    padding: 2rem 1rem;
  }

  @media ${breakpoint.lg} {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;
  }

  @media ${breakpoint.m} {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2rem;
  }
`;
