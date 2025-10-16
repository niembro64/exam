import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import Single from "./views/Single";
import Edit from "./views/Edit";
import Add from "./views/Add";
import About from "./views/About";

function App() {
    // Debounce function for scroll performance optimization
    const debounce = (fn) => {
        let frame;
        return (...params) => {
            if (frame) {
                cancelAnimationFrame(frame);
            }
            frame = requestAnimationFrame(() => {
                fn(...params);
            });
        };
    };

    const storeScroll = () => {
        document.documentElement.dataset.scroll = window.scrollY;
    };

    document.addEventListener("scroll", debounce(storeScroll), {
        passive: true,
    });

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
                <a className="bbb" href="https://pirates.niembro64.com/about">
                    <p className="bbbt">About Pirates</p>
                </a>

                <a className="bbb" href="https://niembro64.com/projects">
                    <p className="bbbt">Projects Home</p>
                </a>
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
