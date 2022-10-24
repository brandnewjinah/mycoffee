import React, { FC } from "react";
import styled from "styled-components";
import { primaryColor } from "../token";

interface Props {
  type?: string;
  volume?: string;
}

export const IcedBig: FC<Props> = () => {
  return (
    <Wrapper>
      <IBig>
        <Water>2</Water>
        <Espresso className="espresso">1</Espresso>
      </IBig>
      ;
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 0.75rem 0;
  background-color: lavender;
`;

const Espresso = styled.div`
  border-top: 3px solid #ba6324;
  background-color: #593431;
`;

const Water = styled.div`
  background-color: #d4f1f9;
`;

// const Liquid = styled.div<Props>`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: ${(props) => (props.type === "espresso" ? "#fff" : "#000")};
//   border-top: ${(props) => props.type === "espresso" && "3px solid #ba6324"};
//   height: ${(props) => props.volume && props.volume};
//   background-color: ${(props) =>
//     props.type === "espresso"
//       ? "#593431"
//       : props.type === "steamedMilk"
//       ? "#fdfff5"
//       : props.type === "milkFoam"
//       ? "#e6e8dc"
//       : props.type === "microFoam"
//       ? "#FDFFF6"
//       : props.type === "water"
//       ? "#d4f1f9"
//       : ""};
//   background-image: ${(props) =>
//       props.type === "microFoam" &&
//       "radial-gradient(#eaebe1 10%, transparent 11%)"},
//     ${(props) =>
//       props.type === "microFoam" &&
//       "radial-gradient(#eaebe1 10%, transparent 11%)"};
//   background-size: 14px 14px;
//   background-position: 0 0, 7px 7px;
//   background-repeat: repeat;
// `;

const Glass = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: #fff;
  border: 2px solid transparent;
  border-radius: 3px;
  box-shadow: 0 0 0 4px ${primaryColor.salmon};
  overflow: hidden;
`;

const IBig = styled(Glass)`
  position: relative;
  width: 60px;
  height: 100%;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  transform: perspective(200px) rotateX(-10deg);
`;
