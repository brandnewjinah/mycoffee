import React, { FC } from "react";
import styled from "styled-components";

import Text from "../Text";
import { neutral, fontSize } from "../token";

interface Props {
  title?: string;
  subtitle?: string;
  image?: string;
  imageText?: string;
  image2Text?: string;
  image2?: string;
  children?: any;
  divider?: boolean;
  text?: React.ReactNode;
}

export const Section: FC<Props> = ({
  title,
  subtitle,
  image,
  imageText,
  image2Text,
  image2,
  children,
  divider,
  text,
}) => {
  return (
    <Wrapper divider={divider}>
      {title && (
        <header>
          <Text type="h2">{title}</Text>
          {subtitle && <h3>{subtitle}</h3>}
        </header>
      )}
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
  border-bottom: ${(props) =>
    props.divider === false ? null : `1px solid ${neutral[100]}`};
  padding: 0 0 1rem;

  header {
    padding: 1rem 0;
    border-bottom: 1px solid ${neutral[300]};
    margin-bottom: 2rem;
  }
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
