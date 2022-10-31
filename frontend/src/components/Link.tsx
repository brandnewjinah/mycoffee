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
    <ButtonWrapper>
      <ButtonContainer href={linkUrl} target={blank ? "_blank" : "_self"}>
        {label}
      </ButtonContainer>
    </ButtonWrapper>
  ) : (
    <LinkContainer href={linkUrl} target={blank ? "_blank" : "_self"}>
      {label}
    </LinkContainer>
  );
};

const ButtonWrapper = styled.div`
  border: 1px solid ${primaryColor.brickRed};
  border-radius: 2rem;
  display: flex;
  justify-content: center;
`;

const ButtonContainer = styled.a<StyleProps>`
  position: relative;
  width: 100%;
  text-align: center;
  font-size: ${fontSize.sm2};
  font-weight: 600;
  color: ${primaryColor.brickRed};
  padding: 0.5rem 1rem;
`;

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

export default Link;
