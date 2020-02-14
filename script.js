const ok_button = document.querySelector('.ok');
const history_button = document.querySelector('.history_button');
const modal = document.querySelector('.modal');
const modal_text = document.querySelector('.text');
const history = document.querySelector('.history');

const name_input = document.querySelector('input[id="name"]');
const hotel_input = document.querySelector('input[id="hotel"]');
const number_input = document.querySelector('input[id="room"]');
const class_select = document.querySelector('select[id="cars"]');
const car_options = class_select.querySelectorAll('option');


let name;
let hotel;
let room;
let carClass;
let htmlText;

name_input.addEventListener('input', function(e) {
        name = e.target.value;
})

hotel_input.addEventListener('input', function(e) {
        hotel = e.target.value;
})

number_input.addEventListener('input', function(e) {
        room = e.target.value;
})

function selectCars(e) {
        car_options.forEach(car => {
                if(car.selected) {
                        carClass = car.value;
                }
        })
}

function handleOkButton() {
        htmlText = `<p>
        ${name}
        ${hotel}
        ${room}
        ${carClass}
        </p>`;

        if(carClass === undefined) {
                htmlText = `<p>WPROWADŻ KLASĘ</p>`;
        }

        modal.classList.add('active');
        modal_text.insertAdjacentHTML("afterbegin", htmlText);
        console.log(name);
        console.log(hotel);
        console.log(room);
        console.log(carClass);
}

function handleHistoryButton() {
        history.classList.add('active');
}

ok_button.addEventListener('click', handleOkButton);
history_button.addEventListener('click', handleHistoryButton);