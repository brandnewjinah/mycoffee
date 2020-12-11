import React, { useState } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import { Section } from "../../components/Section";

//import styles
import styled from "styled-components";
import { Heart } from "../../assets/Icons";

const DetailPresenter = (props) => {
  console.log(props);
  return (
    <Container>
      <Content>
        <Header>
          <ImageContainer>
            <Image
              src={
                props.image
                  ? props.image
                  : "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg"
              }
            />
          </ImageContainer>
          <Data>
            <Subtitle>{props.roaster && props.roaster}</Subtitle>
            <Title>{props.name && props.name}</Title>
            <p>{props.description && props.description}</p>
          </Data>
        </Header>
      </Content>
    </Container>
  );
};

DetailPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  result: PropTypes.object,
  resultError: PropTypes.string,
  similar: PropTypes.array,
  similarError: PropTypes.string,
};

const Container = styled.div`
  /* margin: 6em auto; */
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Content = styled.div`
  margin: 6em auto;
  width: 100%;
  max-width: 1260px;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
  transition: opacity 0.1s linear;
`;

const ImageContainer = styled.div`
  width: 45%;
  position: relative;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 4em;
`;

const Title = styled.h3`
  font-size: 2rem;
`;

const Subtitle = styled.h4`
  font-size: 1rem;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span`
  font-size: 16px;

  a {
    &:not(:last-child):after {
      content: ", ";
    }
  }
`;

const Part = styled.div`
  font-size: 16px;
  margin: 1.5em 0;
`;

const Rate = styled.span`
  display: flex;
  margin: 2em 0;
  div {
    margin-right: 1em;
    padding: 1em;
    cursor: pointer;
    background-color: #999999;
    border-radius: 100%;
    display: flex;
  }
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 15px;
  opacity: 0.8;
  line-height: 1.5;
`;

const Keywords = styled.div`
  margin: 2em 0;

  h6 {
    font-size: 1.125rem;
  }

  span {
    display: inline-block;
    background-color: #eee;
    padding: 0.3rem 0.75rem 0.3rem 0.75rem;
    border-radius: 1em;
    margin: 0.5em;

    &:first-child {
      margin-left: 0;
    }
  }
`;

export default DetailPresenter;
