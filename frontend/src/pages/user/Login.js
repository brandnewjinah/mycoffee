import React, { useState } from "react";
import axios from "axios";

//import components
import Header from "../../components/Header";
import Input from "../../components/Input";

//import styles and assets
import styled from "styled-components";
import { Button } from "../../components/Button";

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

    await axios
      .post("http://localhost:5000/user/login", user)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          const token = res.data.token;
          localStorage.setItem("token", token);
          window.location = "/quiz";
          alert("Logged in successfully");
        }
      })
      .catch((err) => {
        alert("Wrong email or password");
      });
  };

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

export default Login;
