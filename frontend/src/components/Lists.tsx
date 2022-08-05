import React, { FC } from "react";
import styled from "styled-components";
import { fontSize, neutral } from "./token";

interface Props {
  children?: any;
}

export const Ul: FC<Props> = ({ children }) => {
  return <UlWrapper>{children}</UlWrapper>;
};

const UlWrapper = styled.ul`
  list-style-type: circle;
`;

export const ListItem: FC<Props> = ({ children }) => {
  return <Li>{children}</Li>;
};

const Li = styled.li`
  font-size: ${fontSize.sm2};
`;
