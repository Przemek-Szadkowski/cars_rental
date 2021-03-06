const ok_button = document.querySelector('.ok');
const history_button = document.querySelector('.history_button');
const modal = document.querySelector('.modal');
const modal_text = document.querySelector('.text');
const history = document.querySelector('.history');
const divHistory = document.querySelector('.text_history');

const name_input = document.querySelector('input[id="name"]');
const hotel_input = document.querySelector('input[id="hotel"]');
const number_input = document.querySelector('input[id="room"]');
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

let name;
let hotel;
let room;
let carClass;
let htmlText;
let withInsurance = false;
let dateIn;
let dayIn;
let dayOut;
let dateOut;
let extraAdd = '';
let adnotations = '';

name_input.addEventListener('input', function(e) {
        name = e.target.value;
})

hotel_input.addEventListener('input', function(e) {
        hotel = e.target.value;
})

number_input.addEventListener('input', function(e) {
        room = e.target.value;
})

adnotationsInput.addEventListener('input', function(e) {
        adnotations = e.target.value;
})

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
        <p><span>${name}</span></p>
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
        const html = cars.map(car =>
                `<p>${++counter}: ${car.id} / ${car.name} / ${car.hotel} / ${car.room} / ${car.carClass} / ${car.insurance} / ${car.dateIn} / ${car.dateOut} / ${car.extraAdd} / ${car.adnotations}</p>`
        ).join('');
        divHistory.innerHTML = html;
}

function handleChangeButton() {
        modal.classList.remove('active');
        modal_text.textContent = '';
}

function handleSaveButton() {
        const time = new Date;

        const car = {
                name,
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
        location.reload();
}

function handleBackButton() {
        history.classList.remove('active');
        divHistory.textContent = '';
        location.reload();
}

ok_button.addEventListener('click', handleOkButton);
history_button.addEventListener('click', handleHistoryButton);
buttonChange.addEventListener('click', handleChangeButton);
saveButton.addEventListener('click', handleSaveButton);
backButton.addEventListener('click', handleBackButton);
