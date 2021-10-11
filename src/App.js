import React, { Fragment, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import NotFound from "./pages/NotFound";

import Dashboard from "./pages/Dashboard/Dashboard";

import UsersTable from "./pages/User/UsersTable";
import EditUser from "./pages/User/EditUser";

import AgriculturalInput from "./pages/AgriculturalInput/AgriculturalInput";
import AgriculturalInputEdit from "./pages/AgriculturalInput/AgriculturalInputEdit";
import AgriculturalInputTable from "./pages/AgriculturalInput/AgriculturalInputTable";

import Machine from "./pages/Machine/Machine";
import MachineTable from "./pages/Machine/MachineTable";
import MachineEdit from "./pages/Machine/MachineEdit";

import Manufacturer from "./pages/Manufacturer/Manufacturer";
import ManufacturerTable from "./pages/Manufacturer/ManufacturerTable";
import ManufacturerEdit from "./pages/Manufacturer/ManufacturerEdit";

import Employee from "./pages/Employee/Employee";
import EmployeeTable from "./pages/Employee/EmployeeTable";
import EmployeeEdit from "./pages/Employee/EmployeeEdit";

import Provider from "./pages/Provider/Provider";
import ProviderTable from "./pages/Provider/ProviderTable";
import ProviderEdit from "./pages/Provider/ProviderEdit";

import ModelMachine from "./pages/Models/ModelMachine";
import ModelMachineTable from "./pages/Models/ModelMachineTable";
import ModelMachineEdit from "./pages/Models/ModelMachineEdit";

import Order from "./pages/Order/Order";
import OrderTable from "./pages/Order/OrderTable";
import OrderFormEdit from "./pages/Order/OrderFormEdit";

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
            <PrivateRoute exact path="/users/list" component={UsersTable} />
            <PrivateRoute path="/user/edit/:id" component={EditUser} />
            <PrivateRoute path="/machine/register" component={Machine} />
            <PrivateRoute path="/machine/list" component={MachineTable} />
            <PrivateRoute path="/machine/edit/:id" component={MachineEdit} />
            <PrivateRoute path="/manufacturer/register" component={Manufacturer} />
            <PrivateRoute path="/manufacturer/list" component={ManufacturerTable} />
            <PrivateRoute path="/manufacturer/edit/:id" component={ManufacturerEdit} />
            <PrivateRoute path="/employee/register" component={Employee} />
            <PrivateRoute path="/employee/list" component={EmployeeTable} />
            <PrivateRoute path="/employee/edit/:id" component={EmployeeEdit} />
            <PrivateRoute path="/provider/register" component={Provider} />
            <PrivateRoute path="/provider/list" component={ProviderTable} />
            <PrivateRoute path="/provider/edit/:id" component={ProviderEdit} />
            <PrivateRoute path="/models/register" component={ModelMachine} />
            <PrivateRoute path="/models" component={ModelMachineTable} />
            <PrivateRoute path="/model/edit/:id" component={ModelMachineEdit} />
            <PrivateRoute path="/agriculturalinput/register" component={AgriculturalInput} />
            <PrivateRoute path="/agriculturalinput/list" component={AgriculturalInputTable} />
            <PrivateRoute path="/agriculturalinput/edit/:id" component={AgriculturalInputEdit} />
            <PrivateRoute path="/orders/register" component={Order} />
            <PrivateRoute path="/orders/list" component={OrderTable} />
            <PrivateRoute path="/orders/edit/:id" component={OrderFormEdit} />
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
