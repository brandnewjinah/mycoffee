import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from "./Routes";
import GlobalStyle from "./components/globalStyle";

//redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import createStore from "./store/store";

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
