import React from "react";

const ChestCounter = ({ numChests, onIncrement, onDecrement }) => {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            width: "100%"
        }}>
            <div style={{
                flex: "1 1 auto",
                minWidth: "0",
                minHeight: "40px",
                fontSize: "24px",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexWrap: "nowrap",
                gap: "8px"
            }}>
                {[...Array(numChests)].map((value, i) => {
                    return <span key={i} style={{ flexShrink: 0 }}>💰</span>;
                })}
            </div>
            <div
                role="group"
                className="btn-group-vertical"
                style={{
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                    width: "50px",
                    minWidth: "50px",
                    marginLeft: "auto"
                }}
            >
                <button
                    type="button"
                    onClick={onIncrement}
                    className="btn btn-success btn-sm"
                    disabled={numChests >= 6}
                    style={{ width: "100%", padding: "4px" }}
                >
                    ➕
                </button>
                <button
                    type="button"
                    onClick={onDecrement}
                    className="btn btn-danger btn-sm"
                    disabled={numChests <= 0}
                    style={{ width: "100%", padding: "4px" }}
                >
                    ➖
                </button>
            </div>
        </div>
    );
};

export default ChestCounter;
