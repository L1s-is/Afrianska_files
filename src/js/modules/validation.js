import {addClass, removeClass, showMessageValidity} from "./util.js";
import {upLoadHandler} from "./backend.js";
import {onClickCloseForm} from "./form.js";

const inputRegexp = {
    "email": /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
    "name": /^.[^<>()\]\\.,;:@$#%"]{3,60}$/
}
const messages = {
    "empty": "The field cannot be empty",
    "correct": "",
    "incorrect": "incorrect field value"
}

export function validationForm (form, formElements, submitBtn) {
    [...formElements].forEach(element => element.addEventListener("input", updateInput))

    submitBtn.addEventListener("click", () => {
        [...formElements].forEach(element => updateInput(element))
    })

    form.addEventListener("submit", onFormSubmit)

    function onFormSubmit (evt) {
        const sendDataURL = "https://echo.htmlacademy.ru";
        [...formElements].forEach(element => {
            removeClass(element, "element-stroke--valid");
            removeClass(element, "element-stroke--invalid");
        })
        upLoadHandler(sendDataURL, new FormData(form), onClickCloseForm);

        form.reset();
        evt.preventDefault();
    }
}

function validateInput(element) {
    let elementValue = element.value.replace(/ +/g, " ").trim();
    if (element.name === "name") {
        return inputRegexp.name.test(elementValue);
    }
    return inputRegexp.email.test(elementValue);
}

function showValidateInput (element, message, deletedClass, addedClass) {
    showMessageValidity(element, message);
    removeClass(element, deletedClass);
    addClass(element, addedClass);
}

function updateInput(evt) {
    let input = evt.target ? evt.target : evt;

    if (!input.value) {
        showValidateInput (input, messages.empty, "element-stroke--valid", "element-stroke--invalid")
    } else if (validateInput(input)) {
        showValidateInput (input, messages.correct, "element-stroke--invalid", "element-stroke--valid")
    } else {
        showValidateInput (input, messages.incorrect, "element-stroke--valid", "element-stroke--invalid")
    }
}