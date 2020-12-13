import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from "./Routes";
import GlobalStyle from "./components/globalStyle";
// import jwt_decode from "jwt-decode";

//redux
import { Provider } from "react-redux";
import createStore from "./store";
import { PersistGate } from "redux-persist/es/integration/react";
// import setAuthToken from "./utils/setAuthToken";
// import { logoutUser, setCurrentUser } from "./actions/authActions";

// //check for token
// if (localStorage.jwtToken) {
//   //set auth token header auth
//   setAuthToken(localStorage.jwtToken);
//   //decode token and get user info and exp
//   const decoded = jwt_decode(localStorage.jwtToken);
//   //set user and isAuthenticated
//   store.dispatch(setCurrentUser(decoded));

//   //check for expired token
//   const currentTime = Date.now() / 1000;
//   if (decoded.exp < currentTime) {
//     //Logout user
//     store.dispatch(logoutUser());

//     //todo: clear current profile

//     //redirect to login
//     window.location.href = "/login";
//   }
// }

const { store, persistor } = createStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalStyle />
      <Routes />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
