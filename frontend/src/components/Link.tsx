import React, { FC } from "react";
import styled from "styled-components";
import { fontSize, primaryColor } from "./token";

interface Props {
  label: string;
  linkUrl: string;
  blank?: boolean;
}

const Link: FC<Props> = ({ label, linkUrl, blank }) => {
  return (
    <Container href={linkUrl} target={blank ? "_blank" : "_self"}>
      {label}
    </Container>
  );
};

const Container = styled.a`
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
