import React, { FC } from "react";

//import styles and assets
import styled from "styled-components";

interface Props {
  label?: string;
  selected?: boolean;
  direction?: number;
  handleToggle?: () => void;
}

export const Selector: FC<Props> = ({
  label,
  direction,
  selected,
  handleToggle,
}) => {
  return (
    <>
      {direction === 2 ? (
        <Right
          style={{ backgroundColor: selected ? "#f2665c" : "" }}
          onClick={handleToggle}
        >
          {label}
        </Right>
      ) : (
        <Left
          style={{ backgroundColor: selected ? "#f2665c" : "" }}
          onClick={handleToggle}
        >
          {label}
        </Left>
      )}
    </>
  );
};

const Common = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #dddddd;
  width: 40px;
  height: 30px;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.125em;
  text-transform: uppercase;
  cursor: pointer;
  transition: opacity 0.15s linear;
  &:hover {
    opacity: 0.8;
  }
`;

const Left = styled(Common)`
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;

const Right = styled(Common)`
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`;
