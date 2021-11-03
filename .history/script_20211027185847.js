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

let htmlText;
let cars = [];

const reservation = new Reservation(); 

//EVENT LISTENERS SECTION - START

nameInput.addEventListener('input', function(e) {
        reservation.clientName = e.target.value;
});

hotelInput.addEventListener('input', function(e) {
        reservation.hotel = e.target.value;
});

numberInput.addEventListener('input', function(e) {
        reservation.room = e.target.value;
});

adnotationsInput.addEventListener('input', function(e) {
        reservation.adnotations = e.target.value;
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

//FUNCTIONS 

function selectCars() {
        car_options.forEach(car => {
                if(car.selected) {
                        reservation.carClass = car.value;
                }
        })
}

function selectExtra() {
        extra_options.forEach(extra => {
                if(extra.selected) {
                        reservation.extraAdd = extra.value;
                }
        })
}

function selectDate(e) {
        if(e.target.id === "datein") {
                reservation.dateIn = e.target.value;
                reservation.dayIn = findDay(e.target.valueAsDate.getUTCDay());
        } else if(e.target.id === "dateout") {
                reservation.dateOut = e.target.value;
                reservation.dayOut = findDay(e.target.valueAsDate.getUTCDay());
        }
}

function handleOkButton() {
        htmlText = `
        <p><span>${reservation.clientName}</span></p>
        <p>${reservation.hotel}</p>
        <p>pokój nr <span>${reservation.room}</span></p>
        <p>klasa: <span>${reservation.carClass}</span></p>
        <p>${insurance.checked ? "z ubezpieczeniem" : "bez ubezpieczenia"}</p>
        <p>Od: <span>${reservation.dateIn} ${reservation.dayIn}</span></p>
        <p>Do: <span>${reservation.dateOut} ${reservation.dayOut}</span></p>
        <p><span>+ ${reservation.extraAdd}</span></p>
        <p><span>${reservation.adnotations}</span></p>
        `;

        if(reservation.carClass === undefined) {
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

        reservation.id = time.toLocaleString();
        reservation.insurance = insurance.checked ? "z ubezp." : "",


        modal.classList.remove('active');
        modal_text.textContent = '';

        const lsCars = JSON.parse(localStorage.getItem('cars'));
        

        //save to localstorage

        if(lsCars === null) {
                if(reservation.carClass !== undefined && reservation.carClass !== "-") {
                        cars.push(reservation);
                }
        } else {
                cars.push(...lsCars);
                if(reservation.carClass !== undefined && reservation.carClass !== "-") {
                        cars.push(reservation);
                }
        }
        localStorage.setItem('cars', JSON.stringify(cars));

        // clear inputs

        clearInputs(nameInput, hotelInput, numberInput, class_select, insurance, startDate, endDate, extraSelect, adnotationsInput);
}

function handleBackButton() {
        history.classList.remove('active');
        divHistory.textContent = '';

        //clear inputs

        clearInputs(nameInput, hotelInput, numberInput, class_select, insurance, startDate, endDate, extraSelect, adnotationsInput);
}