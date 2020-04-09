import React from "react";
import "./styles.css";
import PropTypes from "prop-types";
import LicoImg from "./lico.png";

const Lico = ({ position }) => {
    const licoStyle = {
        left: position.x,
        top: position.y,
    };

    return (
        <div className="lico" style={licoStyle}>
            <img alt="lico" src={LicoImg} />
        </div>
    );
};

Lico.propTypes = {
    position: PropTypes.object.isRequired,
};

export default Lico;
