import React, { Fragment, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard/Dashboard";
import UsersTable from "./pages/User/UsersTable";
import EditUser from "./pages/User/EditUser";
import Machine from "./pages/Machine/MachineTable";

import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";

import "./App.css";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const PrivateRoute = ({ exact, path, component: Component }) => (
    <Route
      exact={exact}
      path={path}
      render={(props) =>
        isAuthenticated() ? (
          <div className="container">
            <Component {...props} />
            <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
          </div>
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
  return (
    <div className="App">
      <BrowserRouter>
        <Fragment>
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/users" component={UsersTable} />
            <PrivateRoute path="/user/edit/:id" component={EditUser} />
            <PrivateRoute path="/machine" component={Machine} />
            <Route exact path="/" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route component={NotFound} exact path="*" />
          </Switch>
        </Fragment>
      </BrowserRouter>
    </div>
  );
};

export default App;
