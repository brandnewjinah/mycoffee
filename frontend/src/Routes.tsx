import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Home from "./pages/home";

//notes
import Beans from "./pages/notes";
import AddBean from "./pages/notes/add/AddBean";
import AddNote from "./pages/notes/add/AddNote";
import Bean from "./pages/notes/Bean";
import Note from "./pages/notes/Note";

//collection
import Collection from "./pages/collection";

//Recipes
import Recipe from "./pages/recipe";
import Recipes from "./pages/recipes";
import EditRecipe from "./pages/recipe/edit";

//tools
import Tools from "./pages/tools";
import AddTools from "./pages/tools/AddTools";

import Signup from "./pages/user/Signup";
import Login from "./pages/user/Login";
import Setup1 from "./pages/profile/Setup1";
import Suggested from "./pages/Suggested";
import Quiz from "./pages/quiz";
import Add from "./pages/add";
import Edit from "./pages/edit";
import Products from "./pages/products";
import Detail from "./pages/detail";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route exact path="/notes" component={Beans} />
          <Route exact path="/notes/:beanId/" component={Bean} />
          <Route exact path="/notes/:beanId/new" component={AddNote} />

          <Route exact path="/beans/new" component={AddBean} />

          <Route exact path="/note/:beanId/:noteId" component={Note} />
          <Route exact path="/collection" component={Collection} />
          <Route exact path="/recipes" component={Recipes} />
          <Route exact path="/tools" component={Tools} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/setup1" component={Setup1} />
          <Route exact path="/suggested" component={Suggested} />
          <Route exact path="/quiz" component={Quiz} />
          <Route exact path="/add" component={Add} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/products/:id" component={Detail} />
          <Route exact path="/edit/:id" component={Edit} />
          <Route exact path="/tools/add" component={AddTools} />
          <Route exact path="/recipes/add" component={EditRecipe} />
          <Route exact path="/recipe/:id" component={Recipe} />
          <Route exact path="/recipe/edit/:id" component={EditRecipe} />
        </Layout>
      </Switch>
    </Router>
  );
};

export default Routes;
