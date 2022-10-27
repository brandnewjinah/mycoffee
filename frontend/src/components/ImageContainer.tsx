import React, { FC } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

//comp
import { primaryColor } from "./token";
import { Coffee } from "../assets/Icons";

interface Props {
  imgUrl?: any;
  ratio?: string;
  pathIsTools?: boolean;
}
const ImageContainer: FC<Props> = ({ imgUrl }) => {
  const location = useLocation();

  const pathIsTools = location.pathname.includes("/tool");

  return (
    <>
      {imgUrl && imgUrl ? (
        <Container pathIsTools={pathIsTools}>
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
  max-height: 70vw;
  background-color: ${(props) =>
    props.pathIsTools ? "#fff" : primaryColor.darkIvory};
  margin-bottom: 0.5rem;

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
    /* bottom: 0; */
    left: 0;
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default ImageContainer;
