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
  const [chests, setChests] = useState("❌");

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

    // var c = "";
    // for (var i = 0; i < one.numChests; i++) {
    //   c += "💰";
    // }

    // setChests(c);
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
        <Link to={"/"}>
          <button className="btn btn-secondary mx-4">Back</button>
        </Link>
        <h2>Pirate Details</h2>
      </div>
      <div className="box0">
        <div className="lr">
          <h1 id="pirate">{one.pirateName}</h1>
          <img src={one.imageUrl} alt="imageUrl" />
          <h1 id="pirate">"{one.catchPhrase}"</h1>
        </div>
        <div className="lr">
          {/* <h1>About</h1> */}
          <table className="table table-sm table-hover ">
            {/* <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead> */}
            <tbody>
              <tr>
                <td className="align-middle text-end">
                  <h4> Position:</h4>
                </td>
                <td className="align-middle">
                  <h4>{one.crewPosition}</h4>
                </td>
                {/* <td className="align-middle"></td> */}
              </tr>
              <tr>
                <td className="align-middle text-end">
                  <h4>Chests:</h4>
                </td>
                <td id="pirate" className="align-middle ">
                  <h3 id="pirate">
                    {/* <span>💰</span>
                    <span>💰</span> */}
                  {[...Array(one.numChests),].map((value, i)=>{ return <field key={i}>💰</field>})
                  }
                  </h3>
                </td>
                {/* <td className="align-middle"></td> */}
              </tr>
              <tr>
                <td className="align-middle text-end">
                  <h4>Pegleg:</h4>
                </td>
                <td className="check-update">
                  <h4>{one.pegLeg ? "✔️" : "❌"}</h4>
                  <button
                    onClick={(event) => onClickHandlerPegLeg(event)}
                    className="btn btn-primary mx-4"
                    name="pegLeg"
                  >
                    Update
                  </button>
                </td>
                {/* <td className="align-middle text-end">
                </td> */}
              </tr>
              <tr>
                <td className="align-middle text-end">
                  <h4>Eyepatch:</h4>
                </td>
                <td className="check-update">
                  <h4>{one.eyePatch ? "✔️" : "❌"}</h4>
                  <button
                    onClick={(event) => onClickHandlerEyePatch(event)}
                    className="btn btn-primary mx-4"
                    name="eyePatch"
                  >
                    Update
                  </button>
                {/* </td>
                <td className="align-middle text-end"> */}
                </td>
              </tr>
              <tr>
                <td className="align-middle text-end">
                  <h4>Hookhand:</h4>
                </td>
                <td className="check-update">
                  <h4>{one.hookHand ? "✔️" : "❌"}</h4>
                  <button
                    onClick={(event) => onClickHandlerHookHand(event)}
                    className="btn btn-primary mx-4"
                    name="hookHand"
                  >
                    Update
                  </button>
                </td>
                {/* <td className="align-middle text-end">
                </td> */}
              </tr>
            </tbody>
          </table>

          <h1>Walk the Plank</h1>
          <Link to={`/`}>
            <button
              onClick={() => {
                onDeleteHandler(one._id, one.pirateName);
              }}
              className="btn btn-danger btn"
            >
              <big>✖</big>
            </button>
          </Link>
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
                  <td className="text-break">
                    {typeof item[1] === "boolean"
                      ? item[1]
                        ? "true"
                        : "false"
                      : item[1]}
                  </td>
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
