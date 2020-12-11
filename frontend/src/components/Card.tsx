import React, { FC } from "react";

//import styles and assets
import styled from "styled-components";
import { Plus } from "../assets/Icons";

interface Props {}

export const EmptyCard: FC<Props> = () => {
  return (
    <Wrapper>
      <Plus width="20" height="20" color="#000" stroke="2" />
      Add to my collection
    </Wrapper>
  );
};

export const Card: FC<Props> = () => {
  return (
    <Wrapper>
      <Plus width="20" height="20" color="#000" stroke="2" />
      Add to my collection
    </Wrapper>
  );
};

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const Wrapper = styled(Flex)`
  width: 100%;
  margin-bottom: 1.5em;
  flex-direction: column;
  background-color: seashell;
  padding: 2em;
`;
