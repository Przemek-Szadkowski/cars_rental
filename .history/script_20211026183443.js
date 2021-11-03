import * as selectors from './utils/selectors.js';
import { getElement, getElementsInParentsElement } from './utils/helpers.js';
import { findDay, clr } from './helpers.js';

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
        clientName = e.target.value;
});

hotelInput.addEventListener('input', function(e) {
        hotel = e.target.value;
});

numberInput.addEventListener('input', function(e) {
        room = e.target.value;
});

adnotationsInput.addEventListener('input', function(e) {
        adnotations = e.target.value;
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

//to może z argsami???

function clearInputs() {
        nameInput.value = '';
        hotelInput.value = '';
        numberInput.value = '';
        class_select.value = '';
        insurance.checked = false;
        startDate.value = '';
        endDate.value = '';
        extraSelect.value = '';
        adnotationsInput.value = '';
}

clr(nameInput, hotelInput);


function selectCars() {
        car_options.forEach(car => {
                if(car.selected) {
                        carClass = car.value;
                }
        })
}

function selectExtra() {
        extra_options.forEach(extra => {
                if(extra.selected) {
                        extraAdd = extra.value;
                }
        })
}

function selectDate(e) {
        if(e.target.id === "datein") {
                dateIn = e.target.value;
                dayIn = findDay(e.target.valueAsDate.getUTCDay());
        } else if(e.target.id === "dateout") {
                dateOut = e.target.value;
                dayOut = findDay(e.target.valueAsDate.getUTCDay());
        }
}

function handleOkButton() {
        htmlText = `
        <p><span>${clientName}</span></p>
        <p>${hotel}</p>
        <p>pokój nr <span>${room}</span></p>
        <p>klasa: <span>${carClass}</span></p>
        <p>${insurance.checked ? "z ubezpieczeniem" : "bez ubezpieczenia"}</p>
        <p>Od: <span>${dateIn} ${dayIn}</span></p>
        <p>Do: <span>${dateOut} ${dayOut}</span></p>
        <p><span>+ ${extraAdd}</span></p>
        <p><span>${adnotations}</span></p>
        `;

        if(carClass === undefined) {
                htmlText = `<p>wprowadż klasę!!!</p>`;
        }

        modal.classList.add('active');
        modal_text.insertAdjacentHTML("afterbegin", htmlText);
}

function handleHistoryButton() {
        history.classList.add('active');
        const lsCars = JSON.parse(localStorage.getItem('cars'));
        let counter = 0;
        if(lsCars.length) {
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
        const time = new Date;

        const car = {
                clientName,
                hotel,
                room,
                carClass,
                insurance: insurance.checked ? "z ubezp." : "",
                dateIn,
                dateOut,
                extraAdd,
                adnotations,
                id: time.toLocaleString(),
        }

        modal.classList.remove('active');
        modal_text.textContent = '';

        const lsCars = JSON.parse(localStorage.getItem('cars'));

        if(lsCars === null) {
                if(carClass !== undefined && car.carClass !== "-") {
                        cars.push(car);
                }
        } else if(lsCars.length) {
                cars.push(...lsCars);
                if(carClass !== undefined && car.carClass !== "-") {
                        cars.push(car);
                }
        }
        localStorage.setItem('cars', JSON.stringify(cars));
        clearInputs();
}

function handleBackButton() {
        history.classList.remove('active');
        divHistory.textContent = '';
        clearInputs();
}