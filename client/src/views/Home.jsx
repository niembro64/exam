import axios from "axios";
import React, { useEffect, useState, createElement } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Home = (props) => {
  const [dbtest, setDbtest] = useState({ assignment: "none", port: 0 });
  const [form, setForm] = useState({
    name: "",
  });
  const [fromDb, setFromDb] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState({ name: { } });
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
      .get("http://localhost:9000/api/author/")
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
      .post("http://localhost:9000/api/author/create", form)
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

  const onDeleteHandler = (_id, arrIndex, name) => {
    if (window.confirm(`Are you sure you want to delete item ${name}?`)) {
      console.log("inside on click delete");
      axios
        .delete(`http://localhost:9000/api/author/delete/${_id}`)
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
      <Link to={"/add"}>
        <button className="btn btn-primary">New Author</button>
      </Link>
      <form onSubmit={onSubmitHandler} className="box3">
        <div id="floatContainer" className="float-container">
          <label
            style={{ position: "absolute", zIndex: 1 }}
            htmlFor="description"
          >
            Name
          </label>
          <input
            style={{ position: "relative", zIndex: 2 }}
            autoFocus="autofocus"
            id="floatField"
            type="text"
            name="name"
            onChange={onChangeHandler}

            // placeholder=""
            // default="asdf"
          />
        </div>
        <span className="alert-danger">{ error.name && error.name.message}</span>

        <input type="submit" className="btn btn-primary mx-4" />
      </form>

      <div className="box">
        <table className="table table-sm table-hover ">
          <thead>
            <tr>
              {/* <th>ID</th> */}
              {/* <th>#</th> */}
              <th>Name</th>

              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {fromDb.map((item, i) => {
              // console.log(`function run ${i}, item: ${item.name}`);
              return (
                <tr key={i}>
                  {/* <td>{item._id}</td> */}
                  {/* <td>{i + 1}</td> */}
                  <td>{item.name}</td>

                  <td>
                    <Link to={`/${item._id}`}>
                      <button className="btn btn-secondary btn-sm">View</button>
                    </Link>
                  </td>
                  <td>
                    <Link to={`/${item._id}/edit`}>
                      <button className="btn btn-success btn-sm">Edit</button>
                    </Link>
                  </td>
                  <td>
                    <Link to={`/`}>
                      <button
                        onClick={() => onDeleteHandler(item._id, i, item.title)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="box2">
        <p>from Form:</p>
        <div className="box">
          <div className="box2">
            <p>{form.name}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
