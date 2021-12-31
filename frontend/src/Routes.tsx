import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import components
import Layout from "./components/layout/Layout";

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
        <Layout>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/collection" component={Collection} />
          <Route exact path="/setup1" component={Setup1} />
          <Route exact path="/suggested" component={Suggested} />
          <Route exact path="/quiz" component={Quiz} />
          <Route exact path="/add" component={Add} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/products/:id" component={Detail} />
          <Route exact path="/edit/:id" component={Edit} />
          <Route exact path="/tools" component={Tools} />
          <Route exact path="/tools/add" component={AddTools} />
          <Route exact path="/recipes" component={Recipes} />
          <Route exact path="/recipes/add" component={EditRecipe} />
          <Route exact path="/recipe/:id" component={Recipe} />
          <Route exact path="/recipe/edit/:id" component={EditRecipe} />
        </Layout>
      </Switch>
    </Router>
  );
};

export default Routes;
