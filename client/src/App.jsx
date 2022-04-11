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
      <h4 className="align-middle">
        Eric Niemeyer
        <Link to={"/about"}>
          <button className="btn btn-outline-dark btn-sm px-3 mx-2">About This Project</button>
        </Link>
      </h4>
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
