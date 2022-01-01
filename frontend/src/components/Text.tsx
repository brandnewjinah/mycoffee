import React, { FC } from "react";
import styled from "styled-components";
import { fontSize, lineHeight, headingFontFamily } from "./token";

interface Props {
  type?: string;
  padding?: string;
  children?: string;
}

const Text: FC<Props> = ({ type, padding, children }) => {
  return (
    <>
      {type === "h1" ? (
        <Heading1 padding={padding}>{children}</Heading1>
      ) : type === "h2" ? (
        <Heading2 padding={padding}>{children}</Heading2>
      ) : type === "h3" ? (
        <Heading3 padding={padding}>{children}</Heading3>
      ) : type === "body_big" ? (
        <BigParagraph padding={padding}>{children}</BigParagraph>
      ) : (
        <Paragraph padding={padding}>{children}</Paragraph>
      )}
    </>
  );
};

const Heading1 = styled.h1<Props>`
  font-family: ${headingFontFamily};
  font-size: ${fontSize.lg5};
  font-weight: 700;
  padding: ${(props) => props.padding};
`;

const Heading2 = styled.h2<Props>`
  font-family: ${headingFontFamily};
  font-size: ${fontSize.lg5};
  font-weight: 600;
  padding: ${(props) => props.padding};
`;

const Heading3 = styled.h3<Props>`
  font-size: ${fontSize.lg2};
  font-weight: 500;
  padding: ${(props) => props.padding};
`;

const BigParagraph = styled.p<Props>`
  font-size: ${fontSize.lg1};
  line-height: ${lineHeight.base};
  padding: ${(props) => props.padding};
`;

const Paragraph = styled.p<Props>`
  font-size: ${fontSize.base};
  padding: ${(props) => props.padding};
`;

export default Text;
