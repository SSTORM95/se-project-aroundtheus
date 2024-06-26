import Popup from "./Popup";

export default class PopupWithForm extends Popup{
    constructor(popupSelector, handleFormSubmit){
        super({ popupSelector });
        this._popupForm = this._popupElement.querySelector(".modal__form");
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = Array.from(this._popupForm.querySelectorAll(".modal__input"));
    }

    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach((input) => {
           inputValues[input.name] = input.value;
          });
        return inputValues;
       
      }

   

    setEventListeners(){
        super.setEventListeners();
        this._popupForm.addEventListener("submit", (evt) => {
          evt.preventDefault();
          this._handleFormSubmit(this._getInputValues());
          evt.target.reset();
        });
    }
}

