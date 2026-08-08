console.log("Stopwatch")

let seconds = 0;
let tens = 0;
let minutes = 0;
let hours = 0;
let getMinutes = document.querySelector('.minutes')
let getSeconds = document.querySelector('.seconds')
let getTens = document.querySelector('.tens')
let getHours = document.querySelector('.hours');
let btnStart = document.querySelector('.btn-start')
let btnStop = document.querySelector('.btn-stop')
let btnReset = document.querySelector('.btn-reset')
let interval;
let running = false;

const startTime = () => {
    tens++;
    if (tens <= 9) {
        getTens.innerHTML = '0' + tens;
    }
    if (tens > 9) {
        getTens.innerHTML = tens;
    }
    if (tens > 99) {
        seconds++;
        getSeconds.innerHTML = '0' + seconds;
        tens = 0;
        getTens.innerHTML = '0' + 0;
    }
    if (seconds > 9) {
        getSeconds.innerHTML = seconds;
    }
    if (seconds > 59) {
        minutes++;
        getMinutes.innerHTML = '0' + minutes;
        seconds = 0;
        getSeconds.innerHTML = '0' + 0
    }
    if (minutes > 9) {
        getMinutes.innerHTML = minutes;
    }
    if (minutes > 59) {
        hours++;
        getHours.innerHTML = '0' + hours;
        minutes = 0;
        getMinutes.innerHTML = '0' + minutes;
    }
    if (hours > 9) {
        getHours.innerHTML = hours;
    }
}

btnStart.addEventListener('click', () => {
    if (!running) {
    running = true;
    interval = setInterval(startTime, 10);
    }
})

btnStop.addEventListener('click', () => {
    running = false;
    clearInterval(interval);
})

btnReset.addEventListener('click', () => {
    running = false;
    clearInterval(interval);
    tens = '00';
    seconds = '00';
    minutes = '00';
    hours = '00';
    getTens.innerHTML = tens;
    getSeconds.innerHTML = seconds;
    getMinutes.innerHTML = minutes;
    getHours.innerHTML = hours;
})