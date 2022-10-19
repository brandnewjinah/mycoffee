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

const DivWrapper = styled.div<Props>`
  width: 100%;
  height: ${(props) => props.height && props.height};
  min-height: ${(props) => props.minHeight && props.height};
  background-color: ${(props) => props.bgColor && props.bgColor};
`;

export const Wrapper: FC<Props> = ({
  width,
  height,
  minHeight,
  bgColor,
  children,
}) => {
  return (
    <WrapperWrapper
      width={width}
      height={height}
      minHeight={minHeight}
      bgColor={bgColor}
    >
      {children}
    </WrapperWrapper>
  );
};

const WrapperWrapper = styled.div<Props>`
  width: 100%;
  height: ${(props) => props.height && props.height};
  min-height: ${(props) => props.minHeight && props.height};
  background-color: ${(props) => props.bgColor && props.bgColor};
`;

export const Container: FC<Props> = ({
  width,
  height,
  bgColor,
  justifyContent,
  alignItems,
  gap,
  children,
}) => {
  return (
    <ContainerWrapper
      width={width}
      height={height}
      bgColor={bgColor}
      justifyContent={justifyContent}
      alignItems={alignItems}
      gap={gap}
    >
      {children}
    </ContainerWrapper>
  );
};

const ContainerWrapper = styled.div<Props>`
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "100%")};
  display: flex;
  flex-direction: column;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "center"};
  align-items: ${(props) => (props.alignItems ? props.alignItems : "center")};
  gap: ${(props) => props.gap && props.gap};
  background-color: ${(props) => props.bgColor && props.bgColor};
`;

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

const FlexWrapper = styled.div<Props>`
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "100%")};
  display: flex;
  flex-direction: ${(props) => props.flexCol && "column"};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "center"};
  align-items: ${(props) => (props.alignItems ? props.alignItems : "center")};

  gap: ${(props) => (props.gap ? props.gap : ".5rem")};
  background-color: ${(props) => props.bgColor && props.bgColor};

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