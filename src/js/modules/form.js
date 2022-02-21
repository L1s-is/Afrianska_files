export function formOpen() {
    const talkButton = document.querySelector(".work__button");
    const formBox = document.querySelector(".form__box");
    const form = formBox.querySelector(".work__form");
    const closeButton = form.querySelector(".btn--close")
    const formSubmit = form.querySelector(".form__btn");

    talkButton.addEventListener("click", onClickOpenForm);

    function onClickOpenForm() {
        formBox.classList.remove("visually-hidden");
        document.addEventListener('click', onClickCloseFormNotBtn)
        closeButton.addEventListener("click", onClickCloseForm);
    }

    function onClickCloseFormNotBtn (evt) {
        let target = evt.target;
        if (target !== talkButton) {
            let itsForm = target === form || form.contains(target);
            let formIsActive = formBox.classList.contains('visually-hidden');

            if (!itsForm && !formIsActive) {
                onClickCloseForm();
            }
        }
    }

    function onClickCloseForm() {
        formBox.classList.add("visually-hidden");
        document.removeEventListener('click', onClickCloseFormNotBtn)
    }
}
