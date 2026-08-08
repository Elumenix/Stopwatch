console.log("Stopwatch")

let getMinutes = document.querySelector('.minutes')
let getSeconds = document.querySelector('.seconds')
let getTens = document.querySelector('.tens')
let getHours = document.querySelector('.hours');
let getSign = document.querySelector('.sign');
let btnStart = document.querySelector('.btn-start')
let btnStop = document.querySelector('.btn-stop')
let btnReset = document.querySelector('.btn-reset')
let btnRev = document.querySelector('.btn-rev');

let startTimestamp = null;
let elapsedAtPause = 0;
let running = false;
let direction = 1; // 1 = forward, -1 = reverse
let interval;

const updateDisplay = (totalMs) => {
    const isNegative = totalMs < 0;
    const absMs = Math.abs(totalMs);

    const totalCentiseconds = Math.floor(absMs / 10);
    const tens = totalCentiseconds % 100;
    const totalSeconds = Math.floor(totalCentiseconds / 100);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    getTens.innerHTML = tens <= 9 ? '0' + tens : tens;
    getSeconds.innerHTML = seconds <= 9 ? '0' + seconds : seconds;
    getMinutes.innerHTML = minutes <= 9 ? '0' + minutes : minutes;
    getHours.innerHTML = hours <= 9 ? '0' + hours : hours;
    getSign.innerHTML = isNegative ? '-' : '';
}

const tick = () => {
    const now = Date.now();
    const elapsed = elapsedAtPause + direction * (now - startTimestamp);
    updateDisplay(elapsed);
}

// Called by both Start and Rev buttons — direction is the only thing that differs
const beginRunning = (newDirection) => {
    clearInterval(interval);

    if (running) {
        // fold in whatever time passed under the old direction before switching
        elapsedAtPause += direction * (Date.now() - startTimestamp);
    }

    direction = newDirection;
    startTimestamp = Date.now();
    interval = setInterval(tick, 10);
    running = true;
}

btnStart.addEventListener('click', () => beginRunning(1));
btnRev.addEventListener('click', () => beginRunning(-1));

btnStop.addEventListener('click', () => {
    clearInterval(interval);
    elapsedAtPause += direction * (Date.now() - startTimestamp);
    running = false;
})

btnReset.addEventListener('click', () => {
    running = false;
    startTimestamp = null;
    elapsedAtPause = 0;
    direction = 1; 
    clearInterval(interval);

    // Set timer to default
    getTens.innerHTML = "00";
    getSeconds.innerHTML = "00";
    getMinutes.innerHTML = "00";
    getHours.innerHTML = "00";
    getSign.innerHTML = '&nbsp;';
})