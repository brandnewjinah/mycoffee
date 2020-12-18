import axios from "axios";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";

export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("http://localhost:5000/user/signup", userData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const loginUser = (userData, history) => (dispatch) => {
  axios
    .post("http://localhost:5000/user/login", userData)
    .then((res) => {
      const { token } = res.data;

      //set toek to ls
      localStorage.setItem("token", token);

      //set token to Auth header
      setAuthToken(token);

      //decode token to get user data
      const decoded = jwt_decode(token);

      //set current user
      dispatch(setCurrentUser(decoded));

      history.push("/");
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        paylaod: err.response.data,
      })
    );
};
//set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

//Logout
export const logoutUser = () => (dispatch) => {
  //Remove token from localStorage
  localStorage.removeItem("token");

  //Remove auth header for future requests
  setAuthToken(false);

  //Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
