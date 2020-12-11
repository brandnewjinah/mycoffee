import React, { FC } from "react";
import PropTypes from "prop-types";

//import styles and assets
import styled from "styled-components";

interface Props {}

export const Section: FC<Props> = ({ children }) => {
  return (
    <Wrapper>
      <Grid>{children}</Grid>
    </Wrapper>
  );
};

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const Wrapper = styled.div`
  margin: 2em auto;
`;

const Grid = styled.div`
  margin-top: 2em;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 2em;
`;
