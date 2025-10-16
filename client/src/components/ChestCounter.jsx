import React from "react";

const ChestCounter = ({ numChests, onIncrement, onDecrement }) => {
    return (
        <div id="chestbig" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <div id="showchests" style={{
                minWidth: "180px",
                width: "180px",
                fontSize: "24px",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center"
            }}>
                {[...Array(numChests)].map((value, i) => {
                    return <span key={i}>💰</span>;
                })}
            </div>
            <div
                id="btngroup"
                role="group"
                className="btn-group-vertical align-middle"
                style={{ marginLeft: "10px", flexShrink: 0 }}
            >
                <button
                    id="btnc"
                    type="button"
                    onClick={onIncrement}
                    className="btn btn-success btn"
                    disabled={numChests >= 6}
                >
                    ➕
                </button>
                <button
                    id="btnc"
                    type="button"
                    onClick={onDecrement}
                    className="btn btn-danger btn"
                    disabled={numChests <= 0}
                >
                    ➖
                </button>
            </div>
        </div>
    );
};

export default ChestCounter;
