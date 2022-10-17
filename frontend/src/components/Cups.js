import React from "react";
import _ from "lodash";
import styled from "styled-components";

//data
import { categoryList } from "../data/category";

const Cups = ({ data }) => {
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
    <>
      <Wrapper>
        {drinkTotalVolume <= 65 ? (
          <OZ2>
            {ingredientRatio.map((item, idx) => (
              <Liquid
                key={item.id}
                type={item.value}
                volume={
                  item.value === "espresso"
                    ? `${(item.volume / 150) * 100 + 10}%`
                    : `${(item.volume / 150) * 100}%`
                }
              />
            ))}
          </OZ2>
        ) : drinkTotalVolume <= 150 ? (
          <OZ5>
            {ingredientRatio.map((item, idx) => (
              <Liquid
                key={item.id}
                type={item.value}
                volume={
                  item.value === "espresso"
                    ? `${(item.volume / 150) * 100 + 10}%`
                    : `${(item.volume / 150) * 100}%`
                }
              />
            ))}
          </OZ5>
        ) : drinkTotalVolume <= 240 ? (
          <OZ8>
            {ingredientRatio.map((item, idx) => (
              <Liquid
                key={item.id}
                type={item.value}
                volume={
                  item.value === "espresso"
                    ? `${(item.volume / 240) * 100 + 10}%`
                    : `${(item.volume / 240) * 100}%`
                }
              />
            ))}
          </OZ8>
        ) : (
          <OZ12>
            {ingredientRatio.map((item, idx) => (
              <Liquid
                key={item.id}
                type={item.value}
                volume={
                  item.value === "espresso"
                    ? `${(item.volume / 350) * 100 + 10}%`
                    : `${(item.volume / 350) * 100}%`
                }
              />
            ))}
          </OZ12>
        )}
      </Wrapper>
    </>
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

const Glass = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: #fff;
  border: 2px solid transparent;
  border-radius: 4px;
  box-shadow: 0 0 0 2px #dedcd8;
  overflow: hidden;
`;

const OZ2 = styled(Glass)`
  width: 65px;
  height: 59px;
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;
  transform: perspective(200px) rotateX(-20deg);
`;

const OZ5 = styled(Glass)`
  width: 60px;
  height: 75px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  transform: perspective(200px) rotateX(-20deg);
`;

const OZ8 = styled(Glass)`
  width: 95px;
  height: 75px;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
`;

const OZ12 = styled(Glass)`
  width: 110px;
  height: 95px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
`;

const Ingredient = styled.div`
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
`;

export default Cups;
