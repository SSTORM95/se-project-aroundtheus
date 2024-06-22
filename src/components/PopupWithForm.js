import Popup from "./Popup";

export default class PopupWithForm extends Popup{
    constructor(popupSelector, handleFormSubmit){
        super({popupSelector});
        this._popupForm = this._popupElement.querySelector(".modal__form");
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._popupForm.querySelector(".modal__input")
    }

    _getInputValues(){
        const formInputs = {};
        this._inputList.forEach((input) => {
            formInputs[input.name] = input.value;
        });
        return formInputs;
    }

    open(){
        super.open();
    }

    _handleSubmit = (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        this._popupForm.reset();
        super.close();
    }

    setEventListeners(){
        super.setEventListeners();
        this._popupForm.addEventListener("submit", this._handleSubmit);
    }
}