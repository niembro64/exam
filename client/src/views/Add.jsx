import React from "react";
import { useEffect, useState, createElement } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";



require("../demo.gif");

const p = (a) => {
  console.log(a);
};
const Edit = (props) => {
  const { _id } = useParams();
  // const [one, setOne] = useState({
  //   name: "default",

  // });
  const [form, setForm] = useState({
    pirateName: "",
    imageUrl: "",
    numChests: 0,
    catchPhrase: "",
    crewPosition: "",
    pegLeg: true,
    eyePatch: true,
    hookHand: true,
  });
  const [error, setError] = useState({ name: {} });

  const history = useHistory();

  const onSubmitHandler = (event) => {
    p("Running onSubmitHandler");
    event.preventDefault();

    axios
      .post("http://localhost:9000/api/pirate/create", form)
      .then((res) => {
        console.log(res.data);
        history.push(`/`);
      })
      .catch((err) => {
        p("in OnSubmitHandler Error");
        console.log(err.response.data.error.errors);
        setError(err.response.data.error.errors);
      });
  };

  const onChangeHandler = (event) => {
    // event.preventDefault();
    console.log("On change handler");
    // p(event.target.value);
    const newState = {
      ...form,
      [event.target.name]: event.target.value,
    };
    setForm(newState);
  };
  const onChangeHandlerPegLeg = (event) => {
    // event.preventDefault();
    console.log("On change handler");
    // p(event.target.value);
    const newState = {
      ...form,
      pegLeg: !form.pegLeg,
    };
    setForm(newState);
  };
  const onChangeHandlerEyePatch = (event) => {
    // event.preventDefault();
    console.log("On change handler");
    // p(event.target.value);
    const newState = {
      ...form,
      eyePatch: !form.eyePatch,
    };
    setForm(newState);
  };
  const onChangeHandlerHookHand = (event) => {
    // event.preventDefault();
    console.log("On change handler");
    // p(event.target.value);
    const newState = {
      ...form,
      hookHand: !form.hookHand,
    };
    setForm(newState);
  };

  const FloatLabel = (() => {
    // add active class
    const handleFocus = (e) => {
      const target = e.target;
      target.parentNode.classList.add("active");
      target.setAttribute(
        "placeholder",
        target.getAttribute("data-placeholder")
      );
    };

    // remove active class
    const handleBlur = (e) => {
      const target = e.target;
      if (!target.value) {
        target.parentNode.classList.remove("active");
      }
      target.removeAttribute("placeholder");
    };

    // register events
    const bindEvents = (element) => {
      const floatField = element.querySelector("input");
      floatField.addEventListener("focus", handleFocus);
      floatField.addEventListener("blur", handleBlur);
    };

    // get DOM elements
    const init = () => {
      const floatContainers = document.querySelectorAll(".float-container");

      floatContainers.forEach((element) => {
        if (element.querySelector("input").value) {
          element.classList.add("active");
        }

        bindEvents(element);
      });
    };

    return {
      init: init,
    };
  })();

  FloatLabel.init();

  return (
    <>
      <div className="box">
        <Link to={"/"}>
          <button className="btn btn-secondary px-4"><big>Back</big></button>
        </Link>
        <h2>Add New Pirate</h2>
      </div>
      <div></div>
      <form onSubmit={onSubmitHandler} className="box3">
        <div id="add_top">
          <div id="explain_out">
            <img
              id="explain_in"
              loop="infinite"
              src={require("../demo.gif")}
              alt="loading..."
            />
            {/* <p className="text-muted small">Walk-Thru</p> */}
          </div>
          <div id="add_right">
            <div id="floatContainer" className="box4">
              <label
                // style={{ position: "absolute", zIndex: 1 }}
                htmlFor="pirateName"
              >
                Pirate Name
              </label>
              <input
                // style={{ position: "relative", zIndex: 2 }}
                autoFocus="autofocus"
                id="floatField"
                type="text"
                name="pirateName"
                onChange={onChangeHandler}

                // placeholder=""
                // default="asdf"
              />
            </div>
            {/* <div id="floatContainer" className="float-container"> */}
            <div className="box4">
              <label
                // style={{ position: "absolute", zIndex: 1 }}
                htmlFor="imageUrl"
                className="control-label"
              >
                Image URL <span className="text-muted small">(Address)</span>
              </label>
              <input
                // style={{ position: "relative", zIndex: 2 }}
                // autoFocus="autofocus"
                id="floatField"
                type="text"
                name="imageUrl"
                onChange={onChangeHandler}
                // placeholder=""

                // placeholder=""
                // default="asdf"
              />
              {/* <span className="text-muted small">
                Right-Click And Copy & Paste the "Image URL" (Link) Here
              </span>
              <span className="text-muted small">Not All Links Will Work</span> */}
            </div>
            <p className="text-muted small">Not All Images Will Work</p>
            <div id="floatContainer" className="box4">
              <label
                // style={{ position: "absolute", zIndex: 1 }}
                htmlFor="numChests"
              >
                # Treasure Chests?
              </label>
              <input
                // style={{ position: "relative", zIndex: 2 }}
                // autoFocus="autofocus"
                id="floatField"
                type="number"
                name="numChests"
                onChange={onChangeHandler}

                // placeholder=""
                // default="asdf"
              />
            </div>
            <div id="floatContainer" className="box4">
              <label
                // style={{ position: "absolute", zIndex: 1 }}
                htmlFor="catchPhrase"
              >
                His Catch Phrase?
              </label>
              <input
                // style={{ position: "relative", zIndex: 2 }}
                // autoFocus="autofocus"
                id="floatField"
                type="text"
                name="catchPhrase"
                onChange={onChangeHandler}

                // placeholder=""
                // default="asdf"
              />
            </div>
            <div id="floatContainer" className="box4">
              <label
                // style={{ position: "absolute", zIndex: 1 }}
                htmlFor="crewPosition"
              >
                His Crew Position?
              </label>
              <input
                // style={{ position: "relative", zIndex: 2 }}
                // autoFocus="autofocus"
                id="floatField"
                type="text"
                name="crewPosition"
                onChange={onChangeHandler}

                // placeholder=""
                // default="asdf"
              />
            </div>
          </div>
        </div>
        <div id="floatContainer" className="box6">
          <div class="form-check form-switch">
            <label
              // style={{ position: "absolute", zIndex: 1 }}
              htmlFor="pegLeg"
            >
              Has a Peg-Leg?
            </label>
            <input
              // style={{ position: "relative", zIndex: 2 }}
              // autoFocus="autofocus"
              // id="floatField"
              type="checkbox"
              name="pegLeg"
              onClick={onChangeHandlerPegLeg}
              checked={form.pegLeg}
              className="form-check-input"
              // placeholder=""
              // default="asdf"
            />
          </div>
        </div>
        <div id="floatContainer" className="box6">
          <div class="form-check form-switch check-lg">
            <label
              // style={{ position: "absolute", zIndex: 1 }}
              htmlFor="eyePatch"
            >
              Has an Eye-Patch?
            </label>
            <input
              // style={{ position: "relative", zIndex: 2 }}
              // autoFocus="autofocus"
              id="floatField"
              type="checkbox"
              name="eyePatch"
              onClick={onChangeHandlerEyePatch}
              checked={form.eyePatch}
              className="form-check-input"

              // placeholder=""
              // default="asdf"
            />
          </div>
        </div>
        <div id="floatContainer" className="box6">
          <div class="form-check form-switch">
            <label
              // style={{ position: "absolute", zIndex: 1 }}
              htmlFor="hookHand"
            >
              Has a Hook-Hand?
            </label>
            <input
              // style={{ position: "relative", zIndex: 2 }}
              // autoFocus="autofocus"
              id="floatField"
              type="checkbox"
              name="hookHand"
              onClick={onChangeHandlerHookHand}
              checked={form.hookHand}
              className="form-check-input"

              // placeholder=""
              // default="asdf"
            />
          </div>
        </div>
        <div className="box7">
          <span className="alert-danger">
            {error.pirateName && error.pirateName.message}
          </span>
          <span className="alert-danger">
            {error.imageUrl && error.imageUrl.message}
          </span>
          <span className="alert-danger">
            {error.numChests && error.numChests.message}
          </span>
          <span className="alert-danger">
            {error.catchPhrase && error.catchPhrase.message}
          </span>
          <span className="alert-danger">
            {error.crewPosition && error.crewPosition.message}
          </span>
          <span className="alert-danger">
            {error.pegLeg && error.pegLeg.message}
          </span>
          <span className="alert-danger">
            {error.eyePatch && error.eyePatch.message}
          </span>
          <span className="alert-danger">
            {error.hookHand && error.hookHand.message}
          </span>
        </div>
        <input
          type="submit"
          value="Create Pirate 🏴‍☠️"
          className="btn btn-primary btn-lg"
        />
        
      </form>
    </>
  );
};

export default Edit;

// module.exports.updateExistingAUTHOR = (req, res) => {
//   AUTHOR.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true })
//     .then((updatedAUTHOR) => res.json(updatedAUTHOR))
//     .catch((err) =>
//       res.status(400).json({ message: "Something went wrong", error: err })
//     );
// };
