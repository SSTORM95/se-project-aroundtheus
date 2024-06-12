import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [ 
    {
        name:'Yosemite Valley',
        link:'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg',
    },
    {
        name:'Lake Louise',
        link:'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg',
    },
    {
        name:'Bald Mountains',
        link:'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg',
    },
    {
        name:'Latemar',
        link:'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg',
    },
    {
        name:'Vanoise National Park',
        link:'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg',
    },
    {
        name:'Lago di Braies',
        link:'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg',
    },
]

// Elements //

const modal = document.querySelectorAll(".modal");
const addCardModal = document.querySelector("#card-add-modal");
const addCardForm = document.forms["add-form"];
const cardTitleInput = addCardForm.querySelector("#card-title");
const cardLinkInput = addCardForm.querySelector("#card-link");
const addNewCardBtn = document.querySelector("#profile-add-button");
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector('#profile-edit-modal');
const profileModalCLoseButton = profileEditModal.querySelector("#modal-close-button");
const addCardModalCLoseButton = addCardModal.querySelector("#modal-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title");
const profileDescriptionInput = document.querySelector("#profile-description");
const profileEditForm = document.forms["edit-form"];
const cardListEl = document.querySelector(".gallery__cards");
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
const imageModal = document.querySelector("#image-popup-modal");
const imageModalCloseButton = imageModal.querySelector("#modal-close-button");
const imageModalImg = imageModal.querySelector(".modal__image");
const imageModalTitle = imageModal.querySelector(".modal__image_caption");


// Function //

function closePopUp(modal){
    modal.classList.remove('modal_opened');
    document.removeEventListener("keydown", handleEscExit);
    modal.removeEventListener("mousedown", handleClickExit);
}

function createCard(data) {
    const card = new Card(data, "#card-template", handleImageClick);
    return card.getCard();
}

function openModal(modal) {
    modal.classList.add("modal_opened");
    document.addEventListener("keydown", handleEscExit);
    modal.addEventListener("mousedown", handleClickExit);
}

function renderCard(data, cardListEl) {
    const cardElement = createCard(data);
    cardListEl.prepend(cardElement);
}

function handleImageClick(data) {
    imageModalImg.src = data.link;
    imageModalImg.alt = data.name;
    imageModalTitle.textContent = data.name;
    openModal(imageModal);
}

function fillProfileForm() {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
}

function handleClickExit(evt){
    if(evt.target === evt.currentTarget) {
        closePopUp(evt.currentTarget);
    }
}

function handleEscExit(evt){
    if(evt.key === 'Escape') {
        const openModal = document.querySelector(".modal_opened")
        closePopUp(openModal);
    }
}
   
// Event handlers // 

function handleProfileEditSubmit(e){
    e.preventDefault();
    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent =profileDescriptionInput.value;
    closePopUp(profileEditModal);
}

function handleAddCardSubmit(e){
    e.preventDefault();
    const name = cardTitleInput.value;
    const link = cardLinkInput.value;
    renderCard({name, link}, cardListEl);
    closePopUp(addCardModal);
    document.querySelector("#add-form").reset();
    addFormValidator.disableBtn();
 }

// Event listener//

profileEditBtn.addEventListener("click", () => {
    fillProfileForm();
    openModal(profileEditModal);
});

addNewCardBtn.addEventListener("click", () => openModal(addCardModal));


profileModalCLoseButton.addEventListener("click", () => closePopUp(profileEditModal));
addCardModalCLoseButton.addEventListener("click", () => closePopUp(addCardModal));
imageModalCloseButton.addEventListener("click", () => closePopUp(imageModal));


profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((data) => renderCard(data, cardListEl));

const validationSettings = {
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
}

const editFormValidator = new FormValidator(validationSettings, profileEditForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationSettings, addCardForm);
addFormValidator.enableValidation();