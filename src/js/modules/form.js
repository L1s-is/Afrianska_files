import {addClass} from "./util.js";
import {removeClass} from "./util.js";
import {validationForm} from "./validation.js";
const formBox = document.querySelector(".form-box");
const form = formBox.querySelector(".work__form");
const formElements = form.querySelectorAll("input");
const submitBtn = form.querySelector("button[type=submit]");
const talkButton = document.querySelector(".work__button");
export const body = document.querySelector("body");
const navList = document.querySelector(".nav__list");
const closeButton = form.querySelector(".btn--close");

export function formOpen() {
    const burger = document.querySelector(".menu__btn");

    talkButton.addEventListener("click", onClickOpenForm);
    burger.addEventListener("click", onClickOpenMenu)

    function onClickOpenMenu() {
        navList.classList.toggle("open")
        onClickNotScroll()
        document.addEventListener("click", onClickCloseListNotBtn)

        function onClickCloseListNotBtn(evt) {
            let target = evt.target;
            if (target !== burger) {
                let itsForm = target === (navList || navList.contains(target));
                let formIsActive = navList.classList.contains("open");
                if (!itsForm && !formIsActive) {
                    onClickCloseMenu();
                }
            }
        }

        function onClickCloseMenu() {
            addScroll();
            removeClass(navList, "open");
            document.removeEventListener("click", onClickCloseListNotBtn);
        }
    }
}

function removeScroll () {
    addClass(body, "not-scroll");
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        removeClass(body, "not-scroll--desktop");
    } else {
        addClass(body, "not-scroll--desktop");
    }
}

function addScroll () {
    removeClass(body, "not-scroll");
    removeClass(body, "not-scroll--desktop");
}

function onClickNotScroll() {
    body.classList.toggle("not-scroll");
    if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
        body.classList.toggle("not-scroll--desktop");
    }
}

function onClickOpenForm() {
    validationForm(form, formElements, submitBtn);
    removeClass(formBox, "hidden");
    removeScroll();
    document.addEventListener("click", onClickCloseFormNotBtn);
    closeButton.addEventListener("click", onClickCloseForm);
}

export function onClickCloseForm() {
    addScroll();
    addClass(formBox, "hidden");
    document.removeEventListener("click", onClickCloseFormNotBtn);
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