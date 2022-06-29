const body = document.querySelector('body');
const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');

startButton.addEventListener('click', onStartButtonClick);
stopButton.addEventListener('click', onStopButtonClick);

function onStartButtonClick() {
  timerId = setInterval(colorChange, 1000);
  startButton.disabled = true;
  stopButton.disabled = false;
}

function colorChange() {
  body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStopButtonClick() {
  clearInterval(timerId);
  startButton.disabled = false;
  stopButton.disabled = true;
}
