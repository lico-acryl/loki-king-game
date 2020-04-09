import React, { useState, useEffect, useReducer } from "react";
import "./styles.css";
import MobSpawnManager from "../../mob/MobSpawnManager";
import Player from "../Player";
import Lico from "../Lico";
import Trevor from "../Trevor";
import PlayerUI from "../PlayerUI";

const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;
const KEY_LEFT = 37;

const PLAYER_INIT_KEY_STATUS = {
    keyUp: false,
    keyDown: false,
    keyLeft: false,
    keyRight: false,
};
const PLAYER_INIT_POSITION = { x: 400, y: 400 };
const MOVE_PLAYER_ACTION_KEY_UP = 38;
const MOVE_PLAYER_ACTION_KEY_RIGHT = 39;
const MOVE_PLAYER_ACTION_KEY_DOWN = 40;
const MOVE_PLAYER_ACTION_KEY_LEFT = 37;

const movePlayerReducer = (state, action) => {
    switch (action.type) {
        case MOVE_PLAYER_ACTION_KEY_UP:
            return {
                ...state,
                y: state.y - 10,
            };
        case MOVE_PLAYER_ACTION_KEY_DOWN:
            return {
                ...state,
                y: state.y + 10,
            };
        case MOVE_PLAYER_ACTION_KEY_LEFT:
            return {
                ...state,
                x: state.x - 10,
            };
        case MOVE_PLAYER_ACTION_KEY_RIGHT:
            return {
                ...state,
                x: state.x + 10,
            };
        default:
            return state;
    }
};

const Game = () => {
    const [keyStatus, setKeyStatus] = useState(PLAYER_INIT_KEY_STATUS);
    const [playerPos, movePlayer] = useReducer(
        movePlayerReducer,
        PLAYER_INIT_POSITION
    );
    const [mobs, setMobs] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [mobSpawnManager, setMobSpawnManager] = useState(
        new MobSpawnManager(
            document.documentElement.clientWidth,
            document.documentElement.clientHeight,
            50
        )
    );

    useEffect(() => {
        const keyDownController = (e) => {
            switch (e.keyCode) {
                case KEY_UP:
                    if (!keyStatus.keyUp) {
                        setKeyStatus({ ...keyStatus, keyUp: true });
                    }
                    break;
                case KEY_DOWN:
                    if (!keyStatus.keyDown) {
                        setKeyStatus({ ...keyStatus, keyDown: true });
                    }
                    break;
                case KEY_LEFT:
                    if (!keyStatus.keyLeft) {
                        setKeyStatus({ ...keyStatus, keyLeft: true });
                    }
                    break;
                case KEY_RIGHT:
                    if (!keyStatus.keyRight) {
                        setKeyStatus({ ...keyStatus, keyRight: true });
                    }
                    break;
                default:
                    break;
            }
        };

        const keyUpController = (e) => {
            switch (e.keyCode) {
                case KEY_UP:
                    setKeyStatus({ ...keyStatus, keyUp: false });
                    break;
                case KEY_DOWN:
                    setKeyStatus({ ...keyStatus, keyDown: false });
                    break;
                case KEY_LEFT:
                    setKeyStatus({ ...keyStatus, keyLeft: false });
                    break;
                case KEY_RIGHT:
                    setKeyStatus({ ...keyStatus, keyRight: false });
                    break;
                default:
                    break;
            }
        };

        const moveController = () => {
            if (keyStatus.keyUp) {
                movePlayer({ type: MOVE_PLAYER_ACTION_KEY_UP });
            }
            if (keyStatus.keyDown) {
                movePlayer({ type: MOVE_PLAYER_ACTION_KEY_DOWN });
            }
            if (keyStatus.keyLeft) {
                movePlayer({ type: MOVE_PLAYER_ACTION_KEY_LEFT });
            }
            if (keyStatus.keyRight) {
                movePlayer({ type: MOVE_PLAYER_ACTION_KEY_RIGHT });
            }
        };

        const tmMoveController = setInterval(moveController, 20);

        document.addEventListener("keydown", keyDownController);
        document.addEventListener("keyup", keyUpController);

        return () => {
            document.removeEventListener("keydown", keyDownController);
            document.removeEventListener("keyup", keyUpController);

            // clearTimeout(tmMobSpawnController);
            clearInterval(tmMoveController);
        };
    }, [keyStatus]);

    useEffect(() => {
        // FIXME: 중복 실행될 수 있음. playerPos가 최신이 아님.
        const mobSpawnController = (func) => {
            mobSpawnManager.spawnMob();
            mobSpawnManager.moveMobs(playerPos);
            setMobs([...mobSpawnManager.getMobs()]);

            setTimeout(
                mobSpawnController,
                Math.floor(Math.random() * 1000),
                func
            );
        };

        setTimeout(
            mobSpawnController,
            Math.floor(Math.random() * 1000),
            mobSpawnController
        );
    }, [mobSpawnManager]);

    return (
        <div className="game-screen">
            <Player position={playerPos} />
            <PlayerUI hp={100} />
            {mobs.map((mob, idx) => {
                if (mob.type === 0) {
                    return <Lico key={idx} position={{ x: mob.x, y: mob.y }} />;
                } else {
                    return (
                        <Trevor key={idx} position={{ x: mob.x, y: mob.y }} />
                    );
                }
            })}
        </div>
    );
};

export default Game;
