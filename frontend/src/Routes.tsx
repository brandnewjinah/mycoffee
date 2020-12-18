import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import components
import Layout from "./components/Layout";

import PrivateRoute from "./PrivateRoute";

//import pages
import Home from "./pages/home";
import Collection from "./pages/collection";
import Signup from "./pages/user/Signup";
import Login from "./pages/user/Login";
import Setup1 from "./pages/profile/Setup1";
import Suggested from "./pages/Suggested";
import Quiz from "./pages/quiz";
import Add from "./pages/add";
import Edit from "./pages/edit";
import Products from "./pages/products";
import Detail from "./pages/detail";
import Tools from "./pages/tools";
import AddTools from "./pages/tools/AddTools";

//Recipes
import Recipe from "./pages/recipe";
import Recipes from "./pages/recipes";
import EditRecipe from "./pages/recipe/edit";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <Layout>
          <PrivateRoute exact path="/collection" component={Collection} />
          <PrivateRoute exact path="/setup1" component={Setup1} />
          <PrivateRoute exact path="/suggested" component={Suggested} />
          <PrivateRoute exact path="/quiz" component={Quiz} />
          <PrivateRoute exact path="/add" component={Add} />
          <PrivateRoute exact path="/products" component={Products} />
          <PrivateRoute exact path="/products/:id" component={Detail} />
          <PrivateRoute exact path="/edit/:id" component={Edit} />
          <PrivateRoute exact path="/tools" component={Tools} />
          <PrivateRoute exact path="/tools/add" component={AddTools} />
          <PrivateRoute exact path="/recipes" component={Recipes} />
          <PrivateRoute exact path="/recipes/add" component={EditRecipe} />
          <PrivateRoute exact path="/recipe/:id" component={Recipe} />
          <PrivateRoute exact path="/recipe/edit/:id" component={EditRecipe} />
        </Layout>
      </Switch>
    </Router>
  );
};

export default Routes;
