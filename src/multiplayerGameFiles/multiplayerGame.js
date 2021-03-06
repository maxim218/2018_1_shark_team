"use strict";

import LogMessage from "../gameFiles/scripts/MessageLogger";
import getApplicationMode from "./../modules/utils/DebugMode.js";
import NetworkManager from "./NetworkManager";
import ImageLoader from "../gameFiles/scripts/ImageLoader";
import AlertManager from "../modules/render/AlertManager";

const DEBUG_URL = "ws://localhost:5007/";
const RELEASE_URL = "wss://funny-race.xyz/sock";

function controlScreenSize() {
    const height = parseInt(document.documentElement.clientHeight);
    const width = parseInt(document.documentElement.clientWidth);
    return width > height;
}

const MESSAGE_TEXT = "Переверните экран устройства. Пожалуйста.";

export default function multiplayerGame() {
    LogMessage("Finding enemy process start");
    let socket_url = undefined;
    const debug = getApplicationMode();
    if (debug) {
        socket_url = DEBUG_URL;
    } else {
        socket_url = RELEASE_URL;
    }

    if(controlScreenSize()) {
        // print waiting labels
        document.querySelector(".multiplayer-page__start-game-finding-button").hidden = true;
        document.querySelector(".multiplayer-page__wait-process-label").hidden = false;

        // load all images for game
        const imageLoader = new ImageLoader({});
        imageLoader.downloadRecources()
            .then(() => {
                // start work with socket
                new NetworkManager(socket_url, imageLoader);
            });
    } else {
        // make user rotate screen
        new AlertManager().showAlertWindow(MESSAGE_TEXT, () => {
            LogMessage("Button ok pushed");
        });
    }
}