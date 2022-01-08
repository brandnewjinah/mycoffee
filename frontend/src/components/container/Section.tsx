import React, { FC } from "react";
import styled from "styled-components";

import Text from "../Text";
import { neutral, fontSize } from "../token";

interface Props {
  image?: string;
  imageText?: string;
  image2Text?: string;
  image2?: string;
  children?: any;
  text?: React.ReactNode;
}

export const Section: FC<Props> = ({
  image,
  imageText,
  image2Text,
  image2,
  children,

  text,
}) => {
  return (
    <Wrapper>
      {text && <>{text}</>}
      {image && (
        <ImageContainer>
          <img src={image} />
          {imageText && <p>{imageText}</p>}
        </ImageContainer>
      )}
      {image2 && (
        <ImageContainer>
          <img src={image2} />
          {image2Text && <p>{image2Text}</p>}
        </ImageContainer>
      )}
      <>{children}</>
    </Wrapper>
  );
};

const Wrapper = styled.section<Props>`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 0 1rem;
`;

const ImageContainer = styled.div`
  margin: 2rem 0 2.5rem;

  img {
    width: 100%;
    object-fit: cover;
  }

  p {
    margin-top: 1rem;
  }
`;
