import React, { FC } from "react";
import { Link } from "react-router-dom";

//import styles and assets
import styled from "styled-components";
import { Checkmark } from "../assets/Icons";
import { primaryColor, neutral } from "./token";

interface Props {
  label?: string;
  selected?: boolean;
  saved?: string;
  url?: string;
  saveKeyword?: string;
  liked?: string;
  handleSelect?: React.MouseEventHandler<HTMLDivElement>;
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
      {label}
      {/* <Flex>
        {liked && (
          <Check onClick={saveKeyword} saved={saved}>
            <Checkmark width="16" height="16" color="#fff" stroke="3" />
          </Check>
        )}
        <Content>
          <Link to={`/movies/keyword/${url}`}>{label}</Link>
        </Content>
      </Flex> */}
    </Container>
  );
};

const Container = styled.div<Props>`
  display: inline-block;
  border-radius: 2rem;
  border: 1px solid ${neutral[100]};
  background-color: ${(props) => props.selected && "#7dd248"};
  padding: 0.2rem 0.875rem;
  margin: 0.35rem 0.5rem 0.35rem 0;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Check = styled(Flex)`
  padding: 0.15em;
  border-radius: 100%;

  opacity: 0.8;
  transition: opacity 0.1s linear;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const Content = styled.div`
  font-size: 0.75rem;
  letter-spacing: 0.015rem;
  margin: 0 0.5em 0 0.75em;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default Chips;
