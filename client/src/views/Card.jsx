import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Card = (props) => {
    const [style0, setStyle0] = useState("c0");
    const [style1, setStyle1] = useState("c1");
    const [style2, setStyle2] = useState("c2");
    const [p, setP] = useState("pname");
    const [cp, setCp] = useState("cp");
    const [deleter, setDeleter] = useState("deleter");

    const onMouseEnterEventHandler = () => {
        setStyle0("c0h");
        setStyle1("c1h");
        setStyle2("c2h");
        setP("pnameh");
        setCp("cph");
        setDeleter("deleterh");
    };
    const onMouseLeaveEventHandler = () => {
        setStyle0("c0");
        setStyle1("c1");
        setStyle2("c2");
        setP("pname");
        setCp("cp");
        setDeleter("deleter");
    };

    const onDeleteHandler = (pirateId, pirateName) => {
        if (window.confirm(`Are you sure you want to delete ${pirateName}?`)) {
            axios
                .delete(`http://localhost:9000/api/pirate/delete/${pirateId}`)
                .then((res) => {
                    window.location.reload(false);
                })
                .catch((err) => console.error("Error deleting pirate:", err));
        }
    };

    return (
        <>
            <Link
                to={`/${props.pirateId}`}
                id="cardoutline"
                onMouseEnter={onMouseEnterEventHandler}
                onMouseLeave={onMouseLeaveEventHandler}
            >
                <div
                    id="card"
                    style={{ backgroundImage: `url(${props.imageUrl})` }}
                >
                    <div className={style0} id="base0">
                        <h1 id={p}>{props.pirateName}</h1>
                        <h1 id={cp}>
                            <small>
                                <i>"{props.catchPhrase}"</i>
                            </small>
                        </h1>
                    </div>
                    <div className={style1} id="base1"></div>
                    <div className={style2} id="base2"></div>
                    <Link to={`/`} id={deleter}>
                        <button
                            onClick={() => {
                                onDeleteHandler(
                                    props.pirateId,
                                    props.pirateName
                                );
                            }}
                            className="btn btn-danger btn"
                        >
                            <span> Walk the Plank</span>
                        </button>
                    </Link>
                </div>
            </Link>
        </>
    );
};

export default Card;
