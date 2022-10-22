import React from "react";
import _ from "lodash";
import styled from "styled-components";

//comp
import { Hot2oz, Hot5oz, Hot8oz, IcedBig } from "./CupSizes";

//data
import { categoryList } from "../data/category";

const CupsVariety = ({ data, type }) => {
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

  const ingredientRatio = _.orderBy(findRatioItem, ["id"], ["desc"]);

  const drinkTotalVolume =
    data && data.reduce((sum, ratio) => sum + parseInt(ratio.value), 0);

  return (
    <Wrapper>
      {type === "hot" && drinkTotalVolume <= 65 ? (
        <Hot2oz>cup</Hot2oz>
      ) : type === "hot" && drinkTotalVolume <= 150 ? (
        <Hot5oz>cup</Hot5oz>
      ) : type === "hot" && drinkTotalVolume <= 240 ? (
        <Hot8oz>cup</Hot8oz>
      ) : (
        <IcedBig>cup</IcedBig>
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
