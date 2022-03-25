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
    name: "",
  });
  const [error, setError] = useState({ name: {} });

  const history = useHistory();

  useEffect(() => {
    p("useEffect Running");

    axios
      .get(`http://localhost:9000/api/author/${_id}`)
      .then((res) => {
        console.log(res.data);
        // setOne(res.data);
        setForm(res.data);
      })
      .catch((err) => console.log(err.response.data.error.errors));
  }, [_id]);


  const onDeleteHandler = (_id) => {
    if (window.confirm(`Are you sure you want to delete this item?`)) {
      console.log("inside on click delete");
      axios
        .delete(`http://localhost:9000/api/author/delete/${_id}`)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err.response.data.error.errors));
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("Edit | onSubmitHandler | Jumped In")

    const copyState = {
      name: form.name,
    };

    axios
      .patch(`http://localhost:9000/api/author/update/${form._id}`, {name: form.name})
      .then((res) => {
        console.log("Edit | onSubmitHandler | Success Submitting")
        console.log(res.data);
        // history.push(`/`);
      })
      .catch((err) => {
        p("Edit | onSubmitHandler | Error");
        console.log(err.response.data.error.errors);
        setError(err.response.data.error.errors);
      });
  };

  const onChangeHandler = (event) => {
    event.preventDefault();

    // p(event.target.value);
    const newState = {
      ...form,
      [event.target.name]: event.target.value,
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
          <button className="btn btn-secondary mx-4">Cancel</button>
        </Link>
        <h2>Edit</h2>
        <Link to={`/`}>
          <button
            onClick={() => {
              onDeleteHandler(form._id);
            }}
            className="btn btn-danger mx-4"
          >
            delete
          </button>
        </Link>
      </div>

      <form onSubmit={onSubmitHandler} className="box3">
        <div id="floatContainer" className="float-container">
          <label style={{ position: "absolute", zIndex: 1 }} htmlFor="name">
            Name
          </label>
          <input
            style={{ position: "relative", zIndex: 2 }}
            autoFocus="autofocus"
            id="floatField"
            type="text"
            name="name"
            value={form.name}
            onChange={onChangeHandler}

            // placeholder=""
            // default="asdf"
          />
        </div>
        <span className="alert-danger">{error.name && error.name.message}</span>
        <input type="submit" className="btn btn-success mx-4" value="Update"/>
        {/* <input type="submit" className="btn btn-success mx-4" value="Update"/> */}
      </form>
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

// pre backend validations
