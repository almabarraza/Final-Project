

/*load header and footer dynamically on each page of the site*/
export async function loadHeaderFooter() {
    const header = await loadTemplate("partials/header.html");
    const footer = await loadTemplate("partials/footer.html");

    const placeHoderH = document.getElementById("main-header");
    const placeHoderF = document.getElementById("main-footer");

    renderWithTemplate(header, placeHoderH);
    renderWithTemplate(footer, placeHoderF);

    /* This shows the last modified date in the footer*/
    const year = document.querySelector("#currentyear");

    const today = new Date();

    year.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;

    document.getElementById("lastModified").textContent = document.lastModified;

}


export async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
}


export function renderWithTemplate(template, parentElement, data, callback) {

    parentElement.innerHTML = template;

    if (callback) {
        callback(data);
    }

}


// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
    return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
    qs(selector).addEventListener("touchend", (event) => {
        event.preventDefault();
        callback();
    });
    qs(selector).addEventListener("click", callback);
}

// URL Parameter
export function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const paramValue = urlParams.get(param);

    return paramValue;

}


export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = "false") {

    const htmlStrings = list.map(templateFn);

    if (clear === "true") {
        parentElement.innerHTML = " ";
    }
    parentElement.insertAdjacentHTML(position, htmlStrings.join(''));

}


export function alertMessage(message, scroll = true) {
    const alert = document.createElement('div');
    alert.classList.add('alert');
    alert.classList.add("color-message");
    alert.innerHTML = `<p>${message}</p><span> X </span>`;

    alert.addEventListener("click", function (e) {
        if (e.target.tagName == "SPAN") {
            main.removeChild(this);
        }
    });

    const main = document.querySelector("main");
    main.prepend(alert);
    if (scroll) window.scroll(0, 0);

}

export function removeAllAlerts() {
    const alerts = document.querySelectorAll(".alert");
    alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}






