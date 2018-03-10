"use strict";

export default class Router {
    constructor() {
        this.listOfPages = [];

        window.addEventListener("popstate", () => {
            this.showPage();
        });
    }


    addPage(url, page) {
        this.listOfPages.push({
            url: url,
            page: page
        });
    }

    hidePages() {
        this.listOfPages.forEach((element) => {
            element.page.hidden = true;
        });
    }

    showPage() {
        this.hidePages();

        const url = window.location.pathname;

        let flag = true;
        this.listOfPages.forEach((element) => {
            if(url === element.url && flag === true) {
                element.page.hidden = false;
                flag = false;
            }
        });

        if(flag === false) {
            return;
        }

        this.listOfPages[0].page.hidden = false;
        history.pushState({}, "", this.listOfPages[0].url);
    }

    moveToPage(url) {
        history.pushState({}, "", url);
        this.showPage();
    }
}
