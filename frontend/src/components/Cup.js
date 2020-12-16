import React from "react";
import _ from "lodash";

//import styles and assets
import styled from "styled-components";

const Cup = ({ data }) => {
  const ratio = _.orderBy(data, ["id"], ["desc"]);

  const total =
    data && data.reduce((sum, ratio) => sum + parseInt(ratio.value), 0);

  console.log(total);

  return (
    <Wrapper>
      <div className="cup">
        {ratio.map((r, idx) => (
          <Liquid
            key={idx}
            style={{
              background:
                r.id === 1
                  ? `#6f4e37`
                  : r.id === 4
                  ? `#fdfff5`
                  : r.id === 3
                  ? `aliceblue`
                  : null,
              height: `${(parseInt(r.value) / total) * 100}%`,
            }}
          >
            <p className="darktext">{r.name}</p>
          </Liquid>
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .cup {
    background-color: ghostwhite;
    border: 1px solid #dedede;
    border-radius: 0.5em;
    border-bottom-left-radius: 2em;
    border-bottom-right-radius: 2em;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 140px;
    width: 7em;
    overflow: hidden;
  }

  .lighttext {
    color: #ebeded;
    text-align: center;
    font-size: 0.875rem;
  }

  .darktext {
    color: #8a8a8a;
    text-align: center;
    font-size: 0.875rem;
  }
`;

const Liquid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Cup;
