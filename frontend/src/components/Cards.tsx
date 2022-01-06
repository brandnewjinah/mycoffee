import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface Props {
  link?: string;
  overline?: string;
  name?: string;
}

export const Card: FC<Props> = ({ link, overline, name }) => {
  return (
    <Link to={`${link}`}>
      <Wrapper>
        <p>{overline}</p>
        <p>{name}</p>
      </Wrapper>
    </Link>
  );
};

const Wrapper = styled.div``;
