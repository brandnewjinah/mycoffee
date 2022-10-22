import React, { FC } from "react";
import styled from "styled-components";

//comp
import { Body } from "./Text";
import { neutral } from "./token";

interface Props {
  title?: string;
  value?: string;
}

export const ListItem: FC<Props> = ({ title, value }) => {
  return (
    <Li>
      <Body variant="caption" spacing=".1rem" uppercase bold>
        {title}
      </Body>
      <Body variant="body_xsmall" capitalize align="end" spacing=".05rem">
        {value}
      </Body>
    </Li>
  );
};

const Li = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${neutral[200]};
  padding: 0.65rem;

  &:last-child {
    border-bottom: 1px solid ${neutral[200]};
  }
`;

export const RecipeItem: FC<Props> = ({ title, value }) => {
  return (
    <RecipeLi>
      <div className="title">
        <p>{title}</p>
      </div>
      <div className="value">{value}</div>
    </RecipeLi>
  );
};

const RecipeLi = styled.li`
  display: flex;
  align-items: top;
  gap: 0.25rem;
  font-size: 0.875rem;
  padding: 0.3rem;

  .title {
    flex: 1;
  }

  .value {
    flex: 8;
  }
`;
