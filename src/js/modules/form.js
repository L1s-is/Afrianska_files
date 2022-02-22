import {addClass} from "./util.js";
import {removeClass} from "./util.js";

const formBox = document.querySelector(".form__box");
const form = formBox.querySelector(".work__form");
const talkButton = document.querySelector(".work__button");
export const body = document.querySelector("body");
const navList = document.querySelector(".nav__list");

export function formOpen() {
    const closeButton = form.querySelector(".btn--close");
    const burger = document.querySelector(".menu__btn");

    talkButton.addEventListener("click", onClickOpenForm);
    burger.addEventListener("click", onClickOpenList)

    function onClickOpenList() {
        navList.classList.toggle("open")
        onClickNotScroll()
        document.addEventListener("click", onClickCloseListNotBtn)

        function onClickCloseListNotBtn(evt) {
            let target = evt.target;
            if (target !== burger) {
                let itsForm = target === (navList || navList.contains(target));
                let formIsActive = navList.classList.contains("open");
                if (!itsForm && !formIsActive) {
                    onClickCloseList();
                }
            }
        }

        function onClickCloseList() {
            removeClass(body, "not-scroll");
            removeClass(navList, "open");
            document.removeEventListener("click", onClickCloseListNotBtn);
        }
    }

    function onClickOpenForm() {
        removeClass(formBox, "hidden");
        addClass(body, "not-scroll");
        document.addEventListener("click", onClickCloseFormNotBtn);
        closeButton.addEventListener("click", onClickCloseForm);
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
}

function onClickNotScroll() {
    body.classList.toggle("not-scroll");
}

export function onClickCloseForm() {
    removeClass(body, "not-scroll");
    addClass(formBox, "hidden");
    document.removeEventListener("click", onClickCloseFormNotBtn);
}