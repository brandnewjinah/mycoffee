import React, { useState, useEffect } from "react";
import _ from "lodash";

//import styles and assets
import styled from "styled-components";
import { Container } from "./container/Container";

//data
import { categoryList } from "../data/category";

const Cup = ({ data }) => {
  const mapFunction = data.map((item) => {
    const found = categoryList
      .find((category) =>
        category.selections.find(
          (selection) => selection.value === item.ingredient
        )
      )
      .selections.find((element) => element.value === item.ingredient);
    return { ...found, volume: item.value };
  });

  const ratio = _.orderBy(mapFunction, ["id"], ["desc"]);

  const total =
    data && data.reduce((sum, ratio) => sum + parseInt(ratio.value), 0);

  return (
    <Container>
      <Flex>
        {total < 75 ? (
          <C75>
            {ratio.map((item, idx) => (
              <Liquid
                type={item.value}
                volume={`${(parseInt(item.volume) / 60) * 100}%`}
              >
                {item.label}
              </Liquid>
            ))}
          </C75>
        ) : total < 150 ? (
          <TestCup></TestCup>
        ) : (
          // <C150>
          //   {ratio.map((item, idx) => (
          //     <Liquid
          //       type={item.value}
          //       volume={`${(parseInt(item.volume) / 60) * 100}%`}
          //     >
          //       {item.label}
          //     </Liquid>
          //   ))}
          // </C150>
          <C240>
            {ratio.map((item, idx) => (
              <Liquid
                type={item.value}
                volume={`${(parseInt(item.volume) / 60) * 100}%`}
              >
                {item.label}
              </Liquid>
            ))}
          </C240>
        )}
      </Flex>
    </Container>
  );
};

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Liquid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.type === "espresso" ? "#fff" : "#000")};
  font-size: 0.675rem;
  border-top: ${(props) => props.type === "espresso" && "4px solid #ba6324"};
  height: ${(props) => props.volume && props.volume};
  background-color: ${(props) =>
    props.type === "espresso"
      ? "#593431"
      : props.type === "steamedMilk"
      ? "#fdfff5"
      : props.type === "water"
      ? "#d4f1f9"
      : ""};
  /* background-image: radial-gradient(#fff 10%, transparent 11%),
    radial-gradient(#fff 10%, transparent 11%);
  background-size: 14px 14px;
  background-position: 0 0, 7px 7px;
  background-repeat: repeat; */
`;

const Glass = styled.div`
  /* background-color: #eeedeb; */
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  border: 4px solid transparent;
  box-shadow: 0 0 0 4px #dedcd8;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    right: -70px;
    top: 0;
    width: 80px;
    height: 90px;
    border: 12px solid #000;
    border-left: 12px solid transparent;
    border-bottom: 12px solid transparent;
    border-radius: 50%;
    transform: rotate(42deg);
  }
`;

const C240 = styled(Glass)`
  border-radius: 0.5rem;
  border-bottom-left-radius: 4.8rem;
  border-bottom-right-radius: 4.8rem;
  height: 140px;
  width: 11rem;
`;

const C150 = styled(Glass)`
  border-radius: 0.5rem;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  height: 130px;
  width: 7rem;
`;

const C75 = styled(Glass)`
  border-radius: 0.5rem;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  height: 75px;
  width: 4.75rem;
`;

const TestCup = styled.div`
  width: 7rem;
  height: 130px;
  background-color: #eeedeb;
  border: 4px solid transparent;
  box-shadow: 0 0 0 4px #dedcd8;
  position: absolute;
`;

// const Handle = styled.div`
//   position: absolute;
//   right: -40px;
//   top: 0;
//   width: 80px;
//   height: 90px;
//   border: 12px solid #000;
//   border-left: 12px solid transparent;
//   border-bottom: 12px solid transparent;
//   border-radius: 50%;
//   transform: rotate(42deg);
// `;

export default Cup;
