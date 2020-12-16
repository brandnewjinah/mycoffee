import React from "react";
import { Link, useHistory } from "react-router-dom";

//import components
import Header from "../../components/Header";
import { Button, BtnText } from "../../components/Button";

//redux
// import { connect } from "react-redux";

//import styles and assets
import styled from "styled-components";
import { Blob, Blob2 } from "../../assets/Icons";

const HomePresenter = (props) => {
  const history = useHistory();
  const handleProfile = () => {
    history.push("/collection");
  };

  return (
    <Wrapper>
      <Top>
        <Header />
      </Top>
      <Container>
        <div className="blob1">
          <Blob width="800" height="800" fill="#ffbd59" />
        </div>
        <div className="blob2">
          <Blob2 width="600" height="600" fill="#d3b88c" />
        </div>
        <Main>
          <h1>Home Barista</h1>
          <h4>This is where I keep track of all my coffee things</h4>
          <Link to="/quiz">
            <div className="btnContainer">
              <Button label="Take Quiz" imp="primary" />
            </div>
          </Link>
          <BtnText label="View My Profile" handleClick={handleProfile} />
        </Main>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #feead4;
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 1;
`;

const Top = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  .blob1 {
    position: absolute;
    top: 0;
    left: 0;
    margin-top: -10%;
    margin-left: -10%;
  }

  .blob2 {
    position: absolute;
    bottom: 0;
    right: 0;
    margin-bottom: -10%;
    margin-right: -10%;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;

  h1 {
    text-align: center;
  }

  h4 {
    margin: 0.5em;
  }

  .btnContainer {
    margin: 1.5em;
    cursor: pointer;
  }
`;

export default HomePresenter;
