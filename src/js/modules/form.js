const formBox = document.querySelector(".form__box");
const form = formBox.querySelector(".work__form");
const talkButton = document.querySelector(".work__button");
const body = document.querySelector("body")
const burger = document.querySelector(".menu__btn")
export function formOpen() {
    const closeButton = form.querySelector(".btn--close")

    talkButton.addEventListener("click", onClickOpenForm);
    burger.addEventListener("click", onClickNotScroll)

    function onClickNotScroll () {
        body.classList.toggle("not-scroll");
    }

    function onClickOpenForm() {
        formBox.classList.remove("hidden");
        body.style.overflow = "hidden";
        document.addEventListener('click', onClickCloseFormNotBtn);
        closeButton.addEventListener("click", onClickCloseForm);
    }
}

function onClickCloseFormNotBtn (evt) {
    let target = evt.target;
    if (target !== talkButton) {
        let itsForm = target === form || form.contains(target);
        let formIsActive = formBox.classList.contains('hidden');

        if (!itsForm && !formIsActive) {
            onClickCloseForm();
        }
    }
}

export function onClickCloseForm() {
    body.style.overflow = "";
    formBox.classList.add("hidden");
    document.removeEventListener('click', onClickCloseFormNotBtn)
}