import {removeClass} from "./util.js";
import {addClass} from "./util.js";
import {body} from "./form.js";

export async function upLoadHandler (url, data, successHandler) {
    try {
        const response = await fetch(
            url,
            {
                method: 'POST',
                data,
            },
        );

        if (response.ok) {
            successHandler();
            showSuccessMessage();
        } else {
            errorHandler("message not sent, please try again later");
            setTimeout(hideErrorMessage, 3000);
        }
    }
    catch (error) {
        errorHandler("message not sent, please try again later");
        setTimeout(hideErrorMessage, 3000);
    }
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