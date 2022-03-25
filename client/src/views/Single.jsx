import React from "react";
import { useEffect, useState, createElement } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Switch, Route, Link } from "react-router-dom";
import axios from "axios";

const p = (a) => {
  console.log(a);
};
const Single = (props) => {
  const { _id } = useParams();
  const [one, setOne] = useState({
    pirateName: "",
    imageUrl: "",
    numChests: "",
    catchPhrase: "",
    crewPosition: "",
    pegLeg: "",
    eyePatch: "",
    hookHand: "",
  });

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

  const onDeleteHandler = (_id) => {
    if (window.confirm(`Are you sure you want to delete this item?`)) {
      console.log("inside on click delete");
      axios
        .delete(`http://localhost:9000/api/pirate/delete/${_id}`)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div className="box">
        <Link to={"/"}>
          <button className="btn btn-secondary mx-4">Back</button>
        </Link>
        <h2>View</h2>
        <Link to={`/${one._id}/edit`}>
          <button className="btn btn-success mx-4">Edit</button>
        </Link>
        <Link to={`/`}>
          <button
            onClick={() => {
              onDeleteHandler(one._id);
            }}
            className="btn btn-danger mx-4"
          >
            delete
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
                <td className="align-middle p-3">Position:</td>
                <td className="align-middle p-3">{one.crewPosition}</td>
                <td className="align-middle p-3"></td>
              </tr>
              <tr>
                <td className="align-middle p-3">crewPosition:</td>
                <td className="align-middle p-3">{one.crewPosition}</td>
                <td className="align-middle p-3"></td>
              </tr>
              <tr>
                <td className="align-middle">numChests:</td>
                <td className="align-middle">{one.numChests}</td>
                <td className="align-middle"><button className="btn btn-secondary mx-4">{one.numChests}</button></td>
              </tr>
              <tr>
                <td className="align-middle">eyePatch</td>
                <td className="align-middle">{one.eyePatch}</td>
                <td className="align-middle"><button className="btn btn-secondary mx-4">{one.eyePatch}</button></td>
              </tr>
              <tr>
                <td className="align-middle">hookHand:</td>
                <td className="align-middle">{one.hookHand}</td>
                <td className="align-middle"><button className="btn btn-secondary mx-4">{one.hookHand}</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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
                <td>{item[1]}</td>
                {/* <td style={{(item[1].length > 10 ? { fontSize: "10px" } : {fontSize = "20px"})}}>
                    {item[1]}
                  </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Single;

// module.exports.findOneSingleAUTHOR = (req, res) => {
//     AUTHOR.findOne({ _id: req.params._id })
//       .then((oneSingleAUTHOR) => res.json(oneSingleAUTHOR))
//       .catch((err) =>
//         res.status(400).json({ message: "Something went wrong", error: err })
//       );
//   };
