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

// The debounce function receives our function as a parameter
const debounce = (fn) => {

  // This holds the requestAnimationFrame reference, so we can cancel it if we wish
  let frame;

  // The debounce function returns a new function that can receive a variable number of arguments
  return (...params) => {
    
    // If the frame variable has been defined, clear it now, and queue for next frame
    if (frame) { 
      cancelAnimationFrame(frame);
    }

    // Queue our function call for the next frame
    frame = requestAnimationFrame(() => {
      
      // Call our function and pass any params we received
      fn(...params);
    });

  } 
};


// Reads out the scroll position and stores it in the data attribute
// so we can use it in our stylesheets
const storeScroll = () => {
  document.documentElement.dataset.scroll = window.scrollY;
}

// Listen for new scroll events, here we debounce our `storeScroll` function
document.addEventListener('scroll', debounce(storeScroll), { passive: true });

// Update scroll position for first time
storeScroll();


    return (
        <div className="App">
            <div className="ripple-background"></div>
            <div className="circle xxlarge shade1"></div>
            <div className="circle xlarge shade2"></div>
            <div className="circle large shade3"></div>
            <div className="circle mediun shade4"></div>
            <div className="circle small shade5"></div>
            <div className="btntop">
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
