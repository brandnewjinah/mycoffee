import React, { FC } from "react";
import styled from "styled-components";

import Text from "../Text";
import { neutral, fontSize } from "../token";

interface Props {
  children?: any;
}

export const Container: FC<Props> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;
