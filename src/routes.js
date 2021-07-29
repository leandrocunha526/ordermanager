import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";

const Routes = () => (
  <BrowserRouter>
    <Fragment>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Fragment>
  </BrowserRouter>
);

export default Routes;
