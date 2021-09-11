import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import "./App.css";

const NavRoute = ({ exact, path, component: Component }) => (
  <Route
    exact={exact}
    path={path}
    render={(props) =>
      isAuthenticated() ? (
        <div className="container">
          <Component {...props} />
          <Navbar />
          <Sidebar />
        </div>
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Fragment>
            <Switch>
              <NavRoute
                exact
                path="/dashboard"
                component={() => <h1>Olá</h1>}
              />
              <Route exact path="/" component={SignIn} />
              <Route exact path="/signup" component={SignUp} />
              <Route component={NotFound} />
            </Switch>
          </Fragment>
        </BrowserRouter>
      </div>
    );
  }
}
