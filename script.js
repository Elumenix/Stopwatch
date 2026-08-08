console.log("Stopwatch")

let seconds = 0;
let tens = 0;
let minutes = 0;
let hours = 0;
let getMinutes = document.querySelector('.minutes')
let getSeconds = document.querySelector('.seconds')
let getTens = document.querySelector('.tens')
let getHours = document.querySelector('.hours');
let getSign = document.querySelector('.sign');
let btnStart = document.querySelector('.btn-start')
let btnStop = document.querySelector('.btn-stop')
let btnReset = document.querySelector('.btn-reset')
let btnRev = document.querySelector('.btn-rev');
let interval;
let running = false;
let isNegative = false;

const startTime = () => {
    if (!isNegative) {
        // Time is already positive, so we just increase
        tens++;

        if (tens > 99) {
            seconds++;
            tens = 0;
        }
        if (seconds > 59) {
            minutes++;
            seconds = 0;
        }
        if (minutes > 59) {
            hours++;
            minutes = 0;
        }
    }
    else {
        // time is negative, so we're decreasing
        tens--;

        if (tens < 0) {
            tens = 99;
            seconds--;
        }
        if (seconds < 0) {
            seconds = 59;
            minutes--;
        }
        if (minutes < 0) {
            minutes = 59;
            hours--;
        }
        if (hours < 0) {
            // We're now back in the positive numbers
            isNegative = false;
            hours = 0;
            minutes = 0;
            seconds = 0;
            tens = 0;
        }
    }

    getTens.innerHTML = tens <= 9 ? '0' + tens : tens;
    getSeconds.innerHTML = seconds <= 9 ? '0' + seconds : seconds;
    getMinutes.innerHTML = minutes <= 9 ? '0' + minutes : minutes;
    getHours.innerHTML = hours <= 9 ? '0' + hours : hours;

    // Add/remove the negative sign
    getSign.innerHTML = isNegative ? '-' : '&nbsp;';
}

const startTimeReverse = () => {
    if (!isNegative) {
        // Still counting down toward zero
        tens--;

        if (tens < 0) {
            tens = 99;
            seconds--;
        }
        if (seconds < 0) {
            seconds = 59;
            minutes--;
        }
        if (minutes < 0) {
            minutes = 59;
            hours--;
        }
        if (hours < 0) {
            // We will now begin counting up
            isNegative = true;
            hours = 0;
            minutes = 0;
            seconds = 0;
            tens = 0;
        }
    }
    else {
        // Counting upwards
        tens++;

        if (tens > 99) {
            tens = 0;
            seconds++;
        }
        if (seconds > 59) {
            seconds = 0;
            minutes++;
        }
        if (minutes > 59) {
            minutes = 0;
            hours++;
        }
    }

    getTens.innerHTML = tens <= 9 ? '0' + tens : tens;
    getSeconds.innerHTML = seconds <= 9 ? '0' + seconds : seconds;
    getMinutes.innerHTML = minutes <= 9 ? '0' + minutes : minutes;
    getHours.innerHTML = hours <= 9 ? '0' + hours : hours;

    // Add/remove the negative sign
    getSign.innerHTML = isNegative ? '-' : '&nbsp;';
}

btnStart.addEventListener('click', () => {
    clearInterval(interval);
    interval = setInterval(startTime, 10);
    running = true;
})

btnStop.addEventListener('click', () => {
    clearInterval(interval);
    running = false;
})

btnRev.addEventListener('click', () => {
    clearInterval(interval);
    interval = setInterval(startTimeReverse, 10);
    running = true;
})

btnReset.addEventListener('click', () => {
    running = false;
    isNegative = false;
    clearInterval(interval);
    tens = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    getTens.innerHTML = "00";
    getSeconds.innerHTML = "00";
    getMinutes.innerHTML = "00";
    getHours.innerHTML = "00";
    getSign.innerHTML = '&nbsp;';
})