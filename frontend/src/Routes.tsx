import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import components
import Layout from "./components/Layout";

//import pages
import Home from "./pages/home";
import Signup from "./pages/user/Signup";
import Login from "./pages/user/Login";
import Setup1 from "./pages/profile/Setup1";
import Suggested from "./pages/Suggested";
import Quiz from "./pages/quiz";
import Add from "./pages/add";
import Products from "./pages/products";
import Detail from "./pages/detail";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Layout>
          <Route exact path="/home" component={Home} />
          <Route exact path="/setup1" component={Setup1} />
          <Route exact path="/suggested" component={Suggested} />
          <Route exact path="/quiz" component={Quiz} />
          <Route exact path="/add" component={Add} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/products/:id" component={Detail} />
        </Layout>
      </Switch>
    </Router>
  );
};

export default Routes;
