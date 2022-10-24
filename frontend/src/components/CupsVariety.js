import React from "react";
import _ from "lodash";
import styled from "styled-components";

//comp
import { Hot2oz, Hot6oz, Hot8oz, Hot12oz, IcedBig } from "./CupSizes";

//data
import { categoryList } from "../data/category";
import { primaryColor } from "./token";

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

  const ingredients = _.orderBy(findRatioItem, ["id"], ["desc"]);

  const volume =
    data && data.reduce((sum, ratio) => sum + parseInt(ratio.value), 0);

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
      {type === "hot" && volume < 177 ? (
        <Hot6oz ingredients={ingredients} />
      ) : type === "hot" && volume < 240 ? (
        <Hot8oz ingredients={ingredients} />
      ) : type === "hot" && volume < 360 ? (
        <Hot12oz ingredients={ingredients} />
      ) : type === "iced" && volume >= 350 ? (
        <IcedBig ingredients={ingredients} />
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
  /* background-color: #faf1e5; */
  background-color: ${primaryColor.darkIvory};
`;

export default CupsVariety;
