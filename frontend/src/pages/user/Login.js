import React, { useState } from "react";
import PropTypes from "prop-types";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

//import components
import Header from "../../components/layout/Header";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

//import styles and assets
import styled from "styled-components";
import { Blob, Blob2 } from "../../assets/Icons";

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

  const responseGoogle = (response) => {
    console.log("GOOGLE", response);
  };

  const responseFacebook = (response) => {
    console.log("FACEBOOK", response);

    // sendGoogleToken(response.tokenId)
  };

  // const sendGoogleToken = (tokenId) => {

  // }

  // useEffect(() => {
  //   if (props.auth.isAuthenticated) {
  //     props.history.push("/home");
  //   }
  // }, []);

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
              <Button label="Login" imp="primary" />
            </BtnContainer>
          </form>

          <GoogleLogin
            clientId={`958964886171-7i38qs8htg06ihrfaa2bj59ci5rmhgkd.apps.googleusercontent.com`}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
            render={(renderProps) => (
              <Button
                label="Google Login"
                handleClick={renderProps.onClick}
                disabled={renderProps.disabled}
              />
            )}
          />
          <FacebookLogin
            appId={`392528391907770`}
            autoLoad={false}
            callback={responseFacebook}
            render={(renderProps) => (
              <Button
                label="Facebook Login"
                handleClick={renderProps.onClick}
              />
            )}
          />
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
