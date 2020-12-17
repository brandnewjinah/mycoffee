import React from "react";
import _ from "lodash";

//import styles and assets
import styled from "styled-components";

const Cup = ({ data }) => {
  const ratio = _.orderBy(data, ["id"], ["desc"]);

  const total =
    data && data.reduce((sum, ratio) => sum + parseInt(ratio.value), 0);

  const bgColor = (name) => {
    const color =
      name === "Honey"
        ? `#FFC30B`
        : name === "Espresso"
        ? `#6f4e37`
        : name === "Coffee"
        ? `#8B715E`
        : name === "Water"
        ? `#DFEFFF`
        : name === "Tea"
        ? `#D0F0C0`
        : name === "Liqueur"
        ? `#613a2d`
        : name === "Milk"
        ? `#FDFFF5`
        : name === "Milk Foam"
        ? `#F7E8BE`
        : null;

    return color;
  };

  return (
    <Wrapper>
      <Flex>
        {total < 65 ? (
          <>
            <C60>
              {ratio.map((r, idx) => (
                <Liquid
                  key={idx}
                  style={{
                    backgroundColor: `${bgColor(r.name)}`,
                    height: `${(parseInt(r.value) / 60) * 100}%`,
                  }}
                ></Liquid>
              ))}
            </C60>
            <Label>
              {ratio.map((r, idx) => (
                <>
                  <Icon
                    style={{
                      backgroundColor: `${bgColor(r.name)}`,
                    }}
                  ></Icon>
                  <span>{r.name}</span>
                </>
              ))}
            </Label>
          </>
        ) : (
          <>
            <C180>
              {ratio.map((r, idx) => (
                <>
                  <Liquid
                    key={idx}
                    style={{
                      backgroundColor: `${bgColor(r.name)}`,
                      height: `${(parseInt(r.value) / 180) * 100}%`,
                    }}
                  ></Liquid>
                </>
              ))}
            </C180>
            <Label>
              {ratio.map((r, idx) => (
                <>
                  <Icon
                    style={{
                      backgroundColor: `${bgColor(r.name)}`,
                    }}
                  ></Icon>
                  <span>{r.name}</span>
                </>
              ))}
            </Label>
          </>
        )}
      </Flex>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

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
`;

const Glass = styled.div`
  background-color: #eeedeb;
  border: 4px solid #dedcd8;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
`;

const C180 = styled(Glass)`
  border-radius: 0.5em;
  border-bottom-left-radius: 3em;
  border-bottom-right-radius: 3em;
  height: 90px;
  width: 6.5em;
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

const Label = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0.5em;

  span {
    font-size: 0.75rem;
    margin: 0 0.75em 0 0.25em;
  }
`;

const Icon = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid #dedcd8;
`;

export default Cup;
