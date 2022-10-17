import React, { FC } from "react";
import styled from "styled-components";

interface Props {
  backgroundColor?: string;
  image?: string;
  imageText?: string;
  image2Text?: string;
  image2?: string;
  gap?: string;
  padding?: string;
  margin?: string;
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
  padding,
  margin,
  text,
}) => {
  return (
    <Wrapper
      gap={gap}
      padding={padding}
      margin={margin}
      backgroundColor={backgroundColor}
    >
      {text && <>{text}</>}
      {image && (
        <ImageContainer>
          <img src={image} alt="" />
          {imageText && <p>{imageText}</p>}
        </ImageContainer>
      )}
      {image2 && (
        <ImageContainer>
          <img src={image2} alt="" />
          {image2Text && <p>{image2Text}</p>}
        </ImageContainer>
      )}
      <>{children}</>
    </Wrapper>
  );
};

const Wrapper = styled.section<Props>`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props.backgroundColor && props.backgroundColor};
  gap: ${(props) => props.gap && props.gap};
  padding: ${(props) => props.padding && props.padding};
  margin: ${(props) => props.margin && props.margin};
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

export const Article: FC<Props> = ({ children, margin, gap }) => {
  return (
    <ArticleWrapper gap={gap} margin={margin}>
      {children}
    </ArticleWrapper>
  );
};

const ArticleWrapper = styled.article<Props>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap && props.gap};
  margin: ${(props) => props.margin && props.margin};
`;
