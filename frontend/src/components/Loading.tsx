import React, { FC } from "react";

//comp
import { Container } from "./container/Div";
import { Coffee } from "../assets/Icons";
import { Body } from "./Text";

export interface Props {}

const Loading: FC<Props> = () => {
  return (
    <Container
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 60px - 6rem)"
    >
      <Coffee width="20" height="20" color="#6f4e37" stroke="2" />
      <Body variant="caption" color="#6f4e37" padding=".5rem 0">
        loading...
      </Body>
    </Container>
  );
};

export default Loading;
