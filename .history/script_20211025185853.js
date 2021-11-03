import * as selectors from 'constans.js';

console.log(selectors);

const ok_button = document.querySelector('.ok');
const history_button = document.querySelector('.history_button');
const modal = document.querySelector('.modal');
const modal_text = document.querySelector('.text');
const history = document.querySelector('.history');
const divHistory = document.querySelector('.text_history');

const nameInput = document.querySelector('input[id="name"]');
const hotelInput = document.querySelector('input[id="hotel"]');
const numberInput = document.querySelector('input[id="room"]');
const class_select = document.querySelector('select[id="cars"]');
const car_options = class_select.querySelectorAll('option');
const insurance = document.querySelector('input[id="insurance"]');
const startDate = document.querySelector('input[id="datein"]');
const endDate = document.querySelector('input[id="dateout"]');
const buttonChange = document.querySelector('.change');
const extraSelect = document.querySelector('select[id="extra"]');
const extra_options = extraSelect.querySelectorAll('option');
const saveButton = document.querySelector('.save');
const adnotationsInput = document.querySelector('input[id="adnotations"]');
const backButton = document.querySelector('.back');


let cars = [];

let clientName;
let hotel;
let room;
let carClass;
let htmlText;
// let withInsurance = false;
let dateIn;
let dayIn;
let dayOut;
let dateOut;
let extraAdd = '';
let adnotations = '';

nameInput.addEventListener('input', function(e) {
        clientName = e.target.value;
})

hotelInput.addEventListener('input', function(e) {
        hotel = e.target.value;
})

numberInput.addEventListener('input', function(e) {
        room = e.target.value;
})

adnotationsInput.addEventListener('input', function(e) {
        adnotations = e.target.value;
})

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

function findDay(value) {
        let day;
        switch (value) {
                case 0:
                        day = "niedziela";
                        break;
                case 1:
                        day = "poniedziałek";
                        break;
                case 2:
                        day = "wtorek";
                        break;
                case 3:
                        day = "środa";
                        break;
                case 4:
                        day = "czwartek";
                        break;
                case 5:
                        day = "piątek";
                        break;
                case 6:
                        day = "sobota"
                        break;
                default:
                        day = undefined;
      }
      return day;
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

ok_button.addEventListener('click', handleOkButton);
history_button.addEventListener('click', handleHistoryButton);
buttonChange.addEventListener('click', handleChangeButton);
saveButton.addEventListener('click', handleSaveButton);
backButton.addEventListener('click', handleBackButton);