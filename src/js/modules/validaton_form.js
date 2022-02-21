
import {onClickCloseForm} from "./form.js";

export function validationForm () {
    const formBox = document.querySelector(".form__box");
    const form = formBox.querySelector(".work__form");
    const formSubmit = form.querySelector(".form__btn");
    const inputName = document.querySelector("#name")
    const inputEmail = document.querySelector("#email")
    const inputMessage = document.querySelector("#message")

    function errorValidHandler(formElement) {
        let elementValue = formElement.value.replace(/ +/g, ' ').trim()
        formElement.style.borderColor = 'red';
        if (!elementValue) {
            formElement.classList.add("ad-form__element--error")
            formElement.setCustomValidity("Пожалуйста, заполните поле")
        } else if (elementValue.length < formElement.minLength) {
            formElement.setCustomValidity("Поле может содержать не менее " + formElement.minLength + " символов. Введено " + elementValue.length + " символов.")
        } else if (elementValue.length > formElement.maxLength) {
            formElement.setCustomValidity("Поле может содержать не более " + formElement.maxLength + " символов. Введено " + elementValue.value.length + " символов.")
        }  else {
            formElement.setCustomValidity("")
            formElement.classList.remove("ad-form__element--error")
            formElement.style.borderColor = 'green';
        }
    }

    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    function validateEmail(value) {
        return EMAIL_REGEXP.test(value);
    }

    function updateInput() {
        if (!inputEmail.value) {
            inputEmail.setCustomValidity("The field cannot be empty")
            inputEmail.style.borderColor = 'red';
        } else if (validateEmail(inputEmail.value)) {
            inputEmail.setCustomValidity("")
            inputEmail.classList.remove("ad-form__element--error")
            inputEmail.style.borderColor = 'green';
        }
        else {
            inputEmail.setCustomValidity("The field must contain an entry like example@mail.com")
            inputEmail.style.borderColor = 'red';
        }

    }
    inputEmail.addEventListener('input', updateInput);
    inputName.addEventListener('input', errorValidHandler);

    function submitUpdateEmailInput() {
        inputEmail.classList.add("ad-form__element--error")
        updateInput()
    }
    function submitUpdateNameInput() {
        inputEmail.classList.add("ad-form__element--error")
        updateInput()
    }

//валидация элементов формы при клике на кнопку отправки формы
    function submitButtonClickHandler(formElement) {
        formElement.addEventListener("input", function () {
            errorValidHandler(formElement)
        })
        formElement.addEventListener("invalid", function () {
            errorValidHandler(formElement)
        })
    }

    formSubmit.addEventListener("click", function () {
        submitButtonClickHandler(inputName)
    })

    formElementValidHandler(inputName)
    formElementValidHandler(inputEmail)

    function formElementValidHandler(formElement) {
        if (!formElement.value) {
            formElement.setCustomValidity("Заполните поле")
        }
        inputName.addEventListener("invalid", function () {
            submitUpdateNameInput()
        })
        inputEmail.addEventListener("invalid", function () {
            submitUpdateEmailInput()
        })
    }

    let errorMessage = document.querySelector(".error")

    function errorHandler(message) {
        errorMessage.querySelector(".error__message").textContent = message
        errorMessage.classList.remove("hidden")
        errorMessage.querySelector("button").addEventListener("click", hideErrorMessage)
    }

    let successMessage = document.querySelector(".success")

    function showSuccessMessage() {
        successMessage.classList.remove("hidden")
        let successMessageBtn = document.querySelector(".button--success")
        successMessageBtn.addEventListener("click", hideSuccessMessage)
        setTimeout(hideSuccessMessage, 5000)
    }

    function hideSuccessMessage() {
        successMessage.classList.add("hidden")
    }

    function hideErrorMessage() {
        errorMessage.classList.add("hidden")
    }

    function upLoadHandler(url, data, successHandler) {
        let xhr = new XMLHttpRequest()
        xhr.responseType = "json"
        xhr.addEventListener("load", function () {
            switch (xhr.status) {
                case 200:
                    successHandler()
                    showSuccessMessage()
                    break
                default:
                    errorHandler("Данные не отправлены, попробуйте позднее")
                    setTimeout(hideErrorMessage, 3000)
                    break
            }
        })

        xhr.open("Post", url)
        xhr.send(data)
    }

    let sendDataURL = "https://echo.htmlacademy.ru"
    form.addEventListener("submit", function (evt) {
        submitUpdateEmailInput()
        submitUpdateNameInput()
        upLoadHandler(sendDataURL, new FormData(form), onClickCloseForm)

        form.reset()
        inputName.style = "none"
        inputEmail.style = "none"
        formElementValidHandler(inputName)
        formElementValidHandler(inputEmail)
        evt.preventDefault()
    })
}

