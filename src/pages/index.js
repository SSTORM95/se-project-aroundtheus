import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import './index.css';
import { validationSettings } from "../utils/constants.js";
import { initialCards } from "../utils/constants.js";



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


const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    descriptionSelector: ".profile__description",
  });

// Pop Ups // 

const popupWithImage = new PopupWithImage("#image-popup-modal");
popupWithImage.setEventListeners();

const profileEditPopup = new PopupWithForm(
    "#profile-edit-modal",
    (formData) => {
      const { name, description } = formData;
      userInfo.setUserInfo({ name, description });
      profileEditPopup.close();
    }
  );
profileEditPopup.setEventListeners();

const addCardPopup = new PopupWithForm("#card-add-modal", (formData) => {
    const name = formData.title;
    const link = formData.url;
    renderCard({ name, link });
    addCardPopup.close();
    profileEditValidator.enableValidation();
  });
addCardPopup.setEventListeners();
  
// render //

const cardSection = new Section (
    {items: initialCards,
        renderer : (data) => {
            renderCard(data);
        }
    },
    ".gallery__cards"
)
cardSection.renderItems();

function renderCard(data) {
    const card = createCard(data);
    cardSection.addItem(card);
}

addNewCardBtn.addEventListener("click", () => {
    addCardModal.open()
})

function createCard(data) {
    const card = new Card(data, "#card-template", handleImageClick);
    return card.getCard();
}


function handleImageClick(name, link) {
 popupWithImage.open({name, link});
}

// Event listener//

profileEditBtn.addEventListener("click", () => {
    editFormValidator.hideInputError(profileEditForm);
    const {name, description} = userInfo.getUserInfo();
    profileTitleInput.value = name;
    profileDescriptionInput.value = description;
    profileEditModal.open();
});




// form validators //

const editFormValidator = new FormValidator(validationSettings, profileEditForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationSettings, addCardForm);
addFormValidator.enableValidation();
