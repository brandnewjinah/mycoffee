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
    <Flex>
      {total < 75 ? (
        <C75>
          {ratio.map((item, idx) => (
            <Liquid
              type={item.value}
              volume={`${(parseInt(item.volume) / 75) * 100}%`}
            ></Liquid>
          ))}
        </C75>
      ) : total < 150 ? (
        <C150>
          {ratio.map((item, idx) => (
            <Liquid
              type={item.value}
              volume={
                item.value === "espresso"
                  ? `${(parseInt(item.volume) / 150) * 100 + 8}%`
                  : `${(parseInt(item.volume) / 150) * 100}%`
              }
            ></Liquid>
          ))}
        </C150>
      ) : (
        <C240>
          {ratio.map((item, idx) => (
            // <Liquid
            //   type={item.value}
            //   volume={`${(parseInt(item.volume) / 60) * 100}%`}
            // ></Liquid>
            <Liquid
              type={item.value}
              volume={`${(parseInt(item.volume) / 240) * 100}%`}
            ></Liquid>
          ))}
        </C240>
      )}
    </Flex>
  );
};

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  /* background-color: firebrick; */
  height: 150px;
  padding: 1rem;
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
  border: 3px solid transparent;
  box-shadow: 0 0 0 3px #dedcd8;
  position: relative;
`;

// const C75 = styled(Glass)`
//   width: 51%;
//   height: 46%;
//   border-radius: 0.25rem;
//   border-bottom-left-radius: 1.25rem;
//   border-bottom-right-radius: 1.25rem;
// `;

const C75 = styled(Glass)`
  width: 51%;
  height: 46%;
  border-radius: 0.25rem;
  border-bottom-left-radius: 35%;
  border-bottom-right-radius: 35%;
  transform: perspective(200px) rotateX(-20deg);
`;

const C150 = styled(Glass)`
  width: 51%;
  height: 60%;
  border-radius: 0.25rem;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  transform: perspective(200px) rotateX(-20deg);
`;

const C240 = styled(Glass)`
  width: 71%;
  height: 58.5%;
  border-radius: 0.3rem;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  /* transform: perspective(200px) rotateX(-20deg); */
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
