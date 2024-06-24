import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import './index.css';
import { validationSettings } from "../utils/constants.js";
import { initialCards } from "../utils/constants.js";
import Popup from "../components/Popup.js";


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
 
  function handleProfileEditSubmit(UserData) {
    profileEditPopup.close();
    userInfo.setUserInfo(UserData);
  }

  function handleCardSubmit(data){
    const name = data.title;
  const link = data.url;
  cardSection.addItem({ link, name });
    addFormValidator.toggleButtonState();
    addCardPopup.close();
  }

// Pop Ups // 


const popupWithImage = new PopupWithImage("#image-popup-modal");
popupWithImage.setEventListeners();

function handleImageClick(data) {
    popupWithImage.open(data);
   }

const profileEditPopup = new PopupWithForm(
    "#profile-edit-modal",
    handleProfileEditSubmit
  );
profileEditPopup.setEventListeners();

const addCardPopup = new PopupWithForm(
    "#card-add-modal", 
    handleCardSubmit
  );
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


function createCard(data) {
    const card = new Card(data, "#card-template", handleImageClick);
    return card.getCard();
}




// Event listener//

profileEditBtn.addEventListener("click", () => {
    editFormValidator.toggleButtonState();
    const userData = userInfo.getUserInfo();
    profileTitleInput.value = userData.name;
    profileDescriptionInput.value = userData.description;
    profileEditPopup.open();
});

addNewCardBtn.addEventListener("click", () => {
    addCardPopup.open()
})




// form validators //

const editFormValidator = new FormValidator(validationSettings, profileEditForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationSettings, addCardForm);
addFormValidator.enableValidation();
