import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//comp
import { neutral, ratio } from "./token";
import { Coffee } from "../assets/Icons";

interface Props {
  imgUrl?: any;
  ratio?: string;
}
const ImageContainer: FC<Props> = ({ imgUrl }) => {
  return (
    <>
      {imgUrl && imgUrl ? (
        <Container>
          <img src={imgUrl} alt="" />
        </Container>
      ) : (
        <Container>
          <Coffee width="24" height="24" color="#000" stroke="1" />
        </Container>
      )}
    </>
  );
};

const Container = styled.div<Props>`
  position: relative;
  max-width: 100%;
  border: 1px solid ${neutral[100]};
  margin-bottom: 0.75rem;

  &:before {
    content: "";
    display: block;
    padding-bottom: 100%;
    width: 100%;
  }
  img {
    border: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    max-width: 100%;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default ImageContainer;
