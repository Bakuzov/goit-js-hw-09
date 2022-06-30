import 'flatpickr/dist/flatpickr.min.css';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';

const dateTimeInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');
startBtn.disabled = true;

startBtn.addEventListener('click', onStartBtnClick);

let timeLeft;
let timerId;

flatpickr(dateTimeInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    if (selectedDates[0] > currentDate) {
      startBtn.disabled = false;

      timeLeft = selectedDates[0];
    } else {
      startBtn.disabled = true;

      Notiflix.Notify.failure('Please choose a date in the future', {
        position: 'center-top',
      });
    }
  },
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function onStartBtnClick() {
  startBtn.disabled = true;
  dateTimeInput.disabled = true;
  timerId = setInterval(() => {
    let time = timeLeft - Date.now();
    console.log(time);
    if (time >= 0) {
      let data = convertMs(time);
      days.textContent = addLeadingZero(data.days);
      hours.textContent = addLeadingZero(data.hours);
      minutes.textContent = addLeadingZero(data.minutes);
      seconds.textContent = addLeadingZero(data.seconds);
    } else {
      clearInterval(timerId);
      startBtn.disabled = false;
      dateTimeInput.disabled = false;
    }
  }, 1000);
  Notiflix.Notify.success('Timer Started', {
    position: 'center-top',
  });
}

function addLeadingZero(value) {
  const stringValue = String(value);
  return stringValue.padStart(2, '0');
}
