import {addClass} from "./util.js";
import {removeClass} from "./util.js";
import {showMessageValidity} from "./util.js";
import {onClickCloseForm} from "./form.js";
import {upLoadHandler} from "./backend.js";

export function validationForm() {
    const formBox = document.querySelector(".form-box");
    const form = formBox.querySelector(".work__form");
    const formSubmit = form.querySelector(".form__btn");
    const inputName = document.querySelector("#name");
    const inputEmail = document.querySelector("#email");

    function showValidError(formElement) {
        let elementValue = formElement.value.replace(/ +/g, ' ').trim();
        addClass(formElement, "element-stroke--invalid");
        if (!elementValue) {
            addClass(formElement, "form__element--error");
            showMessageValidity(formElement, "Please, fill the field");
        } else if (elementValue.length < formElement.minLength) {
            addClass(formElement, "element-stroke--invalid");
            removeClass(formElement, "element-stroke--valid");
            showMessageValidity(formElement, `The field can contain at least ${formElement.minLength} characters. Entered ${elementValue.length} characters.`);
        } else if (elementValue.length > formElement.maxLength) {
            addClass(formElement, "element-stroke--invalid");
            removeClass(formElement, "element-stroke--valid");
            showMessageValidity(formElement, `The field can contain no more than ${formElement.maxLength} characters. Entered ${elementValue.length} characters.`);
        } else {
            showMessageValidity(formElement, "");
            removeClass(formElement, "form__element--error");
            addClass(formElement, "element-stroke--valid");
        }
    }

    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    function validateEmail(value) {
        return EMAIL_REGEXP.test(value);
    }

    function updateInput() {
        if (!inputEmail.value) {
            showMessageValidity(inputEmail, "The field cannot be empty");
            addClass(inputEmail, "element-stroke--invalid");
        } else if (validateEmail(inputEmail.value)) {
            showMessageValidity(inputEmail, "");
            removeClass(inputEmail, "form__element--error");
            removeClass(inputEmail, "element-stroke--invalid");
            addClass(inputEmail, "element-stroke--valid");
        } else {
            showMessageValidity(inputEmail, "The field must contain an entry like example@mail.com");
            removeClass(inputEmail, "element-stroke--valid");
            addClass(inputEmail, "element-stroke--invalid");
        }

    }

    inputEmail.addEventListener("input", updateInput);
    inputName.addEventListener("input", () => showValidError(inputName));

    function submitUpdateEmailInput() {
        addClass(inputEmail, "form__element--error");
        updateInput();
    }

    function submitUpdateNameInput() {
        addClass(inputName, "form__element--error");
        showValidError(inputName);
    }

    function submitButtonClickHandler(formElement) {
        formElement.addEventListener("input", () => showValidError(formElement));
        formElement.addEventListener("invalid", () => showValidError(formElement));
    }

    formSubmit.addEventListener("click", () => submitButtonClickHandler(inputName));

    formElementValidHandler(inputName);
    formElementValidHandler(inputEmail);

    function formElementValidHandler(formElement) {
        if (!formElement.value) {
            showMessageValidity(formElement, "The field cannot be empty");
        }
        inputName.addEventListener("invalid", submitUpdateNameInput);
        inputEmail.addEventListener("invalid", submitUpdateEmailInput);
    }

    const sendDataURL = "https://echo.htmlacademy.ru"
    form.addEventListener("submit", function (evt) {
        submitUpdateEmailInput();
        submitUpdateNameInput();
        upLoadHandler(sendDataURL, new FormData(form), onClickCloseForm);

        form.reset();
        removeClass(inputEmail, "element-stroke--valid");
        removeClass(inputEmail, "element-stroke--invalid");
        removeClass(inputName, "element-stroke--valid");
        removeClass(inputName, "element-stroke--invalid");
        formElementValidHandler(inputName);
        formElementValidHandler(inputEmail);
        evt.preventDefault();
    })
}

