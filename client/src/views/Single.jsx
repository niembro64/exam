import React from "react";
import { useEffect, useState, createElement } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const p = (a) => {
  console.log(a);
};
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

  const history = useHistory();

  useEffect(() => {
    p("useEffect Running");

    axios
      .get(`http://localhost:9000/api/pirate/${_id}`)
      .then((res) => {
        console.log(res.data);
        setOne(res.data);
      })
      .catch((err) => console.log(err));
  }, [_id]);

  // useEffect(() => {
  //   p("useEffect2 Running");

  //   const copyState = {
  //     pirateName: one.pirateName,
  //     imageUrl: one.imageUrl,
  //     numChests: one.numChests,
  //     catchPhrase: one.catchPhrase,
  //     crewPosition: one.crewPosition,
  //     pegLeg: one.pegLeg,
  //     eyePatch: one.eyePatch,
  //     hookHand: one.hookHand,
  //   };

  //   axios
  //     .patch(`http://localhost:9000/api/pirate/update/${_id}`, copyState)
  //     .then((res) => {
  //       console.log("Edit | onSubmitHandler | Success Submitting")
  //       console.log(res.data);
  //       history.push(`/`);
  //     })
  //     .catch((err) => {
  //       p("Edit | onSubmitHandler | Error");
  //       console.log(err.response.data.error.errors);
  //       setError(err.response.data.error.errors);
  //     });

  // // one.pegLeg, one.eyePatch, one.hookHand
  // }, [one.pegLeg, one.eyePatch, one.hookHand]);

  const onDeleteHandler = (_id, pirateName) => {
    if (window.confirm(`Are you sure you want to delete ${pirateName}?`)) {
      console.log("inside on click delete");
      axios
        .delete(`http://localhost:9000/api/pirate/delete/${_id}`)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }
  };

  const onClickHandlerPegLeg = (event) => {
    event.preventDefault();
    console.log("Single | onClickHandler | Jumped In");

    console.log({ [event.target.name]: event.target.value ? "true" : "false" });

    const copyState = {
      pegLeg: !one.pegLeg,
    };

    setOne({
      ...one,
      pegLeg: !one.pegLeg,
    });

    // setOne({
    //   pirateName: one.pirateName,
    //   imageUrl: one.imageUrl,
    //   numChests: one.numChests,
    //   catchPhrase: one.catchPhrase,
    //   crewPosition: one.crewPosition,
    //   pegLeg: !one.pegLeg,
    //   eyePatch: one.eyePatch,
    //   hookHand: one.hookHand,
    //   // [event.target.name]: !event.target.value,
    // });

    console.log("CopyState:");
    console.log(copyState);

    axios
      .patch(`http://localhost:9000/api/pirate/update/${_id}`, copyState)
      .then((res) => {
        console.log("Single | onClickHandler | Success Submitting");
        console.log(res.data);
        // history.push(`/`);
      })
      .catch((err) => {
        p("Single | onClickHandler | Error");
        console.log(err.response.data.error.errors);
        setError(err.response.data.error.errors);
      });
  };
  const onClickHandlerEyePatch = (event) => {
    event.preventDefault();
    console.log("Single | onClickHandler | Jumped In");

    console.log({ [event.target.name]: event.target.value ? "true" : "false" });

    const copyState = {
      eyePatch: !one.eyePatch,
    };

    setOne({
      ...one,
      eyePatch: !one.eyePatch,
    });
    // setOne({
    //   pirateName: one.pirateName,
    //   imageUrl: one.imageUrl,
    //   numChests: one.numChests,
    //   catchPhrase: one.catchPhrase,
    //   crewPosition: one.crewPosition,
    //   pegLeg: one.pegLeg,
    //   eyePatch: !one.eyePatch,
    //   hookHand: one.hookHand,
    //   // [event.target.name]: !event.target.value,
    // });

    console.log("CopyState:");
    console.log(copyState);

    axios
      .patch(`http://localhost:9000/api/pirate/update/${_id}`, copyState)
      .then((res) => {
        console.log("Single | onClickHandler | Success Submitting");
        console.log(res.data);
        // history.push(`/`);
      })
      .catch((err) => {
        p("Single | onClickHandler | Error");
        console.log(err.response.data.error.errors);
        setError(err.response.data.error.errors);
      });
  };
  const onClickHandlerHookHand = (event) => {
    event.preventDefault();
    console.log("Single | onClickHandler | Jumped In");

    console.log({ [event.target.name]: event.target.value ? "true" : "false" });

    const copyState = {
      hookHand: !one.hookHand,
    };

    setOne({
      ...one,
      hookHand: !one.hookHand,
    });

    console.log("CopyState:");
    console.log(copyState);

    axios
      .patch(`http://localhost:9000/api/pirate/update/${_id}`, copyState)
      .then((res) => {
        console.log("Single | onClickHandler | Success Submitting");
        console.log(res.data);
        // history.push(`/`);
      })
      .catch((err) => {
        p("Single | onClickHandler | Error");
        console.log(err.response.data.error.errors);
        setError(err.response.data.error.errors);
      });
  };

  return (
    <>
      <div className="box">
        <h2>View Pirate Details</h2>
        <Link to={"/"}>
          <button className="btn btn-secondary mx-4">Back to Crew</button>
        </Link>
        {/* <Link to={`/${one._id}/edit`}>
          <button className="btn btn-success mx-4">Edit</button>
        </Link> */}
        <Link to={`/`}>
          <button
            onClick={() => {
              onDeleteHandler(one._id, one.pirateName);
            }}
            className="btn btn-danger mx-4"
          >
            Delete Pirate
          </button>
        </Link>
      </div>
      <div className="box">
        <div className="lr">
          <h1>{one.pirateName}</h1>
          <img src={one.imageUrl} alt="imageUrl" />
          <h1>"{one.catchPhrase}"</h1>
        </div>
        <div className="lr">
          <h1>About</h1>
          <table className="table table-sm table-hover ">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="align-middle p-3">Crew Position:</td>
                <td className="align-middle p-3">{one.crewPosition}</td>
                <td className="align-middle p-3"></td>
              </tr>
              <tr>
                <td className="align-middle">Number of Chests:</td>
                <td className="align-middle">{one.numChests}</td>
                <td className="align-middle p-3"></td>
              </tr>
              <tr>
                <td className="align-middle">Peg-Leg:</td>
                <td className="align-middle">{one.pegLeg ? "Yes" : "No"}</td>
                <td className="align-middle">
                  <button
                    onClick={(event) => onClickHandlerPegLeg(event)}
                    className="btn btn-secondary mx-4"
                    name="pegLeg"
                  >
                    {one.pegLeg ? "No" : "Yes"}
                  </button>
                </td>
              </tr>
              <tr>
                <td className="align-middle">Eye-Patch:</td>
                <td className="align-middle">{one.eyePatch ? "Yes" : "No"}</td>
                <td className="align-middle">
                  <button
                    onClick={(event) => onClickHandlerEyePatch(event)}
                    className="btn btn-secondary mx-4"
                    name="eyePatch"
                  >
                    {one.eyePatch ? "No" : "Yes"}
                  </button>
                </td>
              </tr>
              <tr>
                <td className="align-middle">Hook-Hand:</td>
                <td className="align-middle">{one.hookHand ? "Yes" : "No"}</td>
                <td className="align-middle">
                  <button
                    onClick={(event) => onClickHandlerHookHand(event)}
                    className="btn btn-secondary mx-4"
                    name="hookHand"
                  >
                    {one.hookHand ? "No" : "Yes"}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="box2">
        <h4>Raw MongoDB Pirate Data</h4>
        <table className="table table-sm table-hover ">
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
                  <td>{typeof item[1] === 'boolean' ? (item[1] ? "true" : "false") : item[1]}</td>
                  {/* <td style={{(item[1].length > 10 ? { fontSize: "10px" } : {fontSize = "20px"})}}>
                    {item[1]}
                  </td> */}
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
