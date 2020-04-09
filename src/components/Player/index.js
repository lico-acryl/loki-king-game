import React from "react";
import PropTypes from "prop-types";
import Loki from "../Loki";

const Player = ({ position }) => {
    return <Loki position={position} />;
};

Player.propTypes = {
    position: PropTypes.object.isRequired,
};

export default Player;
