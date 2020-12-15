import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import components
import Layout from "./components/Layout";

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
import Brew from "./pages/detail/AddNotes.js";
import Tools from "./pages/tools";
import AddTools from "./pages/tools/AddTools";
import Recipe from "./pages/recipe";
import AddRecipe from "./pages/recipe/AddRecipe";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <Layout>
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
          <Route exact path="/addrecipe/" component={AddRecipe} />
          <Route exact path="/recipe/:id" component={Recipe} />
        </Layout>
      </Switch>
    </Router>
  );
};

export default Routes;
