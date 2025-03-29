import "./App.css";
import React from "react";

import Navigation from "../features/navigation/Navigation";
import TaskManagement from "../features/tasks/TaskManagement";
import LoginPage from "../features/user/LoginPage";

import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";

import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  const user = useSelector(selectUser);

 /* if (!user.signedIn) {
    return <LoginPage />;
  }*/
  return (
    <div className="app">
      <BrowserRouter>
        <Route component={Navigation} path="/" />
        <Switch>
          <Route exact component={TaskManagement} path="/tasks" />
          <Route exact component={TaskManagement} path="/office-tasks" />
          <Route exact component={TaskManagement} path="/rooms" />
          <Route exact component={TaskManagement} path="/shopping" />
          <Route exact component={TaskManagement} path="/cleaning" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
