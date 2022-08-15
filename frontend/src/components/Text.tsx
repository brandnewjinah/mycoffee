import React, { FC } from "react";
import styled, { css } from "styled-components";
import { fontSize, lineHeight, headingFontFamily } from "./token";

interface Props {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "body_big"
    | "body_small"
    | "body_xsmall"
    | "body_demi"
    | "caption"
    | undefined;
  bold?: boolean;
  padding?: string;
  uppercase?: boolean;
  spacing?: string;
  color?: string;
  className?: string;
  children?: string;
}

const Text: FC<Props> = ({
  className,
  variant,
  bold,
  padding,
  uppercase,
  spacing,
  color,
  children,
}) => {
  return (
    <>
      {variant === "h1" ? (
        <Heading1
          color={color}
          uppercase={uppercase}
          spacing={spacing}
          padding={padding}
        >
          {children}
        </Heading1>
      ) : variant === "h2" ? (
        <Heading2
          color={color}
          uppercase={uppercase}
          spacing={spacing}
          padding={padding}
        >
          {children}
        </Heading2>
      ) : variant === "h3" ? (
        <Heading3
          color={color}
          uppercase={uppercase}
          spacing={spacing}
          padding={padding}
        >
          {children}
        </Heading3>
      ) : variant === "body_big" ? (
        <BigParagraph
          color={color}
          uppercase={uppercase}
          spacing={spacing}
          padding={padding}
        >
          {children}
        </BigParagraph>
      ) : variant === "body_small" ? (
        <SmallParagraph
          className={className}
          bold={bold}
          color={color}
          uppercase={uppercase}
          spacing={spacing}
          padding={padding}
        >
          {children}
        </SmallParagraph>
      ) : variant === "body_xsmall" ? (
        <XSmallParagraph
          className={className}
          bold={bold}
          color={color}
          uppercase={uppercase}
          spacing={spacing}
          padding={padding}
        >
          {children}
        </XSmallParagraph>
      ) : variant === "body_demi" ? (
        <Body_Demi
          className={className}
          bold={bold}
          color={color}
          uppercase={uppercase}
          spacing={spacing}
          padding={padding}
        >
          {children}
        </Body_Demi>
      ) : variant === "caption" ? (
        <Caption
          className={className}
          bold={bold}
          uppercase={uppercase}
          color={color}
          spacing={spacing}
          padding={padding}
        >
          {children}
        </Caption>
      ) : (
        <Paragraph
          bold={bold}
          color={color}
          uppercase={uppercase}
          spacing={spacing}
          padding={padding}
        >
          {children}
        </Paragraph>
      )}
    </>
  );
};

const Basics = css<Props>`
  color: ${(props) => (props.color ? props.color : "#000")};
  text-transform: ${(props) => props.uppercase && "uppercase"};
  letter-spacing: ${(props) => props.spacing && props.spacing};
  padding: ${(props) => props.padding};
`;

const BodyBasics = styled.p<Props>`
  ${Basics}
  font-weight: ${(props) => (props.bold ? 600 : 400)};
`;

const Heading1 = styled.h1<Props>`
  ${Basics}
  font-family: ${headingFontFamily};
  font-size: ${fontSize.lg4};
  font-weight: 700;
`;

const Heading2 = styled.h2<Props>`
  ${Basics}
  font-family: ${headingFontFamily};
  font-size: ${fontSize.lg5};
  font-weight: 600;
`;

const Heading3 = styled.h3<Props>`
  ${Basics}
  font-family: ${headingFontFamily};
  font-size: ${fontSize.lg1};
  font-weight: 600;
`;

const BigParagraph = styled(BodyBasics)<Props>`
  font-size: ${fontSize.lg1};
  line-height: ${lineHeight.base};
`;

const Paragraph = styled(BodyBasics)<Props>`
  font-size: ${fontSize.base};
  line-height: ${lineHeight.base};
`;

const SmallParagraph = styled(BodyBasics)<Props>`
  font-size: ${fontSize.sm1};
  line-height: ${lineHeight.sm3};
`;

const XSmallParagraph = styled(BodyBasics)<Props>`
  font-size: ${fontSize.sm2};
  line-height: ${lineHeight.base};
`;

const Body_Demi = styled(BodyBasics)<Props>`
  font-size: ${fontSize.sm3};
  line-height: ${lineHeight.base};
`;

const Caption = styled(BodyBasics)<Props>`
  font-size: ${fontSize.sm4};
  line-height: ${lineHeight.sm2};
`;

export default Text;
