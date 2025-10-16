import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Edit = (props) => {
  const { _id } = useParams();
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

  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/author/${_id}`)
      .then((res) => {
        setForm(res.data);
      })
      .catch((err) => console.error("Error fetching author:", err));
  }, [_id]);


  const onDeleteHandler = (_id) => {
    if (window.confirm(`Are you sure you want to delete this item?`)) {
      axios
        .delete(`http://localhost:9000/api/author/delete/${_id}`)
        .then((res) => res.data)
        .catch((err) => console.error("Error deleting author:", err));
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    axios
      .patch(`http://localhost:9000/api/author/update/${form._id}`, {name: form.name})
      .then((res) => {
        history.push(`/`);
      })
      .catch((err) => {
        setError(err.response.data.error.errors);
      });
  };

  const onChangeHandler = (event) => {
    event.preventDefault();

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
          />
        </div>
        <span className="alert-danger">{error.name && error.name.message}</span>
        <input type="submit" className="btn btn-success mx-4" value="Update"/>
      </form>
      <div className="box">
        <p>form</p>
        <p> {form.name}</p>
      </div>
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
