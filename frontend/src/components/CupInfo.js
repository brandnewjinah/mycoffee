import React from "react";

//import styles and assets
import styled from "styled-components";

const CupInfo = () => {
  return (
    <Wrapper>
      <Header>
        <h5>This will generate a ratio illustration</h5>
      </Header>

      <Flex>
        <C180>
          <Liquid style={{ background: `#f5f3ed`, height: `50%` }} />
          <Liquid style={{ background: `#6f4e37`, height: `30%` }} />
        </C180>
        <Detail>
          <p>1. Select liquid type</p>
          <p>
            2. Add value{" "}
            <span>
              (numbers only, make sure all liquids are in the same unit)
            </span>
          </p>
          <p></p>
        </Detail>
      </Flex>
      <Example>
        <p>Examples</p>
        <p>
          Espresso: 30 <span>(ml)</span>, Milk: 140 <span>(ml)</span>
        </p>
        <p>
          Espresso: 1 <span>(oz)</span>, Water: 3 <span>(oz)</span>
        </p>
        <p>
          Espresso: 1 <span>(part)</span>, Milk: 3 <span>(parts)</span>, Foam: 3{" "}
          <span>(parts)</span>
        </p>
      </Example>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 1em;
  max-width: 500px;
`;

const Header = styled.div`
  text-align: center;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  padding: 2em;
`;

const Detail = styled.div`
  padding-left: 3em;

  p {
    font-size: 0.875rem;
    line-height: 0.875rem;
    margin-bottom: 0.75em;
  }

  span {
    font-size: 0.75rem;
    color: #7a7a7a;
  }
`;

const Example = styled.div`
  text-align: center;

  p {
    font-size: 0.875rem;
    line-height: 0.875rem;
    margin-bottom: 0.75em;
  }

  span {
    font-size: 0.75rem;
    color: #7a7a7a;
  }
`;

const C180 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: #e0deda;
  border: 4px solid #d4d1cb;
  width: 70px;
  height: 55px;
  border-radius: 0.5rem 0.5rem 3rem 3rem;
  overflow: hidden;
`;

const Liquid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default CupInfo;
