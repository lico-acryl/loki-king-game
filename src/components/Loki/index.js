import React from "react";
import "./styles.css";
import PropTypes from "prop-types";
import LokiImg from "./loki.png";

const Loki = ({ position }) => {
    const lokiStyle = {
        left: position.x,
        top: position.y,
    };

    return (
        <div className="loki" style={lokiStyle}>
            <img alt="loki" src={LokiImg} />
        </div>
    );
};

Loki.propTypes = {
    position: PropTypes.object.isRequired,
};

export default Loki;
