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
}

function getCardElement(data) {

    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector('.card__image');
    const cardTitleEl = cardElement.querySelector('.card__description-title');
    const likeBtn = cardElement.querySelector("#card-like-button");
    const deleteBtn = cardElement.querySelector("#card-trash-button");
    const cardImage = cardElement.querySelector(".card__image");

    deleteBtn.addEventListener("click", () => {
        cardElement.remove();
    });

    likeBtn.addEventListener("click", () => {
        likeBtn.classList.toggle("card__like-button_active");
    });

    cardImage.addEventListener("click", () => showImage(data))

    cardTitleEl.textContent = data.name;
    cardImageEl.src = data.link;
    cardImageEl.alt = data.name;
    return cardElement;
}

function openModal(modal) {
    modal.classList.add("modal_opened");
}

function renderCard(data, cardListEl) {
    const cardElement = getCardElement(data);
    cardListEl.prepend(cardElement);
}

function showImage(data) {
    imageModalImg.src = data.link;
    imageModalTitle.textContent = data.name;
    imageModalImg.alt = data.name;
    openModal(imageModal);
}

function fillProfileForm() {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
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

