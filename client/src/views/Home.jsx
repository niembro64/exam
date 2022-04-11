import axios from "axios";
import React, { useEffect, useState, createElement } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Home = (props) => {
  const [dbtest, setDbtest] = useState({ assignment: "none", port: 0 });
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
  const [fromDb, setFromDb] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState({ name: {} });
  const history = useHistory();
  // history.push(`/${category}/${detail}`);

  useEffect(() => {
    p("Running useEffect");

    axios
      .get("http://localhost:9000/api")
      .then((res) => {
        // console.log(res);
        setDbtest(res.data);
      })
      .catch((err) => console.log(err));
    // .catch((err) => console.log(err.response.data.err.errors));

    updateFromDb();
    setLoaded(false);
  }, [loaded]);

  const p = (a) => {
    console.log(a);
  };

  const updateFromDb = () => {
    p("Running updateFromDb");
    axios
      .get("http://localhost:9000/api/pirate/")
      .then((res) => {
        // console.log(res.data);
        setFromDb(res.data);
      })
      .catch((err) => console.log(err.response.error.errors));
    // .catch((err) => console.log(err.response.error.errors));
  };

  const onSubmitHandler = (event) => {
    p("Running onSubmitHandler");
    event.preventDefault();

    axios
      .post("http://localhost:9000/api/pirate/create", form)
      .then((res) => {
        console.log(res.data);
        setLoaded(true);
        setError({});
      })
      .catch((err) => {
        p("in OnSubmitHandler Error");
        console.log(err.response.data.error.errors);
        setError(err.response.data.error.errors);
      });
  };

  const onChangeHandler = (event) => {
    p("Running onChangeHandler");
    event.preventDefault();

    // p(event.target.value);
    const newState = {
      ...form,
      [event.target.name]: event.target.value,
    };
    setForm(newState);
  };

  const onDeleteHandler = (_id, arrIndex, pirateName) => {
    if (window.confirm(`Are you sure you want to delete ${pirateName}?`)) {
      console.log("inside on click delete");
      axios
        .delete(`http://localhost:9000/api/pirate/delete/${_id}`)
        .then((res) => {
          console.log(res.data);
          const copyState = [...fromDb];
          copyState.splice(arrIndex, 1);
          setFromDb(copyState);
        })
        .catch((err) => console.log(error.response.data.err.errors));
    }
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
        <h2>🏴‍☠️ Pirate Crew</h2>
        <Link to={"/add"}>
          <button className="btn btn-primary px-4">
            <big>+ Pirate</big>
          </button>
        </Link>
      </div>
      <div className="box">
        <table className="table table-sm table-hover ">
          {/* <thead>
            <tr>
              <th></th>
              <th></th>
              <th>View Pirate</th>
              <th>Walk The Plank</th>
            </tr>
          </thead> */}
          <tbody>
            {fromDb.map((item, i) => {
              return (
                <tr key={i}>
                  <td id="quotes" className="align-middle px-2">
                    <h4 id="pirate" className="text-center pb-0">
                      "{item.catchPhrase}"
                    </h4>
                    <h6 id="pirate" className="text-end pb-0">
                      - {item.pirateName}
                    </h6>
                  </td>
                  <td className="align-middle col-md-auto">
                    {/* <td className="align-middle text-start"> */}
                    <img src={item.imageUrl} alt="pic" />
                  </td>
                  <td id="squeezecolumn" className="align-middle">
                    <div
                      id="btngroup"
                      role="group"
                      class="btn-group-vertical-sm align-middle"
                    >
                      <Link to={`/${item._id}`}>
                        <button id="btn_big" className="btn btn-secondary btn-lg">
                          {/* {item.pirateName} */}
                          {/* <big>👁</big> */}
                          <big>View Pirate</big>
                        </button>
                      </Link>
                      {/* </td>
                  <td className="align-middle"> */}
                      <Link to={`/`}>
                        <button
                        id="btn_big"
                          onClick={() =>
                            onDeleteHandler(item._id, i, item.pirateName)
                          }
                          className="btn btn-danger btn-lg"
                        >
                          <big>Walk the Plank</big>
                        </button>
                      </Link>
                      <Link to={`/${item._id}`}>
                        <button id="btn_small" className="btn btn-secondary">
                          {/* {item.pirateName} */}
                          {/* <big>👁</big> */}
                          <big>View</big>
                        </button>
                      </Link>
                      {/* </td>
                  <td className="align-middle"> */}
                      <Link to={`/`}>
                        <button
                        id="btn_small"
                          onClick={() =>
                            onDeleteHandler(item._id, i, item.pirateName)
                          }
                          className="btn btn-danger"
                        >
                          <big>✖</big>
                        </button>
                      </Link>
                    </div>
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

export default Home;
