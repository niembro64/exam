import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";
import axios from "axios";
import ChestCounter from "../components/ChestCounter";
import { API_URL } from "../config/api";

const Single = (props) => {
    const { _id } = useParams();
    const [one, setOne] = useState({
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

    useEffect(() => {
        axios
            .get(`${API_URL}/api/pirate/${_id}`)
            .then((res) => {
                setOne(res.data);
            })
            .catch((err) => console.error("Error fetching pirate:", err));
    }, [_id]);

    const onDeleteHandler = (_id, pirateName) => {
        if (window.confirm(`Are you sure you want to delete ${pirateName}?`)) {
            axios
                .delete(`${API_URL}/api/pirate/delete/${_id}`)
                .then((res) => res.data)
                .catch((err) => console.error("Error deleting pirate:", err));
        }
    };

    const onClickHandlerPegLeg = (event) => {
        event.preventDefault();

        const copyState = {
            pegLeg: !one.pegLeg,
        };

        setOne({
            ...one,
            pegLeg: !one.pegLeg,
        });

        axios
            .patch(`${API_URL}/api/pirate/update/${_id}`, copyState)
            .then((res) => {
                // Successfully updated
            })
            .catch((err) => {
                console.error("Error updating peg leg:", err);
                if (err.response?.data?.error?.errors) {
                    setError(err.response.data.error.errors);
                }
            });
    };
    const onClickHandlerEyePatch = (event) => {
        event.preventDefault();

        const copyState = {
            eyePatch: !one.eyePatch,
        };

        setOne({
            ...one,
            eyePatch: !one.eyePatch,
        });

        axios
            .patch(`${API_URL}/api/pirate/update/${_id}`, copyState)
            .then((res) => {
                // Successfully updated
            })
            .catch((err) => {
                console.error("Error updating eye patch:", err);
                if (err.response?.data?.error?.errors) {
                    setError(err.response.data.error.errors);
                }
            });
    };
    const onClickHandlerHookHand = (event) => {
        event.preventDefault();

        const copyState = {
            hookHand: !one.hookHand,
        };

        setOne({
            ...one,
            hookHand: !one.hookHand,
        });

        axios
            .patch(`${API_URL}/api/pirate/update/${_id}`, copyState)
            .then((res) => {
                // Successfully updated
            })
            .catch((err) => {
                console.error("Error updating hook hand:", err);
                if (err.response?.data?.error?.errors) {
                    setError(err.response.data.error.errors);
                }
            });
    };

    const onClickHandlerChestMinus = (event) => {
        event.preventDefault();

        const copyState = {
            numChests: one.numChests - 1 < 0 ? 0 : one.numChests - 1,
        };

        setOne({
            ...one,
            numChests: one.numChests - 1 < 0 ? 0 : one.numChests - 1,
        });

        axios
            .patch(`${API_URL}/api/pirate/update/${_id}`, copyState)
            .then((res) => {
                // Successfully updated
            })
            .catch((err) => {
                console.error("Error updating chest count:", err);
                if (err.response?.data?.error?.errors) {
                    setError(err.response.data.error.errors);
                }
            });
    };
    const onClickHandlerChestPlus = (event) => {
        event.preventDefault();

        const copyState = {
            numChests: one.numChests + 1 > 6 ? 6 : one.numChests + 1,
        };

        setOne({
            ...one,
            numChests: one.numChests + 1 > 6 ? 6 : one.numChests + 1,
        });

        axios
            .patch(`${API_URL}/api/pirate/update/${_id}`, copyState)
            .then((res) => {
                // Successfully updated
            })
            .catch((err) => {
                console.error("Error updating chest count:", err);
                if (err.response?.data?.error?.errors) {
                    setError(err.response.data.error.errors);
                }
            });
    };

    return (
        <>
            <div className="box">
                <Link to={"/"}>
                    <button className="btn btn-dark px-4">
                        <big>Back</big>
                    </button>
                </Link>
                <h2>Pirate Details</h2>
            </div>
            <div className="box0">
                <div className="lr">
                    <h1 id="pirate">{one.pirateName}</h1>
                    <img src={one.imageUrl} alt="imageUrl" />
                    <h3 id="pirate">
                        <i>"{one.catchPhrase}"</i>
                    </h3>
                </div>
                <div className="lr2">
                    <Link to={`/`}>
                        <button
                            onClick={() => {
                                onDeleteHandler(one._id, one.pirateName);
                            }}
                            className="btn btn-danger btn my-3"
                        >
                            <h4> Walk the Plank</h4>
                        </button>
                    </Link>
                    <table className="table table-sm table-hover my-3">
                        <tbody>
                            <tr>
                                <td
                                    id="squeezecolumn"
                                    className="align-middle text-end"
                                >
                                    <h4> Position:</h4>
                                </td>
                                <td className="align-middle">
                                    <h4>{one.crewPosition}</h4>
                                </td>
                            </tr>
                            <tr>
                                <td className="align-middle text-end">
                                    <h4>Chests:</h4>
                                </td>
                                <td className="align-middle">
                                    <ChestCounter
                                        numChests={one.numChests}
                                        onIncrement={onClickHandlerChestPlus}
                                        onDecrement={onClickHandlerChestMinus}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="align-middle text-end">
                                    <h4>Pegleg:</h4>
                                </td>
                                <td className="check-update">
                                    <h4>{one.pegLeg ? "✔️" : "❌"}</h4>
                                    <button
                                        onClick={(event) =>
                                            onClickHandlerPegLeg(event)
                                        }
                                        className="btn btn-primary mx-4"
                                        name="pegLeg"
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="align-middle text-end">
                                    <h4>Eyepatch:</h4>
                                </td>
                                <td className="check-update">
                                    <h4>{one.eyePatch ? "✔️" : "❌"}</h4>
                                    <button
                                        onClick={(event) =>
                                            onClickHandlerEyePatch(event)
                                        }
                                        className="btn btn-primary mx-4"
                                        name="eyePatch"
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="align-middle text-end">
                                    <h4>Hookhand:</h4>
                                </td>
                                <td className="check-update">
                                    <h4>{one.hookHand ? "✔️" : "❌"}</h4>
                                    <button
                                        onClick={(event) =>
                                            onClickHandlerHookHand(event)
                                        }
                                        className="btn btn-primary mx-4"
                                        name="hookHand"
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="box2">
                <h4>MongoDB 🍃 {one.pirateName}'s Raw Data</h4>
                <table className="table table-dark table-sm table-hover">
                    <thead>
                        <tr>
                            <th>Key</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(one).map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>{item[0]}</td>
                                    <td className="text-break">
                                        {typeof item[1] === "boolean"
                                            ? item[1]
                                                ? "true"
                                                : "false"
                                            : item[1]}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Single;

// module.exports.findOneSinglePIRATE = (req, res) => {
//     PIRATE.findOne({ _id: req.params._id })
//       .then((oneSinglePIRATE) => res.json(oneSinglePIRATE))
//       .catch((err) =>
//         res.status(400).json({ message: "Something went wrong", error: err })
//       );
//   };
