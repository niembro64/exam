import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

require("../demo.gif");

const Add = (props) => {
    const [form, setForm] = useState({
        pirateName: "",
        imageUrl: "",
        numChests: 0,
        catchPhrase: "",
        crewPosition: "",
        pegLeg: false,
        eyePatch: false,
        hookHand: false,
    });
    const [error, setError] = useState({
        pirateName: "init",
        imageUrl: "init",
        numChests: "init",
        catchPhrase: "init",
        crewPosition: "init",
        pegLeg: "init",
        eyePatch: "init",
        hookHand: "init",
    });
    const [react_error, set_react_error] = useState({
        pirateName: "init",
        imageUrl: "init",
        numChests: "init",
        catchPhrase: "init",
        crewPosition: "init",
        pegLeg: "init",
        eyePatch: "init",
        hookHand: "init",
    });

    const history = useHistory();

    const onSubmitHandler = (event) => {
        event.preventDefault();

        axios
            .post("http://localhost:9000/api/pirate/create", form)
            .then((res) => {
                history.push(`/`);
            })
            .catch((err) => {
                setError(err.response.data.error.errors);
            });
    };

    const onChangeHandler = (event) => {
        const newState = {
            ...form,
            [event.target.name]: event.target.value,
        };
        setForm(newState);

        var newErrorValue = "";

        switch (event.target.name) {
            case "pirateName":
                newErrorValue =
                    event.target.value.length < 3
                        ? "Pirate Name must be at least 3 characters"
                        : event.target.value.length > 16
                        ? "Pirate Name can't be more than 16 characters"
                        : "";
                break;
            case "imageUrl":
                newErrorValue =
                    event.target.value.length < 3
                        ? "Image URL must be at least 3 characters"
                        : "";
                break;
            case "catchPhrase":
                newErrorValue =
                    event.target.value.length < 3
                        ? "Catch Phrase must be at least 3 characters"
                        : event.target.value.length > 16
                        ? "Catch Phrase can't be more than 16 characters"
                        : "";
                break;
            case "crewPosition":
                newErrorValue =
                    event.target.value.length < 3
                        ? "Crew Position must be at least 3 characters"
                        : event.target.value.length > 16
                        ? "Crew Position can't be more than 16 characters"
                        : "";
                break;
            case "numChests":
                newErrorValue =
                    event.target.value < 0
                        ? "# Chests can't be negative"
                        : event.target.value > 6
                        ? "# Chests can't be more than 6"
                        : "";
                break;
        }

        const newStateErr = {
            ...react_error,
            [event.target.name]: newErrorValue,
        };
        set_react_error(newStateErr);
    };

    const onChangeHandlerPegLeg = (event) => {
        const newState = {
            ...form,
            pegLeg: !form.pegLeg,
        };
        setForm(newState);
    };
    const onChangeHandlerEyePatch = (event) => {
        const newState = {
            ...form,
            eyePatch: !form.eyePatch,
        };
        setForm(newState);
    };
    const onChangeHandlerHookHand = (event) => {
        const newState = {
            ...form,
            hookHand: !form.hookHand,
        };
        setForm(newState);
    };

    return (
        <>
            <div className="box">
                <Link to={"/"}>
                    <button className="btn btn-dark px-4">
                        <big>Back</big>
                    </button>
                </Link>
                <h2>Add New Pirate</h2>
            </div>
            <div className="validations_outer">
                <div className="validations_box">
                    <h4>Front-End Validations</h4>
                    <p>For User Experience</p>
                    <div className="box7" id="frontendvalidations">
                        {react_error.pirateName === "" ||
                        react_error.pirateName === "init" ? (
                            ""
                        ) : (
                            <p>{react_error.pirateName}</p>
                        )}
                        {react_error.imageUrl === "" ||
                        react_error.imageUrl === "init" ? (
                            ""
                        ) : (
                            <p>{react_error.imageUrl}</p>
                        )}
                        {react_error.catchPhrase === "" ||
                        react_error.catchPhrase === "init" ? (
                            ""
                        ) : (
                            <p>{react_error.catchPhrase}</p>
                        )}
                        {react_error.crewPosition === "" ||
                        react_error.crewPosition === "init" ? (
                            ""
                        ) : (
                            <p>{react_error.crewPosition}</p>
                        )}
                        {react_error.numChests === "" ||
                        react_error.numChests === "init" ? (
                            ""
                        ) : (
                            <p>{react_error.numChests}</p>
                        )}
                    </div>
                </div>
                <div className="validations_box">
                    <h4>Back-End Validations</h4>
                    <p>For Data Integrity</p>
                    <div className="box7" id="backendvalidations">
                        {error.pirateName && error.pirateName.message ? (
                            <span>{error.pirateName.message}</span>
                        ) : (
                            ""
                        )}
                        {error.imageUrl && error.imageUrl.message ? (
                            <span>{error.imageUrl.message}</span>
                        ) : (
                            ""
                        )}
                        {error.catchPhrase && error.catchPhrase.message ? (
                            <span>{error.catchPhrase.message}</span>
                        ) : (
                            ""
                        )}
                        {error.crewPosition && error.crewPosition.message ? (
                            <span>{error.crewPosition.message}</span>
                        ) : (
                            ""
                        )}
                        {error.numChests && error.numChests.message ? (
                            <span>{error.numChests.message}</span>
                        ) : (
                            ""
                        )}
                        {error.pegLeg && error.pegLeg.message ? (
                            <span>{error.pegLeg.message}</span>
                        ) : (
                            ""
                        )}
                        {error.eyePatch && error.eyePatch.message ? (
                            <span>{error.eyePatch.message}</span>
                        ) : (
                            ""
                        )}
                        {error.hookHand && error.hookHand.message ? (
                            <span>{error.hookHand.message}</span>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
            <form onSubmit={onSubmitHandler} className="box3">
                <div id="add_top">
                    <div id="explain_out">
                        <img
                            id="explain_in"
                            loop="infinite"
                            src={require("../demo.gif")}
                            alt="loading..."
                        />
                    </div>
                    <div id="add_right">
                        <div id="floatContainer" className="box4">
                            <label htmlFor="pirateName">Pirate Name</label>
                            <input
                                autoFocus="autofocus"
                                type="text"
                                name="pirateName"
                                onChange={onChangeHandler}
                            />
                        </div>

                        <div className="box4">
                            <label htmlFor="imageUrl" className="control-label">
                                Image Address
                            </label>
                            <input
                                type="url"
                                id="floatField"
                                name="imageUrl"
                                onChange={onChangeHandler}
                            />
                        </div>

                        <div id="floatContainer" className="box4">
                            <label htmlFor="catchPhrase">
                                Catch Phrase
                            </label>
                            <input
                                id="floatField"
                                type="text"
                                name="catchPhrase"
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div id="floatContainer" className="box4">
                            <label htmlFor="crewPosition">
                                Crew Position
                            </label>
                            <input
                                id="floatField"
                                type="text"
                                name="crewPosition"
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div id="floatContainer" className="box4">
                            <label htmlFor="numChests">
                                # Treasure Chests
                            </label>
                            <input
                                id="floatField"
                                type="number"
                                name="numChests"
                                onChange={onChangeHandler}
                            />
                        </div>
                    </div>
                </div>
                <div id="floatContainer" className="box6">
                    <div className="form-check form-switch">
                        <label htmlFor="pegLeg">
                            Peg-Leg
                        </label>
                        <input
                            type="checkbox"
                            name="pegLeg"
                            onChange={onChangeHandlerPegLeg}
                            checked={form.pegLeg}
                            className="form-check-input"
                        />
                    </div>
                </div>
                <div id="floatContainer" className="box6">
                    <div className="form-check form-switch check-lg">
                        <label htmlFor="eyePatch">
                            Eye-Patch
                        </label>
                        <input
                            id="floatField"
                            type="checkbox"
                            name="eyePatch"
                            onChange={onChangeHandlerEyePatch}
                            checked={form.eyePatch}
                            className="form-check-input"
                        />
                    </div>
                </div>
                <div id="floatContainer" className="box6">
                    <div className="form-check form-switch">
                        <label htmlFor="hookHand">
                            Hook-Hand
                        </label>
                        <input
                            id="floatField"
                            type="checkbox"
                            name="hookHand"
                            onChange={onChangeHandlerHookHand}
                            checked={form.hookHand}
                            className="form-check-input"
                        />
                    </div>
                </div>
                <input
                    id="create_pirate"
                    type="submit"
                    value="Create Pirate 🏴‍☠️"
                    className="btn btn-dark btn-lg"
                />
            </form>
        </>
    );
};

export default Add;

// module.exports.updateExistingAUTHOR = (req, res) => {
//   AUTHOR.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true })
//     .then((updatedAUTHOR) => res.json(updatedAUTHOR))
//     .catch((err) =>
//       res.status(400).json({ message: "Something went wrong", error: err })
//     );
// };
