import React, { FC } from "react";

//import styles and assets
import styled from "styled-components";

interface Props {}

const Cup: FC<Props> = () => {
  return (
    <Wrapper>
      <div className="cup">
        {/* {data &&
                data.map((d) => {
                    return (
                        <div className="BarData" style={{ background: `${d.color}`, height: `${d.percent}%` }}>
                            <p className="PercentText">{d.percent + '%'}</p>
                        </div>
                    );
                })} */}

        {/* <div
          className="coffee"
          style={{ background: `ghostwhite`, height: `50%` }}
        >
          <p className="PercentText">50</p>
        </div> */}
        <div
          className="coffee"
          style={{ background: `aliceblue`, height: `80%` }}
        >
          <p className="darktext">80%</p>
        </div>
        <div
          className="coffee"
          style={{ background: `#6f4e37`, height: `20%` }}
        >
          <p className="lighttext">20%</p>
        </div>
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
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    height: 160px;
    width: 8em;
    overflow: hidden;
  }

  .coffee {
    display: flex;
    align-items: center;
    justify-content: center;
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

export default Cup;
