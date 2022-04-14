import React, { FC } from "react";
import styled from "styled-components";

import Text from "../Text";
import { neutral, fontSize } from "../token";

interface Props {
  gap?: string;
  height?: string;
  justifyContent?: "center";
  alignItems?: "center";
  children?: any;
}

export const Container: FC<Props> = ({
  gap,
  height,
  justifyContent,
  alignItems,
  children,
}) => {
  return (
    <Wrapper
      gap={gap}
      height={height}
      justifyContent={justifyContent}
      alignItems={alignItems}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<Props>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent === "center" && "center"};
  align-items: ${(props) => props.alignItems === "center" && "center"};
  gap: ${(props) => props.gap && props.gap};
  height: ${(props) => props.height && props.height};
`;

export const Flex: FC<Props> = ({ gap, children }) => {
  return <FlexWrapper gap={gap}>{children}</FlexWrapper>;
};

const FlexWrapper = styled.div<Props>`
  display: flex;
  align-items: center;
  gap: ${(props) => (props.gap ? props.gap : ".5rem")};

  .flexHalf {
    flex: 0.5;
  }

  .flexOne {
    flex: 1;
  }

  .flexTwo {
    flex: 2;
  }

  .flexThree {
    flex: 3;
  }

  .flexFour {
    flex: 4;
  }
`;
