import React from "react";

const ChestCounter = ({ numChests, onIncrement, onDecrement }) => {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            width: "100%"
        }}>
            {/* Emoji Display Area - with overflow handling */}
            <div style={{
                flex: "1 1 auto",
                minWidth: "0",
                minHeight: "40px",
                fontSize: "24px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap", // Allow wrapping on very small screens
                gap: "0px", // No gap - chests touching
                overflow: "hidden", // Prevent visual overflow
                position: "relative"
            }}>
                {numChests === 0 ? (
                    <span style={{
                        fontSize: "14px",
                        color: "rgba(0, 0, 0, 0.5)",
                        fontStyle: "italic"
                    }}>
                        No chests
                    </span>
                ) : (
                    [...Array(numChests)].map((value, i) => {
                        return <span key={i} style={{ flexShrink: 0 }}>💰</span>;
                    })
                )}
            </div>

            {/* Button Group - Vertical Stack */}
            <div
                role="group"
                aria-label="Chest counter controls"
                className="btn-group-vertical"
                style={{
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    width: "44px",
                    minWidth: "44px", // Better touch target (44x44 minimum)
                    marginLeft: "auto"
                }}
            >
                <button
                    type="button"
                    onClick={onIncrement}
                    className="btn btn-success btn-sm"
                    disabled={numChests >= 6}
                    aria-label="Add treasure chest"
                    title={numChests >= 6 ? "Maximum chests reached (6)" : "Add chest"}
                    style={{
                        width: "100%",
                        padding: "6px 4px",
                        fontSize: "16px",
                        minHeight: "32px"
                    }}
                >
                    ➕
                </button>
                <button
                    type="button"
                    onClick={onDecrement}
                    className="btn btn-danger btn-sm"
                    disabled={numChests <= 0}
                    aria-label="Remove treasure chest"
                    title={numChests <= 0 ? "No chests to remove" : "Remove chest"}
                    style={{
                        width: "100%",
                        padding: "6px 4px",
                        fontSize: "16px",
                        minHeight: "32px"
                    }}
                >
                    ➖
                </button>
            </div>
        </div>
    );
};

export default ChestCounter;
