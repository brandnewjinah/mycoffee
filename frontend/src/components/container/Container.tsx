import React, { FC } from "react";
import styled from "styled-components";

import Text from "../Text";
import { neutral, fontSize } from "../token";

interface Props {
  backgroundColor?: string;
  gap?: string;
  height?: string;
  justifyContent?: "center";
  alignItems?: "center";
  children?: any;
}

export const Container: FC<Props> = ({
  backgroundColor,
  gap,
  height,
  justifyContent,
  alignItems,
  children,
}) => {
  return (
    <Wrapper
      backgroundColor={backgroundColor}
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
  background-color: ${(props) =>
    props.backgroundColor && props.backgroundColor};
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

  .flexFive {
    flex: 5;
  }

  .flexSix {
    flex: 6;
  }

  .flexSeven {
    flex: 7;
  }

  .flexEight {
    flex: 8;
  }

  .flexNine {
    flex: 9;
  }
`;
