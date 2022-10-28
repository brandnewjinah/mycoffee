import React, { FC } from "react";
import styled from "styled-components";

interface Props {
  width?: string;
  height?: string;
  minHeight?: string;
  flexCol?: boolean;
  bgColor?: string;
  gap?: string;
  justifyContent?: "center";
  alignItems?: string;
  children?: any;
}

export const Div: FC<Props> = ({
  width,
  height,
  minHeight,
  bgColor,
  children,
}) => {
  return (
    <DivWrapper
      width={width}
      height={height}
      minHeight={minHeight}
      bgColor={bgColor}
    >
      {children}
    </DivWrapper>
  );
};

export const Flex: FC<Props> = ({
  flexCol,
  width,
  height,
  bgColor,
  justifyContent,
  alignItems,
  gap,
  children,
}) => {
  return (
    <FlexWrapper
      flexCol={flexCol}
      width={width}
      height={height}
      bgColor={bgColor}
      justifyContent={justifyContent}
      alignItems={alignItems}
      gap={gap}
    >
      {children}
    </FlexWrapper>
  );
};

const Wrapper = styled.div<Props>`
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "100%")};
  background-color: ${(props) => props.bgColor && props.bgColor};
`;

const DivWrapper = styled(Wrapper)<Props>`
  min-height: ${(props) => props.minHeight && props.height};
`;

const FlexWrapper = styled(Wrapper)<Props>`
  display: flex;
  flex-direction: ${(props) => props.flexCol && "column"};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "center"};
  align-items: ${(props) => (props.alignItems ? props.alignItems : "center")};
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

  .flexTen {
    flex: 10;
  }
`;
