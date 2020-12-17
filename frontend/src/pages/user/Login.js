import React, { useState } from "react";
import PropTypes from "prop-types";

//import components
import Header from "../../components/Header";
import { Input } from "../../components/Input";

//import styles and assets
import styled from "styled-components";
import { Button } from "../../components/Button";

//redux
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

const Login = (props) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    const userInput = { ...data };
    userInput[input.name] = input.value;
    setData(userInput);
  };

  const validate = () => {
    const errors = {};
    if (data.email === "") {
      errors.email = "Email address is required";
    }
    if (data.password === "") {
      errors.password = "Password is required";
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
      email: data.email,
      password: data.password,
    };

    props.loginUser(user, props.history);
  };

  // useEffect(() => {
  //   if (props.auth.isAuthenticated) {
  //     props.history.push("/home");
  //   }
  // }, []);

  return (
    <Wrapper>
      <Header />
      <Main>
        <Hero>Hero image</Hero>
        <Container>
          <h4>Login</h4>
          <form onSubmit={handleSubmit}>
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
            <BtnContainer>
              <Button label="Login" />
            </BtnContainer>
          </form>
        </Container>
      </Main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const Main = styled.div`
  display: flex;
  height: 100vh;
`;

const Hero = styled.div`
  width: 50%;
  background-color: #d1e6d1;
  margin: 0;

  @media (max-width: 980px) {
    display: none;
  }
`;

const Container = styled.div`
  width: 50%;
  max-width: 640px;
  padding: 4em;

  @media (max-width: 980px) {
    width: 100%;
    padding: 2em;

    h4 {
      text-align: center;
    }
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2em 0;
`;

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
