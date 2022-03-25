import React from "react";
import { useEffect, useState, createElement } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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
        <h2>Add Pirate</h2>
        <Link to={"/"}>
          <button className="btn btn-secondary mx-4">Crew Board</button>
        </Link>
        {/* <Link to={`/`}>
          <button
            onClick={() => {
              onDeleteHandler(form._id);
            }}
            className="btn btn-danger mx-4"
          >
            delete
          </button>
        </Link> */}
      </div>

      {/* <div className="box4"> */}
      <form onSubmit={onSubmitHandler} className="box3">
        <div id="floatContainer" className="box4">
          <label
            // style={{ position: "absolute", zIndex: 1 }}
            htmlFor="pirateName"
          >
            pirateName
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
          >
            imageUrl
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
        </div>
        <div id="floatContainer" className="box4">
          <label
            // style={{ position: "absolute", zIndex: 1 }}
            htmlFor="numChests"
          >
            numChests
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
            catchPhrase
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
            crewPosition
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
        <div id="floatContainer" className="box4">
          <label
            // style={{ position: "absolute", zIndex: 1 }}
            htmlFor="pegLeg"
          >
            pegLeg
          </label>
          <input
            // style={{ position: "relative", zIndex: 2 }}
            // autoFocus="autofocus"
            // id="floatField"
            type="checkbox"
            name="pegLeg"
            onClick={onChangeHandlerPegLeg}

            checked={form.pegLeg}
            // placeholder=""
            // default="asdf"
          />
        </div>
        <div id="floatContainer" className="box4">
          <label
            // style={{ position: "absolute", zIndex: 1 }}
            htmlFor="eyePatch"
          >
            eyePatch
          </label>
          <input
            // style={{ position: "relative", zIndex: 2 }}
            // autoFocus="autofocus"
            id="floatField"
            type="checkbox"
            name="eyePatch"
            onClick={onChangeHandlerEyePatch}
            checked={form.eyePatch}

            // placeholder=""
            // default="asdf"
          />
        </div>
        <div id="floatContainer" className="box4">
          <label
            // style={{ position: "absolute", zIndex: 1 }}
            htmlFor="hookHand"
          >
            hookHand
          </label>
          <input
            // style={{ position: "relative", zIndex: 2 }}
            // autoFocus="autofocus"
            id="floatField"
            type="checkbox"
            name="hookHand"
            onClick={onChangeHandlerHookHand}
            checked={form.hookHand}
            // placeholder=""
            // default="asdf"
          />
        </div>
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

        <input type="submit" className="btn btn-primary" />
      </form>
      {/* </div> */}
      <div className="box">
        <p>form</p>
        <p> {form.name}</p>
      </div>
      {/* <div className="box">
        <p>one</p>
        <p> {one.name}</p>

      </div> */}
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
