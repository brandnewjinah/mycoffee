import React, { FC } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//import styles and assets
import styled from "styled-components";

//redux
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

const Header = (props) => {
  const onLogoutClick = (e) => {
    // e.preventDefault();
    props.logoutUser();
  };

  const authLinks = (
    <>
      <div>Hi, {props.auth.user.name}</div>
      <div onClick={onLogoutClick}>Logout</div>
    </>
  );

  const guestLinks = (
    <>
      <Link to="/signup">
        <div>Signup</div>
      </Link>
      <Link to="/login">
        <div>Login</div>
      </Link>
    </>
  );

  return (
    <Wrapper>
      <Container>
        <Left>Logo</Left>
        <Center>
          <Link to="/home">
            <Category>My Collection</Category>
          </Link>
          <Link to="/products">
            <Category>Coffee</Category>
          </Link>
          <Link to="/">
            <Category>Category</Category>
          </Link>
          <Link to="/">
            <Category>Category</Category>
          </Link>
        </Center>
        <Right className="flex">
          {props.auth.isAuthenticated ? authLinks : guestLinks}
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

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Header);
