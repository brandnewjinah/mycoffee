import React, { FC } from "react";
import styled from "styled-components";
import { neutral } from "./token";

interface Props {
  label: string;
  handleSelect?: () => void;
}

export const ListItem: FC<Props> = ({ label, handleSelect }) => {
  return <Li onClick={handleSelect}>{label}</Li>;
};

const Li = styled.li`
  padding: 0.5rem 0;
  border-bottom: 1px solid ${neutral[100]};
`;
