import React, { FC } from "react";
import { Link } from "react-router-dom";

//import styles and assets
import styled from "styled-components";

interface Props {
  user?: any;
}

const Header: FC<Props> = (props) => {
  return (
    <Wrapper>
      <Container>
        <Left>Logo</Left>
        <Center>
          <Link to="/">
            <Category>Home</Category>
          </Link>
          <Link to="/">
            <Category>Category</Category>
          </Link>
          <Link to="/">
            <Category>Category</Category>
          </Link>
          <Link to="/">
            <Category>Category</Category>
          </Link>
        </Center>
        <Right className="flex">
          {!props.user && (
            <>
              <Link to="/signup">
                <div>Signup</div>
              </Link>
              <Link to="/login">
                <div>Login</div>
              </Link>
            </>
          )}
          {props.user && <div>Hi, {props.user.name}</div>}
        </Right>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 4em;
  display: flex;
  align-items: center;
  justify-content: center;

  .flex {
    display: flex;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1360px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  padding: 0 2em;
  margin: 0 auto;
`;

const Left = styled.div``;

const Center = styled.div`
  display: flex;
`;

const Category = styled.div`
  margin: 0 2em;
`;

const Right = styled.div`
  div {
    margin-left: 1.5em;
  }
`;

export default Header;
