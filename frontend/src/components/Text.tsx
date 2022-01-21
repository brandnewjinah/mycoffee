import React, { FC } from "react";
import styled from "styled-components";
import { fontSize, lineHeight, headingFontFamily } from "./token";

interface Props {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "body_big"
    | "body_small"
    | "caption"
    | undefined;
  bold?: boolean;
  padding?: string;
  children?: string;
  color?: string;
}

const Text: FC<Props> = ({ variant, bold, padding, color, children }) => {
  return (
    <>
      {variant === "h1" ? (
        <Heading1 padding={padding}>{children}</Heading1>
      ) : variant === "h2" ? (
        <Heading2 padding={padding}>{children}</Heading2>
      ) : variant === "h3" ? (
        <Heading3 padding={padding}>{children}</Heading3>
      ) : variant === "body_big" ? (
        <BigParagraph padding={padding}>{children}</BigParagraph>
      ) : variant === "body_small" ? (
        <SmallParagraph padding={padding}>{children}</SmallParagraph>
      ) : variant === "caption" ? (
        <Caption bold={bold} color={color} padding={padding}>
          {children}
        </Caption>
      ) : (
        <Paragraph bold={bold} color={color} padding={padding}>
          {children}
        </Paragraph>
      )}
    </>
  );
};

const Heading1 = styled.h1<Props>`
  font-family: ${headingFontFamily};
  font-size: ${fontSize.lg4};
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
  font-size: ${fontSize.lg1};
  font-weight: 600;
  padding: ${(props) => props.padding};
`;

const BigParagraph = styled.p<Props>`
  font-size: ${fontSize.lg1};
  line-height: ${lineHeight.base};
  padding: ${(props) => props.padding};
`;

const Paragraph = styled.p<Props>`
  font-size: ${fontSize.base};
  line-height: ${lineHeight.base};
  font-weight: ${(props) => (props.bold ? 600 : 400)};
  color: ${(props) => (props.color ? props.color : "#000")};
  padding: ${(props) => props.padding};
`;

const SmallParagraph = styled.p<Props>`
  font-size: ${fontSize.sm1};
  line-height: ${lineHeight.sm1};
  padding: ${(props) => props.padding};
`;

const Caption = styled.p<Props>`
  font-size: ${fontSize.sm2};
  line-height: ${lineHeight.sm2};
  font-weight: ${(props) => (props.bold ? 600 : 400)};
  color: ${(props) => props.color};
  padding: ${(props) => props.padding};
`;

export default Text;
