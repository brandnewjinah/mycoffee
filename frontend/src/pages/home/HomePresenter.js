import React, { useState } from "react";

//import components

//redux
import { connect } from "react-redux";

//import styles and assets
import styled from "styled-components";

const HomePresenter = (props) => {
  console.log(props.health_goal);
  return (
    <Wrapper>
      <Header>
        <h2>My Profile</h2>
      </Header>
      <Analyser>
        <h4>I brew my coffee with. I like . I buy . I like tastes</h4>
      </Analyser>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
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

const Analyser = styled.div`
  margin: 2em auto;
  width: 100%;
  max-width: 960px;
  text-align: center;

  h4 {
    font-size: 1.5rem;
    line-height: 2.8rem;
    letter-spacing: 0.125rem;
    margin: 1.5em 0;
    text-rendering: optimizeLegibility;
  }

  span {
    position: relative;
    cursor: pointer;

    &:after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      border-bottom: 3px solid #e89161;
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    method: state.method,
    roast: state.roast,
    beans: state.beans,
    taste: state.taste,
  };
};

export default connect(mapStateToProps, null)(HomePresenter);

// export default HomePresenter;
