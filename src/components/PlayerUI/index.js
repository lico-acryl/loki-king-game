import React from "react";
import "./styles.css";
import PropTypes from "prop-types";

const PlayerUI = ({ hp }) => {
    return (
        <div className="player-ui">
            <div
                className="hp"
                style={{ width: `${hp}px`, backgroundColor: "#ff7675" }}
            >
                HP
            </div>
        </div>
    );
};

PlayerUI.propTypes = {
    hp: PropTypes.number.isRequired,
};

export default PlayerUI;
