
export default class Card{
    constructor({ link, name }, cardSelector, handleImageClick){
       
       this._name = name;
       this._link = link;
       this._cardSelector = cardSelector;
       this._handleImageClick = handleImageClick;
    }

    _setEventListener(){
        this._likeBtn = this._cardElement.querySelector("#card-like-button");
        this._trashBtn = this._cardElement.querySelector("#card-trash-button");
        this._cardImg = this._cardElement.querySelector(".card__image");

    this._likeBtn.addEventListener('click', this._handleLikeIcon);

    this._trashBtn.addEventListener('click', this._handleDeleteCard);

    this._cardImg.addEventListener('click', () => (this._handleImageClick(this)));
    }
    
    _handleImageClick({ link, name }){
        this._imageModal = this._cardElement.querySelector("#image-popup-modal");
        this._imageModalImg.src = link;
        this._imageModalTitle.textContent = name;
        this._imageModalImg.alt = name;
        open(this._imageModal);
    }

    _handleLikeIcon = () => {
        this._likeBtn.classList.toggle("card__like-button_active");
    }

    _handleDeleteCard = () => {
        this._cardElement.remove();
        this._cardElement = null;
    }


    getCard() {
        
        this._cardElement = document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);
      
       
        this._setEventListener();

        this._cardElement.querySelector(".card__image").src = this._link;
        this._cardElement.querySelector(".card__image").alt = this._name;
        this._cardElement.querySelector(".card__description-title").textContent = this._name;

        return this._cardElement;
    }
}