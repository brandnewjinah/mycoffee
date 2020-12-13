import React from "react";
import { Link } from "react-router-dom";

//import styles and assets
import styled from "styled-components";
import { Plus } from "../assets/Icons";

export const EmptyCard = () => {
  return (
    <Wrapper>
      <Plus width="20" height="20" color="#000" stroke="2" />
      <h6>Add to my collection</h6>
    </Wrapper>
  );
};

export const Card = ({ imageUrl, roaster, name, roast, toDetail, id }) => {
  return (
    <Link to={toDetail && `/products/${id}`}>
      <Wrapper2>
        <ImageContainer>
          <Image
            src={
              imageUrl
                ? imageUrl
                : "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg"
            }
          />
        </ImageContainer>
        <Title>{roaster}</Title>
        <Details>
          <div>{name}</div>
          <div>{roast}</div>
        </Details>
      </Wrapper2>
    </Link>
  );
};

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const Wrapper = styled(Flex)`
  background-color: seashell;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
  margin-bottom: 1.5em;
  padding: 2em;

  h6 {
    margin-top: 1em;
  }
`;

const Wrapper2 = styled(Flex)`
  width: 100%;
  margin-bottom: 1.5em;
  flex-direction: column;
  border: 1px solid whitesmoke;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  /* min-height: 348px; */
  object-fit: contain;
  transition: opacity 0.1s linear;
  /* box-shadow: 0 2px 6px 2px rgba(0, 0, 0, 0.1); */
`;

const ImageContainer = styled.div`
  position: relative;
  &:hover {
    ${Image} {
      opacity: 0.3;
    }
  }
`;

const Title = styled.span`
  display: block;
  font-size: 1rem;
  font-weight: 500;
  margin: 0.5em 0;
`;

const Details = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    font-size: 0.75rem;
    margin: 0.25em 0;
    /* &:not(:last-child):after {
      content: " \\B7\\a0 ";
    } */
  }
`;
