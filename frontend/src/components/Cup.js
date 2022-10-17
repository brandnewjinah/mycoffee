import React from "react";
import _ from "lodash";

//import styles and assets
import styled from "styled-components";
import { Container } from "./container/Div";

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
        {total < 75 ? (
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
              >
                {item.label}
              </Liquid>
            ))}
          </C75>
        ) : total <= 150 ? (
          <C150>
            {ratio.map((item, idx) => (
              <Liquid
                key={idx}
                type={item.value}
                volume={
                  item.value === "espresso"
                    ? `${(parseInt(item.volume) / 150) * 100 + 8}%`
                    : idx === 1 && item.value !== "espresso"
                    ? `${(parseInt(item.volume) / 150) * 100 - 8}%`
                    : `${(parseInt(item.volume) / 150) * 100}%`
                }
              >
                {item.label}
              </Liquid>
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
                    ? `${(parseInt(item.volume) / 240) * 100 + 8}%`
                    : idx === 1 && item.value !== "espresso"
                    ? `${(parseInt(item.volume) / 240) * 100 - 8}%`
                    : `${(parseInt(item.volume) / 240) * 100}%`
                }
              >
                {item.label}
              </Liquid>
            ))}
          </C240>
        )}
      </Wrapper>
    </Container>
  );
};

const Wrapper = styled.div`
  width: 200px; //375 device
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: lavender;
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

// const Test = styled.div`
//   width: 158px;
//   height: 123px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin: 0 auto;
//   background-color: rgba(255, 99, 71, 0.5);
// `;

const C240 = styled(Glass)`
  width: 158px; //375
  height: 123px; //375
  border-radius: 8px;
  border-bottom-left-radius: 70px;
  border-bottom-right-radius: 70px;
`;

const C150 = styled(Glass)`
  width: 106px;
  height: 125px;
  border-radius: 8px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
`;

const C75 = styled(Glass)`
  width: 100px;
  height: 95px;
  border-radius: 8px;
  border-bottom-left-radius: 45px;
  border-bottom-right-radius: 45px;
`;

export default Cup;
