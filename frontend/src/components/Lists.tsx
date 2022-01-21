import React, { FC } from "react";
import styled from "styled-components";
import { neutral } from "./token";

interface Props {
  label: string;
}

export const ListItem: FC<Props> = ({ label }) => {
  return <Li>{label}</Li>;
};

const Li = styled.li`
  padding: 0.5rem 0;
  border-bottom: 1px solid ${neutral[100]};
`;
