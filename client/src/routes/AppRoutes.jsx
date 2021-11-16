import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Header } from "../components/Header";
import { HomeScreen } from "../views/HomeScreen";
import { LoginRegisterScreen } from "../views/LoginRegisterScreen";
import { WinesContainer } from "../views/WinesContainer";
import { WinesMain } from "../views/WinesMain";

export const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route exact path="/home">
          <HomeScreen />
        </Route>
        <Route exact path="/register">
          <LoginRegisterScreen />
        </Route>
        <Route exact path="/login">
          <LoginRegisterScreen />
        </Route>
        <Route exact path="/nuevo-vino">
          <WinesContainer />
        </Route>
        <Route exact path="/vino/:id">
          <WinesContainer />
        </Route>
        <Route exact path="/mis-vinos">
          <WinesMain />
        </Route>
      </Switch>
    </Router>
  );
};
