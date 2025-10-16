import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ChestCounter from "../components/ChestCounter";
import { API_URL } from "../config/api";

require("../demo.gif");

const Add = (props) => {
    const [form, setForm] = useState({
        pirateName: "",
        imageUrl: "",
        numChests: 3,
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
            .post(`${API_URL}/api/pirate/create`, form)
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
                        ? "Name must be at least 3 characters"
                        : event.target.value.length > 16
                        ? "Name cannot exceed 16 characters"
                        : "";
                break;
            case "imageUrl":
                // Optional field - only validate if user enters something
                if (event.target.value.trim() !== "") {
                    const urlPattern = /^https?:\/\/.+/i;
                    newErrorValue = !urlPattern.test(event.target.value)
                        ? "Please enter a valid URL (must start with http:// or https://)"
                        : "";
                } else {
                    newErrorValue = ""; // Empty is valid (optional field)
                }
                break;
            case "catchPhrase":
                newErrorValue =
                    event.target.value.length < 3
                        ? "Phrase must be at least 3 characters"
                        : event.target.value.length > 16
                        ? "Phrase cannot exceed 16 characters"
                        : "";
                break;
            case "crewPosition":
                newErrorValue =
                    event.target.value.length < 3
                        ? "Position must be at least 3 characters"
                        : event.target.value.length > 16
                        ? "Position cannot exceed 16 characters"
                        : "";
                break;
        }

        const newStateErr = {
            ...react_error,
            [event.target.name]: newErrorValue,
        };
        set_react_error(newStateErr);
    };

    const onChangeHandlerCheckbox = (event) => {
        const newState = {
            ...form,
            [event.target.name]: !form[event.target.name],
        };
        setForm(newState);
    };

    const onIncrementChests = (event) => {
        event.preventDefault();
        const newValue = form.numChests + 1 > 6 ? 6 : form.numChests + 1;
        setForm({
            ...form,
            numChests: newValue,
        });
        // Clear validation error if value is valid
        if (newValue >= 0 && newValue <= 6) {
            set_react_error({
                ...react_error,
                numChests: "",
            });
        }
    };

    const onDecrementChests = (event) => {
        event.preventDefault();
        const newValue = form.numChests - 1 < 0 ? 0 : form.numChests - 1;
        setForm({
            ...form,
            numChests: newValue,
        });
        // Clear validation error if value is valid
        if (newValue >= 0 && newValue <= 6) {
            set_react_error({
                ...react_error,
                numChests: "",
            });
        }
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
                                placeholder="Enter pirate name (3-16 characters)"
                            />
                            <div className="validation-container">
                                {react_error.pirateName && react_error.pirateName !== "" && react_error.pirateName !== "init" && (
                                    <span className="validation-frontend">{react_error.pirateName}</span>
                                )}
                            </div>
                        </div>

                        <div className="box4">
                            <label htmlFor="imageUrl" className="control-label">
                                Image URL
                            </label>
                            <input
                                type="text"
                                id="floatField"
                                name="imageUrl"
                                onChange={onChangeHandler}
                                placeholder="https://example.com/image.jpg (optional)"
                            />
                            <div className="validation-container">
                                {react_error.imageUrl && react_error.imageUrl !== "" && react_error.imageUrl !== "init" && (
                                    <span className="validation-frontend">{react_error.imageUrl}</span>
                                )}
                            </div>
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
                                placeholder="Enter a memorable phrase (3-16 characters)"
                            />
                            <div className="validation-container">
                                {react_error.catchPhrase && react_error.catchPhrase !== "" && react_error.catchPhrase !== "init" && (
                                    <span className="validation-frontend">{react_error.catchPhrase}</span>
                                )}
                            </div>
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
                                placeholder="e.g., Captain, First Mate, Navigator"
                            />
                            <div className="validation-container">
                                {react_error.crewPosition && react_error.crewPosition !== "" && react_error.crewPosition !== "init" && (
                                    <span className="validation-frontend">{react_error.crewPosition}</span>
                                )}
                            </div>
                        </div>
                        <div id="floatContainer" className="box4">
                            <label htmlFor="numChests">
                                Treasure Chests
                            </label>
                            <ChestCounter
                                numChests={form.numChests}
                                onIncrement={onIncrementChests}
                                onDecrement={onDecrementChests}
                            />
                            <div className="validation-container">
                                {react_error.numChests && react_error.numChests !== "" && react_error.numChests !== "init" && (
                                    <span className="validation-frontend">{react_error.numChests}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div id="floatContainer" className="box6">
                    <div className="form-check form-switch">
                        <label htmlFor="pegLeg">
                            Peg Leg
                        </label>
                        <input
                            type="checkbox"
                            name="pegLeg"
                            onChange={onChangeHandlerCheckbox}
                            checked={form.pegLeg}
                            className="form-check-input"
                        />
                    </div>
                </div>
                <div id="floatContainer" className="box6">
                    <div className="form-check form-switch check-lg">
                        <label htmlFor="eyePatch">
                            Eye Patch
                        </label>
                        <input
                            id="floatField"
                            type="checkbox"
                            name="eyePatch"
                            onChange={onChangeHandlerCheckbox}
                            checked={form.eyePatch}
                            className="form-check-input"
                        />
                    </div>
                </div>
                <div id="floatContainer" className="box6">
                    <div className="form-check form-switch">
                        <label htmlFor="hookHand">
                            Hook Hand
                        </label>
                        <input
                            id="floatField"
                            type="checkbox"
                            name="hookHand"
                            onChange={onChangeHandlerCheckbox}
                            checked={form.hookHand}
                            className="form-check-input"
                        />
                    </div>
                </div>
                <input
                    id="create_pirate"
                    type="submit"
                    value="Create Pirate"
                    className="btn btn-dark btn-lg"
                />

                {/* Backend Validation Section - Below Submit Button */}
                <div className="backend-validation-section">
                    {(error.pirateName && error.pirateName.message) ||
                     (error.imageUrl && error.imageUrl.message) ||
                     (error.catchPhrase && error.catchPhrase.message) ||
                     (error.crewPosition && error.crewPosition.message) ||
                     (error.numChests && error.numChests.message) ||
                     (error.pegLeg && error.pegLeg.message) ||
                     (error.eyePatch && error.eyePatch.message) ||
                     (error.hookHand && error.hookHand.message) ? (
                        <div className="backend-errors-container">
                            <h4 style={{color: "white", textShadow: "0px 0px 10px rgba(0,0,0,0.5)", marginBottom: "12px"}}>Backend Validation Errors</h4>
                            {error.pirateName && error.pirateName.message && (
                                <span className="validation-backend">{error.pirateName.message}</span>
                            )}
                            {error.imageUrl && error.imageUrl.message && (
                                <span className="validation-backend">{error.imageUrl.message}</span>
                            )}
                            {error.catchPhrase && error.catchPhrase.message && (
                                <span className="validation-backend">{error.catchPhrase.message}</span>
                            )}
                            {error.crewPosition && error.crewPosition.message && (
                                <span className="validation-backend">{error.crewPosition.message}</span>
                            )}
                            {error.numChests && error.numChests.message && (
                                <span className="validation-backend">{error.numChests.message}</span>
                            )}
                            {error.pegLeg && error.pegLeg.message && (
                                <span className="validation-backend">{error.pegLeg.message}</span>
                            )}
                            {error.eyePatch && error.eyePatch.message && (
                                <span className="validation-backend">{error.eyePatch.message}</span>
                            )}
                            {error.hookHand && error.hookHand.message && (
                                <span className="validation-backend">{error.hookHand.message}</span>
                            )}
                        </div>
                    ) : null}
                </div>
            </form>
        </>
    );
};

export default Add;
