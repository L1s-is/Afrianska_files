import {removeClass} from "./util.js";
import {addClass} from "./util.js";
import {body} from "./form.js";

export function upLoadHandler(url, data, successHandler) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.addEventListener("load", function () {
        switch (xhr.status) {
            case 200:
                successHandler();
                showSuccessMessage();
                break
            default:
                errorHandler("message not sent, please try again later");
                setTimeout(hideErrorMessage, 3000);
                break
        }
    })

    xhr.open("Post", url);
    xhr.send(data);
}

let errorMessage = document.querySelector(".error");

function errorHandler(message) {
    errorMessage.querySelector(".error__message").textContent = message;
    removeClass(errorMessage, "hidden");
    errorMessage.querySelector("button").addEventListener("click", hideErrorMessage);
}

let successMessage = document.querySelector(".success");

function showSuccessMessage() {
    removeClass(successMessage, "hidden");
    let successMessageBtn = document.querySelector(".button--success");
    addClass(body, "not-scroll");
    successMessageBtn.addEventListener("click", hideSuccessMessage);
    setTimeout(hideSuccessMessage, 5000);
}

function hideSuccessMessage() {
    successMessage.classList.add("hidden");
    removeClass(body, "not-scroll");
}

function hideErrorMessage() {
    errorMessage.classList.add("hidden");
}