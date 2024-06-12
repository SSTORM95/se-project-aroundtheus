export default class Card {
    constructor(data, cardSelector, handleImageClick){
       this._name = data.name;
       this._link = data.link;
       this._cardSelector = cardSelector;
       this._handleImageClick = handleImageClick;
    }

    _setEventListener(){
    this._cardElement.querySelector("#card-like-button").addEventListener('click', () => {
        this._handleLikeIcon()

    });
    this._cardElement.querySelector("#card-trash-button").addEventListener('click', () => {
        this._handleDeleteCard()
    })

    this._cardElement.querySelector(".card__image").addEventListener('click', () => (this._handleImageClick(this)));
    }
    
    _handleImageClick(data){
        this._imageModal = this._cardElement.querySelector("#image-popup-modal");
        this._imageModalImg.src = data.link;
        this._imageModalTitle.textContent = data.name;
        this._imageModalImg.alt = data.name;
        openModal(this._imageModal);
    }

    _handleLikeIcon() {
        this._cardElement.querySelector('#card-like-button').classList.toggle("card__like-button_active");
    }

    _handleDeleteCard() {
        this._cardElement.remove();
        this._cardElement = null;
    }


    getCard() {
        this._cardElement = document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);
       
        this._setEventListener();

        this._cardElement.querySelector(".card__image").src = this._link;
        this._cardElement.querySelector(".card__description-title").textContent = this._name;

        return this._cardElement;
    }
}