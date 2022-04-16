import React from "react";
import styled from "styled-components";

const Test = () => {
  return (
    <Wrapper>
      <Container>
        <div className="coffee-cups">
          <div className="cup americano">
            <div className="handle"></div>
          </div>
          <div className="cup-small flatwhite">
            <div className="handle"></div>
          </div>
          <div className="cup cappuccino">
            <div className="handle"></div>
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Container = styled.div`
  position: relative;
  margin: auto;
  overflow: hidden;
  width: 100%;
  height: 700px;

  //coffee cup drawings

  .coffee-cups {
    width: 40%;
    height: 100%;
    position: absolute;
    left: 10%;
    top: 3%;
  }

  .handle {
    position: absolute;
    height: 20px;
    width: 15px;
    background: transparent;
    border-radius: 50% 30%;
    left: 95%;
    top: 10%;
    z-index: -1;
    border: 2px solid #f4e8da;
  }

  .cup {
    position: absolute;
    width: 70px;
    height: 55px;
    background: #252c32;
    border: 2px solid #f4e8da;
    border-radius: 0 0 5rem 5rem;
    left: 20%;
  }

  .cup-small {
    position: absolute;
    width: 55px;
    height: 40px;
    background: #252c32;
    border: 2px solid #f4e8da;
    border-radius: 0 0 5rem 5rem;
    left: 23%;
  }

  .cup-long {
    position: absolute;
    width: 60px;
    height: 70px;
    background: #252c32;
    border: 2px solid #f4e8da;
    border-radius: 10% 10% 50% 50%;
    left: 22%;
  }

  .americano {
    top: 5%;
    background: linear-gradient(
      to bottom,
      #252c32 13%,
      #859fb5 13%,
      #859fb5 50%,
      #87624f 50%
    );
  }

  .flatwhite {
    top: 18.5%;
    background: linear-gradient(
      to bottom,
      #252c32 10%,
      #f4e8da 10%,
      #dab7a3 60%,
      #87624f 65%,
      #5b4644 90%
    );
  }

  .cappuccino {
    top: 35%;
    background: linear-gradient(
      to bottom,
      #f4e8da 50%,
      #dab7a3 50%,
      #dab7a3 55%,
      #87624f 60%
    );
  }

  //description
  h1 {
    color: #f4e8da;
    font-size: 1em;
    letter-spacing: 3px;
  }

  p {
    color: #f4e8da;
    font-family: $serif;
    text-transform: none;
    font-size: 0.7em;
    letter-spacing: 0.5px;
    margin-top: -5px;
  }

  // key for the colors
  .small {
    margin-left: 20px;
    margin-top: -1px;
    font-family: $sans;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .key {
    position: relative;
    margin: auto;
    width: 500px;
    height: 200px;
  }

  .espresso {
    background: #5b4644;
    position: absolute;
    left: 17%;
  }

  .milk {
    background: #dab7a3;
    position: absolute;
    left: 40%;
  }

  .foam {
    background: #f4e8da;
    position: absolute;
    left: 63%;
  }

  .water {
    background: #859fb5;
    position: absolute;
    left: 83%;
  }
`;

export default Test;
