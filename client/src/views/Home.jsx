import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";

const Home = (props) => {
    const [fromDb, setFromDb] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        updateFromDb();
        setLoaded(false);
    }, [loaded]);

    const updateFromDb = () => {
        axios
            .get("http://localhost:9000/api/pirate/")
            .then((res) => {
                setFromDb(res.data);
            })
            .catch((err) => console.error("Error fetching pirates:", err));
    };

    const onDeleteHandler = (_id, arrIndex, pirateName) => {
        if (window.confirm(`Are you sure you want to delete ${pirateName}?`)) {
            axios
                .delete(`http://localhost:9000/api/pirate/delete/${_id}`)
                .then((res) => {
                    const copyState = [...fromDb];
                    copyState.splice(arrIndex, 1);
                    setFromDb(copyState);
                })
                .catch((err) => console.error("Error deleting pirate:", err));
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
            const floatContainers =
                document.querySelectorAll(".float-container");

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
                <h2> Pirate Crew 🏴‍☠️</h2>
                <Link to={"/add"}>
                    <button className="btn btn-dark px-4">
                        <big>+ Pirate</big>
                    </button>
                </Link>
            </div>
            <div className="main">
                {fromDb.map((item, i) => {
                    return (
                        <Card
                            key={i}
                            pirateId={item._id}
                            catchPhrase={item.catchPhrase}
                            pirateName={item.pirateName}
                            imageUrl={item.imageUrl}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default Home;
