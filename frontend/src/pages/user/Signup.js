import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

//import styles and assets
import styled from "styled-components";
import { Button } from "../../components/Button";

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
      <Header />
      <Main>
        <Hero>Hero image</Hero>
        <Container>
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
              <Button label="Signup" />
            </BtnContainer>
          </form>
        </Container>
      </Main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const Main = styled.div`
  display: flex;
  height: 100vh;
`;

const Hero = styled.div`
  width: 50%;
  background-color: #d1e6d1;
  margin: 0;
`;

const Container = styled.div`
  width: 50%;
  max-width: 640px;
  padding: 4em;
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
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Signup));
