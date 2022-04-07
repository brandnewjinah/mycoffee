import React, { FC } from "react";
import styled from "styled-components";

import Text from "../Text";
import { neutral, fontSize } from "../token";

interface Props {
  gap?: string;
  children?: any;
}

export const Container: FC<Props> = ({ gap, children }) => {
  return <Wrapper gap={gap}>{children}</Wrapper>;
};

const Wrapper = styled.div<Props>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.gap ? props.gap : "2.5rem")};
`;

export const Flex: FC<Props> = ({ gap, children }) => {
  return <FlexWrapper gap={gap}>{children}</FlexWrapper>;
};

const FlexWrapper = styled.div<Props>`
  display: flex;
  align-items: center;
  gap: ${(props) => (props.gap ? props.gap : ".5rem")};
`;
