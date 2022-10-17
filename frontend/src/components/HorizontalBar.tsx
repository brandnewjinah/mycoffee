import React, { FC } from "react";
import styled from "styled-components";
import { neutral, primaryColor } from "./token";

interface Props {
  value: number;
  className?: string;
}

type Style = {
  width?: string;
};

const HorizontalBar: FC<Props> = ({ value, className }) => {
  const calculatePercentage = (value: number) => {
    return value * 10 + "%";
  };

  return (
    <Container className={className}>
      <Value width={calculatePercentage(value)} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 7px;
  border-radius: 10rem;
  background-color: ${neutral[100]};
`;

const Value = styled.div<Style>`
  width: ${(props) => props.width};
  height: 100%;
  border-radius: 10rem;
  background-color: ${primaryColor.brickRed};
`;

export default HorizontalBar;
