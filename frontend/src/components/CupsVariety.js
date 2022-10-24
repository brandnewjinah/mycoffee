import React from "react";
import { useLocation } from "react-router-dom";
import _ from "lodash";
import styled from "styled-components";

//comp
import { Hot2oz, Hot6oz, Hot8oz, Hot12oz, IcedBig } from "./CupSizes";

//data
import { categoryList } from "../data/category";
import { primaryColor } from "./token";

const CupsVariety = ({ data, type }) => {
  const location = useLocation();
  const pathIsRecipe = location.pathname.includes("/recipe/");
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
    <Wrapper pathIsRecipe={pathIsRecipe}>
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
        <Hot6oz ingredients={ingredients} pathIsRecipe={pathIsRecipe} />
      ) : type === "hot" && volume < 240 ? (
        <Hot8oz ingredients={ingredients} pathIsRecipe={pathIsRecipe} />
      ) : type === "hot" && volume < 360 ? (
        <Hot12oz ingredients={ingredients} pathIsRecipe={pathIsRecipe} />
      ) : type === "iced" && volume >= 350 ? (
        <IcedBig ingredients={ingredients} pathIsRecipe={pathIsRecipe} />
      ) : (
        <p>no cup available yet</p>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: ${(props) => (props.pathIsRecipe ? "180px" : "150px")};
  display: flex;
  justify-content: center;
  align-items: flex-end;
  /* padding: 0.75rem 0; */
  padding: ${(props) => (props.pathIsRecipe ? "1.5rem 0" : ".75rem 0")};
  /* background-color: #faf1e5; */
  background-color: ${primaryColor.darkIvory};
`;

export default CupsVariety;
