import React, { FC } from "react";

//comp
import { Container } from "./container/Container";
import { Coffee } from "../assets/Icons";
import Text from "./Text";

export interface Props {}

const Loading: FC<Props> = () => {
  return (
    <Container
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 60px - 6rem)"
    >
      <Coffee width="20" height="20" color="#6f4e37" stroke="2" />
      <Text variant="caption" color="#6f4e37" padding=".5rem 0">
        loading...
      </Text>
    </Container>
  );
};

export default Loading;
