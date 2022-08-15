import React, { FC, MouseEventHandler } from "react";

//import styles and assets
import styled from "styled-components";
import { primaryColor, neutral } from "./token";

interface Props {
  label?: string;
  selected?: boolean;
  saved?: string;
  url?: string;
  saveKeyword?: string;
  liked?: string;
  handleSelect?: MouseEventHandler<HTMLButtonElement>;
}

const Chips: FC<Props> = ({
  label,
  selected,
  handleSelect,
  saved,
  url,
  saveKeyword,
  liked,
}) => {
  return (
    <Container onClick={handleSelect} selected={selected}>
      <Content>{label}</Content>
    </Container>
  );
};

const Container = styled.button<Props>`
  display: inline-block;
  border-radius: 2rem;
  border: transparent;
  background-color: ${(props) =>
    props.disabled
      ? neutral[300]
      : props.selected
      ? primaryColor.blue
      : neutral[100]};
  color: ${(props) => props.selected && "#fff"};
  padding: 0.45rem;
  margin: 0.35em 0.5em 0.35em 0;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

const Content = styled.div`
  font-size: 0.75rem;
  letter-spacing: 0.015rem;
  margin: 0 0.5em 0 0.75em;
`;

export default Chips;
