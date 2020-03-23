import React, { useState, useMemo } from "react";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import ProductAdd from "./ProductAdd";
import { Basket } from "../view/basket";
import Header from "./Header";
import { UserProfile } from "../view/userProfile";

function Main() {
 

  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/baskets" component={Basket} />
        <Route exact path="/profile" component={UserProfile} />
        <Route exact path="/createproduct" component={ProductAdd} />
      </Switch>
    </div>
  );
}

export default Main;
