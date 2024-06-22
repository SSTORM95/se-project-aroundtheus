import Popup from "./Popup";

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._imgElement = document.querySelector(".modal__image");
        this._captionElement = document.querySelector(".modal__image_caption")
    }

        open({ name, link }){
            this._imgElement.src = link;
            this._imgElement.alt = name;
            this._captionElement.textContent = name;
            super.open();
        }
    }

