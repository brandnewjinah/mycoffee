import React, { FC } from "react";
import styled from "styled-components";
import { fontSize, neutral } from "./token";

interface Props {
  width?: string;
  display?: "flex";
  justifyContent?: "space-between";
  padding?: string;
  line?: boolean;
  children?: any;
}

export const Ul: FC<Props> = ({ width, children }) => {
  return <UlWrapper width={width}>{children}</UlWrapper>;
};

const UlWrapper = styled.ul<Props>`
  width: ${(props) => props.width && props.width};
  list-style-type: circle;
`;

export const ListItem: FC<Props> = ({
  display,
  justifyContent,
  padding,
  line,
  children,
}) => {
  return (
    <Li
      display={display}
      justifyContent={justifyContent}
      padding={padding}
      line={line}
    >
      {children}
    </Li>
  );
};

const Li = styled.li<Props>`
  display: ${(props) => props.display && props.display};
  justify-content: ${(props) => props.justifyContent && props.justifyContent};
  font-size: ${fontSize.sm2};
  border-top: ${(props) => props.line && `1px solid ${neutral[200]}`};
  padding: ${(props) => props.padding && props.padding};

  &:last-child {
    border-bottom: ${(props) => props.line && `1px solid ${neutral[200]}`};
  }
`;
