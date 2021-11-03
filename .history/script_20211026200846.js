//IMPORTS

import * as selectors from './utils/selectors.js';
import Reservation from './Reservation.js';
import { getElement, getElementsInParentsElement, findDay, clearInputs } from './utils/helpers.js';

// ELEMENTS

const ok_button = getElement(selectors.OK_BUTTON_CLASS);
const history_button = getElement(selectors.HISTORY_BUTTON_CLASS);
const modal = getElement(selectors.MODAL_CLASS);
const modal_text = getElement(selectors.MODAL_TEXT_CLASS);
const history = getElement(selectors.HISTORY_CLASS);
const divHistory = getElement(selectors.DIV_HISTORY_CLASS);
const nameInput = getElement(selectors.NAME_INPUT_SELECTOR);
const hotelInput = getElement(selectors.HOTEL_INPUT_SELECTOR);
const numberInput = getElement(selectors.NUMBER_INPUT_SELECTOR);
const class_select = getElement(selectors.CLASS_SELECT_SELECTOR);
const car_options = getElementsInParentsElement(class_select, 'option');
const insurance = getElement(selectors.INSURANCE_SELECTOR);
const startDate = getElement(selectors.START_DATE_SELECTOR);
const endDate = getElement(selectors.END_DATE_SELECTOR);
const buttonChange = getElement(selectors.BUTTON_CHANGE_SELECTOR);
const extraSelect = getElement(selectors.EXTRA_SELECT_SELECTOR);
const extra_options = getElementsInParentsElement(extraSelect,'option');
const saveButton = getElement(selectors.SAVE_BUTTON_SELECTOR);
const adnotationsInput = getElement(selectors.ADNOTATIONS_INPUT_SELECTOR);
const backButton = getElement(selectors.BACK_BUTTON_SELECTOR);

// VARIABLES

let cars = [];

const newReservation = new Reservation(); 

let clientName;
let hotel;
let room;
let carClass;
let htmlText;
let dateIn;
let dayIn;
let dayOut;
let dateOut;
let extraAdd = '';
let adnotations = '';

//EVENT LISTENERS SECTION - START

nameInput.addEventListener('input', function(e) {
        // clientName = e.target.value;
        newReservation.clientName = e.target.value;
});

hotelInput.addEventListener('input', function(e) {
        // hotel = e.target.value;
        newReservation.hotel = e.target.value;
});

numberInput.addEventListener('input', function(e) {
        // room = e.target.value;
        newReservation.room = e.target.value;
});

adnotationsInput.addEventListener('input', function(e) {
        // adnotations = e.target.value;
        newReservation.adnotations = e.target.value;
});

class_select.addEventListener('change', selectCars);
extraSelect.addEventListener('change', selectExtra);
startDate.addEventListener('change', selectDate);
endDate.addEventListener('change', selectDate);

ok_button.addEventListener('click', handleOkButton);
history_button.addEventListener('click', handleHistoryButton);
buttonChange.addEventListener('click', handleChangeButton);
saveButton.addEventListener('click', handleSaveButton);
backButton.addEventListener('click', handleBackButton);

//EVENT LISTENERS SECTION - END

//dodać DOM Purify


function selectCars() {
        car_options.forEach(car => {
                if(car.selected) {
                        // carClass = car.value;
                        newReservation.carClass = car.value;
                }
        })
}

function selectExtra() {
        extra_options.forEach(extra => {
                if(extra.selected) {
                        // extraAdd = extra.value;
                        newReservation.extraAdd = extra.value;
                }
        })
}

function selectDate(e) {
        if(e.target.id === "datein") {
                // dateIn = e.target.value;
                // dayIn = findDay(e.target.valueAsDate.getUTCDay());
                newReservation.dateIn = e.target.value;
                newReservation.dayIn = findDay(e.target.valueAsDate.getUTCDay());
        } else if(e.target.id === "dateout") {
                // dateOut = e.target.value;
                // dayOut = findDay(e.target.valueAsDate.getUTCDay());
                newReservation.dateOut = e.target.value;
                newReservation.dayOut = findDay(e.target.valueAsDate.getUTCDay());
        }
}

function handleOkButton() {
        htmlText = `
        <p><span>${newReservation.clientName}</span></p>
        <p>${newReservation.hotel}</p>
        <p>pokój nr <span>${newReservation.room}</span></p>
        <p>klasa: <span>${newReservation.carClass}</span></p>
        <p>${insurance.checked ? "z ubezpieczeniem" : "bez ubezpieczenia"}</p>
        <p>Od: <span>${newReservation.dateIn} ${newReservation.dayIn}</span></p>
        <p>Do: <span>${newReservation.dateOut} ${newReservation.dayOut}</span></p>
        <p><span>+ ${newReservation.extraAdd}</span></p>
        <p><span>${newReservation.adnotations}</span></p>
        `;

        if(newReservation.carClass === undefined) {
                htmlText = `<p>wprowadż klasę!!!</p>`;
        }

        modal.classList.add('active');
        modal_text.insertAdjacentHTML("afterbegin", htmlText);
}

function handleHistoryButton() {
        history.classList.add('active');
        const lsCars = JSON.parse(localStorage.getItem('cars'));
        let counter = 0;
        if(lsCars) {
                cars = lsCars;
        }
        const historyHtml = cars.map(car =>
                `<p>${++counter}: ${car.id} / ${car.clientName} / ${car.hotel} / ${car.room} / ${car.carClass} / ${car.insurance} / ${car.dateIn} / ${car.dateOut} / ${car.extraAdd} / ${car.adnotations}</p>`
        ).join('');
        divHistory.innerHTML = historyHtml;
}

function handleChangeButton() {
        modal.classList.remove('active');
        modal_text.textContent = '';
}

function handleSaveButton() {
        cars = [];
        const time = new Date;

        // const car = {
        //         clientName,
        //         hotel,
        //         room,
        //         carClass,
        //         insurance: insurance.checked ? "z ubezp." : "",
        //         dateIn,
        //         dateOut,
        //         extraAdd,
        //         adnotations,
        //         id: time.toLocaleString(),
        // }

        newReservation.id = time.toLocaleString();
        newReservation.insurance = insurance.checked ? "z ubezp." : "",


        modal.classList.remove('active');
        modal_text.textContent = '';

        const lsCars = JSON.parse(localStorage.getItem('cars'));
        

        if(lsCars === null) {
                if(newReservation.carClass !== undefined && newReservation.carClass !== "-") {
                        cars.push(newReservation);
                }
        } else {
                cars.push(...lsCars);
                if(newReservation.carClass !== undefined && newReservation.carClass !== "-") {
                        cars.push(newReservation);
                }
        }
        localStorage.setItem('cars', JSON.stringify(cars));
        clearInputs(nameInput, hotelInput, numberInput, class_select, insurance, startDate, endDate, extraSelect, adnotationsInput);
}

function handleBackButton() {
        history.classList.remove('active');
        divHistory.textContent = '';
        clearInputs(nameInput, hotelInput, numberInput, class_select, insurance, startDate, endDate, extraSelect, adnotationsInput);
}