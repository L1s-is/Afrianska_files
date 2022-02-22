import {addClass} from "./util.js";
import {removeClass} from "./util.js";

const formBox = document.querySelector(".form__box");
const form = formBox.querySelector(".work__form");
const talkButton = document.querySelector(".work__button");
export const body = document.querySelector("body");

export function formOpen() {
    const closeButton = form.querySelector(".btn--close");
    const burger = document.querySelector(".menu__btn");

    talkButton.addEventListener("click", onClickOpenForm);
    burger.addEventListener("click", onClickNotScroll)

    function onClickOpenForm() {
        removeClass(formBox, "hidden");
        addClass(body, "not-scroll");
        //body.style.overflow = "hidden";
        document.addEventListener("click", onClickCloseFormNotBtn);
        closeButton.addEventListener("click", onClickCloseForm);
    }
}

export function onClickNotScroll() {
    body.classList.toggle("not-scroll");
}

function onClickCloseFormNotBtn(evt) {
    let target = evt.target;
    if (target !== talkButton) {
        let itsForm = target === form || form.contains(target);
        let formIsActive = formBox.classList.contains("hidden");

        if (!itsForm && !formIsActive) {
            onClickCloseForm();
        }
    }
}

export function onClickCloseForm() {
    removeClass(body, "not-scroll");
    addClass(formBox, "hidden");
    document.removeEventListener("click", onClickCloseFormNotBtn);
}