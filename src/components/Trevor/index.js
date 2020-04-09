import React from "react";
import "./styles.css";
import PropTypes from "prop-types";
import TrevorImg from "./trevor.png";

const Trevor = ({ position }) => {
    const trevorStyle = {
        left: position.x,
        top: position.y,
    };

    return (
        <div className="trevor" style={trevorStyle}>
            <img alt="trevor" src={TrevorImg} />
        </div>
    );
};

Trevor.propTypes = {
    position: PropTypes.object.isRequired,
};

export default Trevor;
