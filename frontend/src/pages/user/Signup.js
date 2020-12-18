import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

//import styles and assets
import styled from "styled-components";
import { Button } from "../../components/Button";
import { Blob, Blob2 } from "../../assets/Icons";

//import components
import Header from "../../components/Header";
import { Input } from "../../components/Input";

//redux
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

const Signup = (props) => {
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
    confirmpw: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    const userInput = { ...data };
    userInput[input.name] = input.value;
    setData(userInput);
  };

  const validate = () => {
    const errors = {};
    if (data.name === "") {
      errors.name = "Name is required";
    }
    if (!data.email.match(/@/)) {
      errors.email = "Not a valid email address";
    }
    if (data.email === "") {
      errors.email = "Email address is required";
    }
    if (!data.password.match(/.{8}/)) {
      errors.password = "Password must be at least 8 characters long";
    }
    if (data.password === "") {
      errors.password = "Password is required";
    }
    if (data.password !== data.confirmpw || data.confirmpw === "") {
      errors.confirmpw = "Password does not match";
    }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;
    postData();
  };

  const postData = async () => {
    const user = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    props.registerUser(user, props.history);
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
          <h4>Sign up to keep track of your favorite coffee</h4>
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Name"
              type="text"
              name="name"
              value={data.name}
              error={errors.name}
              handleChange={handleChange}
            />
            <Input
              placeholder="Email"
              type="text"
              name="email"
              value={data.email}
              error={errors.email}
              handleChange={handleChange}
            />
            <Input
              placeholder="Password"
              type="password"
              name="password"
              value={data.password}
              error={errors.password}
              handleChange={handleChange}
            />
            <Input
              placeholder="Confirm Password"
              type="password"
              name="confirmpw"
              value={data.confirmpw}
              error={errors.confirmpw}
              handleChange={handleChange}
            />
            <BtnContainer>
              <Button label="Signup" imp="primary" />
            </BtnContainer>
          </form>
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
  width: 100%;
  max-width: 640px;
  height: 100vh;
  padding: 4em;
  margin-top: 8em;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.7);
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2em 0;
`;

Signup.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Signup));
