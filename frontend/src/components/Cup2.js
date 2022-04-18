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
      <Wrapper>
        {total <= 75 ? (
          <C75>
            {ratio.map((item, idx) => (
              <Liquid
                type={item.value}
                volume={
                  item.value === "espresso"
                    ? `${(parseInt(item.volume) / 75) * 100 + 8}%`
                    : idx === 1 && item.value !== "espresso"
                    ? `${(parseInt(item.volume) / 75) * 100 - 8}%`
                    : `${(parseInt(item.volume) / 75) * 100}%`
                }
              ></Liquid>
            ))}
          </C75>
        ) : total <= 150 ? (
          <C150>
            {ratio.map((item, idx) => (
              <Liquid
                type={item.value}
                volume={
                  item.value === "espresso"
                    ? `${(parseInt(item.volume) / 150) * 100 + 10}%`
                    : idx === 1 && item.value !== "espresso"
                    ? `${(parseInt(item.volume) / 150) * 100 - 10}%`
                    : `${(parseInt(item.volume) / 150) * 100}%`
                }
              ></Liquid>
            ))}
          </C150>
        ) : (
          <C240>
            {ratio.map((item, idx) => (
              <Liquid
                key={idx}
                type={item.value}
                volume={
                  item.value === "espresso"
                    ? `${(parseInt(item.volume) / 240) * 100 + 10}%`
                    : idx === 1 && item.value !== "espresso"
                    ? `${(parseInt(item.volume) / 240) * 100 - 10}%`
                    : `${(parseInt(item.volume) / 240) * 100}%`
                }
              ></Liquid>
            ))}
          </C240>
        )}
      </Wrapper>
    </Container>
  );
};

const Wrapper = styled.div`
  width: 140px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 1rem 0;
  margin: 0 auto;
  /* background-color: lavender; */
`;

const Glass = styled.div`
  /* background-color: #eeedeb; */
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  border: 2px solid transparent;
  box-shadow: 0 0 0 2px #dedcd8;
  position: relative;
`;

const Liquid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.type === "espresso" ? "#fff" : "#000")};
  border-top: ${(props) => props.type === "espresso" && "3px solid #ba6324"};
  height: ${(props) => props.volume && props.volume};
  background-color: ${(props) =>
    props.type === "espresso"
      ? "#593431"
      : props.type === "steamedMilk"
      ? "#fdfff5"
      : props.type === "milkFoam"
      ? "#e6e8dc"
      : props.type === "microFoam"
      ? "#FDFFF6"
      : props.type === "water"
      ? "#d4f1f9"
      : ""};
  background-image: ${(props) =>
      props.type === "microFoam" &&
      "radial-gradient(#eaebe1 10%, transparent 11%)"},
    ${(props) =>
      props.type === "microFoam" &&
      "radial-gradient(#eaebe1 10%, transparent 11%)"};
  background-size: 14px 14px;
  background-position: 0 0, 7px 7px;
  background-repeat: repeat;
`;

// const C75 = styled(Glass)`
//   width: 51%;
//   height: 46%;
//   border-radius: 0.25rem;
//   border-bottom-left-radius: 1.25rem;
//   border-bottom-right-radius: 1.25rem;
// `;

const C240 = styled(Glass)`
  width: 95px;
  height: 75px;
  border-radius: 4px;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
`;

const C150 = styled(Glass)`
  width: 65px;
  height: 75px;
  border-radius: 4px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  transform: perspective(200px) rotateX(-20deg);
`;

const C75 = styled(Glass)`
  width: 65px;
  height: 59px;
  border-radius: 4px;
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;
  transform: perspective(200px) rotateX(-20deg);
`;

const C360 = styled(Glass)`
  width: 71%;
  height: 58.5%;
  border-radius: 0.3rem;
  border-bottom-left-radius: 40%;
  border-bottom-right-radius: 40%;
  transform: perspective(200px) rotateX(-20deg);
`;

export default Cup;
