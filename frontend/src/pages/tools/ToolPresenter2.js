import React from "react";

//redux
import { connect } from "react-redux";

//import styles and assets
import styled from "styled-components";

const ToolPresenter = () => {
  return (
    <Wrapper>
      <Header>
        <h2>My Tools</h2>
      </Header>
      <Main>
        <div className="box span1">
          <img
            src="https://cdn.shopify.com/s/files/1/2425/8607/products/Acaia-Lunar-Scale_600x600.jpg?v=1601915510"
            alt=""
          />
          <p>content 1</p>
        </div>

        <div className="box span2">
          <img
            src="https://cdn.shopify.com/s/files/1/2425/8607/products/ECMAngledBottomlessPFSide_600x600.jpg?v=1556818934"
            alt=""
          />
          <p>content 2</p>
        </div>

        <div className="box">
          <img
            src="https://cdn.shopify.com/s/files/1/2425/8607/products/Saint-Anthony-BT-Wedge-Distribution-Tool-03_600x600.jpg?v=1605822347"
            alt=""
          />
          <p>content 3</p>
        </div>

        <div className="box span3">
          <img
            src="https://cdn.shopify.com/s/files/1/2425/8607/products/Clive-Tamper-Bubinga_600x600.jpg?v=1605817338"
            alt=""
          />
          <p>content 4</p>
        </div>

        <div className="box span4">
          <img
            src="https://cdn.shopify.com/s/files/1/2425/8607/products/Fellow-Stagg-EKG-Electric-Pour-Over-Kettle-01_0a62002f-ef1e-43f4-8ee7-8d1555cf189c_600x600.jpg?v=1606764670"
            alt=""
          />
          <p>content 5</p>
        </div>

        <div className="box">
          <img
            src="https://cdn.shopify.com/s/files/1/2425/8607/products/ECM-tamper-station_600x600.png?v=1556820316"
            alt=""
          />
          <p>content 6</p>
        </div>

        <div className="box">
          <img
            src="https://cdn.shopify.com/s/files/1/2425/8607/products/verona-2-point-5-oz-espresso-cup_adbaa97c-6929-4409-a1ca-3fff61614377_600x600.jpg?v=1600120060"
            alt=""
          />
          <p>content 7</p>
        </div>
      </Main>
    </Wrapper>
  );
};

const Flex = styled.div`
  display: flex;
  justify-content: flex;
  align-self: center;
`;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 3em auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  h2 {
    font-size: 2.8rem;
    font-weight: 500;
  }
`;

const Main = styled(Flex)`
  position: relative;
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: minmax(100px, auto);
  margin: 40px;
  grid-auto-flow: dense;
  grid-gap: 10px;

  img {
    width: 100%;
  }

  .box {
    color: #929796;
    padding: 20px;
    display: grid;
    font-size: 20px;
    border: 1px solid #d3b88c;
    place-items: center;
    text-align: center;
    transition: 0.25s;

    &:hover {
      opacity: 0.5;
    }

    img {
      position: relative;
      margin-bottom: 10px;
    }
  }

  .span1 {
    grid-column: span 2;
    grid-row: span 1;
  }

  .span2 {
    grid-column: span 1;
    grid-row: span 2;
  }

  .span3 {
    grid-column: span 1;
    grid-row: span 2;
  }

  .span4 {
    grid-column: span 3;
    grid-row: span 1;
  }

  @media (max-width: 991px) {
    grid-template-columns: repeat(auto-fill, minmax(50%, 1fr));
    grid-template-rows: minmax(auto, auto);

    .box {
      grid-column: unset !important;
      grid-row: unset !important;
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    health_goal: state.health_goal,
    height: state.height,
    weight: state.weight,
    goal_weight: state.goal_weight,
  };
};

export default connect(mapStateToProps, null)(ToolPresenter);
