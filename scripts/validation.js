function showInputError(formEl, inputEl, {inputErrorClass, errorClass}) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, {inputErrorClass, errorClass}) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
    if(!inputEl.validity.valid) {
     showInputError(formEl, inputEl, options);
    } else {
        hideInputError(formEl, inputEl, options);
    }
}

function hasInvalidInput (inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid)
}

function toggleButtonState(inputELements, submitButton, {inactiveButtonClass}){
    if (hasInvalidInput(inputELements)) {
        submitButton.classList.add(inactiveButtonClass);
        submitButton.disabled = true;
        return;
    }
        submitButton.classList.remove(inactiveButtonClass);
        submitButton.disabled = false;
}

function setEventListeners(formEl, options) {
    const {inputSelector} = options;
    const {submitButtonSelector} = options;
    const inputELements = [...formEl.querySelectorAll(inputSelector)];
    const submitButton = formEl.querySelector(submitButtonSelector);
    inputELements.forEach(inputEl => {
        inputEl.addEventListener('input', (evt) => {
            checkInputValidity(formEl, inputEl, options);
            toggleButtonState(inputELements, submitButton, options)
        })
    })
}

function enableValidation(options) {
    const formELements = [...document.querySelectorAll(options.formSelector)];
    formELements.forEach((formEl) => {
        formEl.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
       setEventListeners(formEl, options)
    });
}

const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
};

enableValidation(config);