"use strict";

export default class SingUpMessageRender {
    constructor(messageBox) {
        this.messageBox = messageBox;
    }

    clearBox() {
        this.messageBox.innerHTML = "";
    }

    renderArrayElements(messageArr) {
        const messageBox = this.messageBox;
        messageArr.forEach((message) => {
            const p = document.createElement("div");
            p.innerHTML = message;
            messageBox.appendChild(p);
        });
    }

    renderRegistrationOK() {
        const p = document.createElement("div");
        p.innerHTML = "Регистрация прошла успешно.";
        this.messageBox.appendChild(p);
    }

    renderBadUser() {
        const p = document.createElement("div");
        p.innerHTML = "Пользователь с таким логином уже есть в БД.";
        this.messageBox.appendChild(p);
    }
}
