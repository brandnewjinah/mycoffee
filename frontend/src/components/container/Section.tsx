import React, { FC } from "react";
import styled from "styled-components";

interface Props {
  backgroundColor?: string;
  image?: string;
  imageText?: string;
  image2Text?: string;
  image2?: string;
  gap?: string;
  children?: any;
  text?: React.ReactNode;
}

export const Section: FC<Props> = ({
  backgroundColor,
  image,
  imageText,
  image2Text,
  image2,
  children,
  gap,
  text,
}) => {
  return (
    <Wrapper gap={gap} backgroundColor={backgroundColor}>
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
  background-color: ${(props) =>
    props.backgroundColor && props.backgroundColor};
  gap: ${(props) => props.gap && props.gap};
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

export const Article: FC<Props> = ({ children, gap }) => {
  return <ArticleWrapper gap={gap}>{children}</ArticleWrapper>;
};

const ArticleWrapper = styled.article<Props>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap && props.gap};
`;
