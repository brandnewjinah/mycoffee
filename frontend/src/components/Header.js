import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//import styles and assets
import styled from "styled-components";
import { Coffee } from "../assets/Icons";
import { gray } from "./Colors";

//redux
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

const Header = (props) => {
  const [open, setOpen] = useState(false);

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
        <div onClick={() => setOpen(false)}>Signup</div>
      </Link>
      <Link to="/login">
        <div onClick={() => setOpen(false)}>Login</div>
      </Link>
    </>
  );

  return (
    <Wrapper open={open}>
      <Container>
        <Left>
          <Link to="/">
            <Coffee width="24" height="24" color={gray.darkergray} stroke="2" />
          </Link>
        </Left>

        <Links open={open}>
          <Center>
            <Link to="/collection">
              <Category onClick={() => setOpen(false)}>My Collection</Category>
            </Link>
            <Link to="/tools">
              <Category onClick={() => setOpen(false)}>My Tools</Category>
            </Link>
            <Link to="/recipes">
              <Category onClick={() => setOpen(false)}>My Recipes</Category>
            </Link>
          </Center>
          <Right>{props.auth.isAuthenticated ? authLinks : guestLinks}</Right>
        </Links>

        <Mobile>
          {open ? (
            <div onClick={() => setOpen(!open)}>Close</div>
          ) : (
            <div onClick={() => setOpen(!open)}>Menu</div>
          )}
        </Mobile>
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
  background-color: ${({ open }) => (open ? "#fff" : null)};
`;

const Container = styled.div`
  width: 100%;
  max-width: 1360px;
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  padding: 0 2em;
`;

const Left = styled.div`
  flex: 1 1 33.33%;
`;

const Links = styled.div`
  display: flex;
  flex: 1 1 66.66%;

  @media (max-width: 980px) {
    height: 100vh;
    flex-direction: column;
    background-color: #fff;
    position: absolute;
    top: 2em;
    left: 0;
    right: 0;
    overflow: hidden;
    padding: 1em;
    text-align: center;
    font-size: 1.75rem;
    font-weight: 500;
    z-index: 2;
    transform: ${({ open }) => (open ? "scale(1)" : "scale(0)")};
    /* transition: all 300ms; */

    a {
      margin: 0.5em;
    }
  }
`;

const Center = styled.div`
  display: flex;

  @media (max-width: 980px) {
    flex-direction: column;
  }
`;

const Category = styled.div`
  margin: 0 2em;
`;

const Right = styled.div`
  display: flex;
  margin-left: auto;

  div {
    margin-left: 1.5em;
  }

  @media (max-width: 980px) {
    flex-direction: column;
    margin-left: 0;
    div {
      margin-left: 0;
    }
  }
`;

const Mobile = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 980px) {
    display: block;
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
