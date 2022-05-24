import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";
import Home from "./views/Home";
import Single from "./views/Single";
import Edit from "./views/Edit";
import Add from "./views/Add";
import About from "./views/About";

function App() {
  return (
    <div className="App">
      <div className="d-flex">
        <a className="bbb" href="http://44.201.88.86/about">
          <p className="bbbt">About Pirates</p>
        </a>

        <a className="bbb" href="http://52.70.161.67/projects">
          <p className="bbbt">Projects Home</p>
        </a>

        {/* <a className="btn btn-light btn-sm px-3 mx-2" href="http://44.201.88.86/about">About Pirate Crew</a>
        <a className="btn btn-light btn-sm px-3 mx-2" href="http://52.70.161.67/projects">Eric Niemeyer Projects</a> */}
      </div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/add">
          <Add />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/:_id">
          <Single />
        </Route>
        <Route exact path="/:_id/edit">
          <Edit />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
