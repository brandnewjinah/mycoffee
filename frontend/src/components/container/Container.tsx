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
