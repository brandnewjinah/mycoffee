import React, { FC } from "react";
import styled from "styled-components";
import { fontSize, primaryColor } from "./token";

interface Props {
  label: string;
  linkUrl: string;
  blank?: boolean;
  buttonLink?: boolean;
}

interface StyleProps {
  variant?: "link" | "button" | undefined;
}

export const Link: FC<Props> = ({ label, linkUrl, blank, buttonLink }) => {
  return buttonLink ? (
    <ButtonContainer href={linkUrl} target={blank ? "_blank" : "_self"}>
      {label}
    </ButtonContainer>
  ) : (
    <LinkContainer href={linkUrl} target={blank ? "_blank" : "_self"}>
      {label}
    </LinkContainer>
  );
};

const LinkContainer = styled.a<StyleProps>`
  position: relative;
  width: fit-content;
  font-size: ${fontSize.sm2};
  font-weight: 600;
  color: ${primaryColor.brickRed};

  &::after {
    content: "";
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    border-bottom: 2px solid ${primaryColor.brickRed};
  }
`;

const ButtonContainer = styled.a<StyleProps>`
  width: 100%;
  font-size: ${fontSize.sm1};
  font-weight: 700;
  color: ${primaryColor.brickRed};
  text-align: center;
  border: 1px solid ${primaryColor.brickRed};
  border-radius: 2rem;
  padding: 0.5rem 1rem;
`;

export default Link;
