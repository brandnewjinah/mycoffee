import React, { FC } from "react";

//import styles and assets
import styled from "styled-components";
import { breakpoint } from "../token";

export interface Props {
  children: any;
}

export const Grid: FC<Props> = ({ children }) => {
  return <GridWrapper>{children}</GridWrapper>;
};

const GridWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 2rem;

  @media ${breakpoint.xlg} {
  }

  @media ${breakpoint.lg} {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;
  }

  @media ${breakpoint.m} {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1.3125rem;
  }
`;
