import axios from "axios";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, POST_REGISTRATION } from "./types";

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
