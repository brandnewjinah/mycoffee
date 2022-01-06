import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface Props {
  link?: string;
  date?: string;
  crema?: number;
  aroma?: number;
  body?: number;
  flavor?: number;
}

export const List: FC<Props> = ({ link, date, crema, aroma, body, flavor }) => {
  return (
    <Link to={`${link}`}>
      <Wrapper>
        <div>{date}</div>
        <div>
          <p>Crema</p>
          <p>{crema}</p>
        </div>
        <div>
          <p>Aroma</p>
          <p>{aroma}</p>
        </div>
        <div>
          <p>Body</p>
          <p>{body}</p>
        </div>
        <div>
          <p>Flavor</p>
          <p>{flavor}</p>
        </div>
      </Wrapper>
    </Link>
  );
};

const Wrapper = styled.div``;
