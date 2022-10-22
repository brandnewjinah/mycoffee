import React, { FC, MouseEventHandler } from "react";
import styled from "styled-components";

//comp
import { Close } from "../assets/Icons";
import { primaryColor, neutral, fontSize } from "./token";

interface Props {
  label?: string;
  selected?: boolean;
  enableDelete?: boolean;
  display?: boolean;
  handleSelect?: MouseEventHandler<HTMLButtonElement>;
}

const Chips: FC<Props> = ({
  enableDelete,
  label,
  selected,
  display,
  handleSelect,
}) => {
  return (
    <Container onClick={handleSelect} selected={selected} display={display}>
      <div className="flex">
        <p>{label}</p>
        {enableDelete && (
          <Close width="15" height="15" color={neutral[300]} stroke="3" />
        )}
      </div>
    </Container>
  );
};

const Container = styled.button<Props>`
  display: inline-block;
  background-color: ${(props) =>
    props.disabled
      ? neutral[300]
      : props.selected
      ? primaryColor.brickRed
      : props.display
      ? primaryColor.almond
      : neutral[100]};
  border: transparent;
  border-radius: 2rem;
  color: ${(props) => (props.selected ? "#fff" : neutral[600])};
  font-size: ${fontSize.sm3};
  font-weight: 600;
  letter-spacing: 0.015rem;
  padding: 0.5rem 1rem;
  margin: 0.35rem 0.5rem 0.35rem 0;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  .flex {
    display: flex;
    align-items: start;
    gap: 0.35rem;
  }

  svg {
    display: block;
    margin: auto;
  }
`;

export default Chips;
