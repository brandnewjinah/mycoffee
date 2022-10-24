import React from "react";
import _ from "lodash";
import styled from "styled-components";

//comp
import { Hot2oz, Hot5oz, Hot8oz, IcedBig } from "./CupSizes";

//data
import { categoryList } from "../data/category";

const CupsVariety = ({ data, type, volume }) => {
  //01. match ingredient from data to categoryList
  const findRatioItem = data.map((item) => {
    const found = categoryList
      .find((category) =>
        category.selections.find(
          (selection) => selection.value === item.ingredient
        )
      )
      .selections.find((element) => element.value === item.ingredient);
    return { ...found, volume: parseInt(item.value) };
  });

  const ingredients = _.orderBy(findRatioItem, ["id"], ["desc"]);

  console.log(ingredients);
  return (
    <Wrapper>
      {/* {type === "hot" && drinkTotalVolume <= 65 ? (
        <Hot2oz />
      ) : type === "hot" && drinkTotalVolume <= 150 ? (
        <Hot5oz />
      ) : type === "hot" && drinkTotalVolume <= 240 ? (
        <Hot8oz />
      ) : type === "cold" && drinkTotalVolume <= 240 ? (
        <IcedBig />
      ) : (
        <IcedBig />
      )} */}
      {type === "hot" && volume >= 240 ? (
        <Hot8oz ingredients={ingredients} />
      ) : (
        <p>no cup available yet</p>
      )}
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

export default CupsVariety;
