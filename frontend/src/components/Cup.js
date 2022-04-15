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
        <>
          <C240>
            {ratio.map((item, idx) => (
              <Liquid
                type={item.value}
                volume={`${(parseInt(item.volume) / 60) * 100}%`}
              >
                {item.value}
              </Liquid>
            ))}
          </C240>
        </>
      </Flex>
    </Container>
  );
};

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Liquid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.type === "espresso"
      ? "#593431"
      : props.type === "milk"
      ? "#fdfff5"
      : ""};
  border-top: ${(props) => props.type === "espresso" && "4px solid #ba6324"};
  height: ${(props) => props.volume && props.volume};
  color: ${(props) => (props.type === "espresso" ? "#fff" : "#000")};
`;

const Glass = styled.div`
  background-color: #eeedeb;
  border: 4px solid #dedcd8;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
`;

const C240 = styled(Glass)`
  border-radius: 0.5rem;
  border-bottom-left-radius: 4.8rem;
  border-bottom-right-radius: 4.8rem;
  height: 140px;
  width: 11rem;
`;

const C60 = styled(Glass)`
  border-radius: 0.5em;
  border-bottom-left-radius: 1.5em;
  border-bottom-right-radius: 1.5em;
  height: 50px;
  width: 3.5em;

  .darktext {
    color: #8a8a8a;
    text-align: center;
    font-size: 0.5rem;
  }
`;

export default Cup;
