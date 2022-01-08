import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { neutral, primaryColor } from "./token";

//comp
import Text from "./Text";
import { Coffee } from "../assets/Icons";

interface Props {
  link?: string;
  imageUrl?: string;
  overline?: string;
  header?: string;
  caption?: string;
  margin?: string;
}

export const Card: FC<Props> = ({
  link,
  imageUrl,
  overline,
  header,
  caption,
  margin,
}) => {
  return (
    <Link to={`${link}`}>
      <Wrapper margin={margin}>
        <ImageContainer>
          {imageUrl ? (
            <img src={imageUrl} />
          ) : (
            <Coffee width="24" height="24" color="#000" stroke="1" />
          )}
        </ImageContainer>
        <Text type="caption" color={primaryColor.orange}>
          {overline}
        </Text>
        <Text type="body">{header}</Text>
        <Text type="caption" color={neutral[300]}>
          {caption}
        </Text>
      </Wrapper>
    </Link>
  );
};

const Wrapper = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${neutral[100]};
  padding: 1rem;
  margin: ${(props) => (props.margin ? props.margin : 0)};
`;

const ImageContainer = styled.div`
  position: relative;

  img {
    width: 100%;
    height: 170px;
    object-fit: cover;
    transition: opacity 0.1s linear;
  }
`;
