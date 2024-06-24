export default class Popup{
    constructor({ popupSelector }){
        this._popupElement = document.querySelector(popupSelector);
        this._closeBtn = document.querySelector("#modal-close-button")
    }

    open(){
        this._popupElement.classList.add("modal_opened");
        document.addEventListener("keydown", this._handleEscClose);
        this._popupElement.addEventListener("mousedown", this._closePopupAround);
    }

    close(){
         this._popupElement.classList.remove("modal_opened");
        document.removeEventListener("keydown", this._handleEscClose);
        this._popupElement.removeEventListener("mousedown",this._closePopupAround);
    }

    _handleEscClose = (evt) => {
        if(evt.key === 'Escape') {
            this.close();
        }
    }

    _closePopupAround = (evt) => {
        if(evt.target === this._popupElement){
            this.close();
        }
    }

    setEventListeners(){
        this._closeBtn.addEventListener("click", (evt) => {
            if (evt.target.classList.contains("modal__close")) {
            this.close();
          }
        });
    }
}