import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Layout from "./components/layout";
import Home from "./pages/home";

//notes
import Notes from "./pages/notes";
import NewNote from "./pages/notes/new";
import NoteList from "./pages/notes/Bean";
import NoteDetails from "./pages/notes/Note";

//beans
import Beans from "./pages/beans";
import NewBean from "./pages/beans/new";
import NewBeanDetails from "./pages/beans/new/AddBeanDetails";
import Bean from "./pages/beans/Bean";

//Recipes
import Recipes from "./pages/recipes";
import AddRecipe from "./pages/recipes/new/AddRecipe";
import AddIngredients from "./pages/recipes/new/AddIngredients";
import AddDirections from "./pages/recipes/new/AddDirections";
import AddRatio from "./pages/recipes/new/AddRatio";
import Recipe from "./pages/recipe";
import EditRecipe from "./pages/recipe/edit";

//tools
import Tools from "./pages/tools";
import AddTools from "./pages/tools/AddTools";

import Signup from "./pages/user/Signup";
import Login from "./pages/user/Login";
import Suggested from "./pages/Suggested";
import Quiz from "./pages/quiz";

import Products from "./pages/products";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route exact path="/notes" component={Notes} />
          <Route exact path="/notes/newbean" component={NewBean} />
          <Route exact path="/notes/b/:beanId/new" component={NewNote} />
          <Route exact path="/note/b/:beanId/:noteId" component={NoteDetails} />
          <Route exact path="/notes/b/:beanId/" component={NoteList} />
          <Route exact path="/beans" component={Beans} />
          <Route exact path="/beans/newbean" component={NewBean} />
          <Route
            exact
            path="/beans/b/:beanId/details"
            component={NewBeanDetails}
          />
          <Route exact path="/beans/b/:beanId" component={Bean} />
          <Route exact path="/recipes" component={Recipes} />
          <Route exact path="/recipes/new" component={AddRecipe} />
          <Route
            exact
            path="/recipes/new/:recipeId/ingredients"
            component={AddIngredients}
          />
          <Route
            exact
            path="/recipes/new/:recipeId/directions"
            component={AddDirections}
          />
          <Route
            exact
            path="/recipes/new/:recipeId/ratio"
            component={AddRatio}
          />
          <Route exact path="/tools" component={Tools} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />

          <Route exact path="/suggested" component={Suggested} />
          <Route exact path="/quiz" component={Quiz} />

          <Route exact path="/products" component={Products} />

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
