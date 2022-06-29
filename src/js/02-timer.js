import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const dateTimeInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

startBtn.addEventListener('click', onStartBtnClick);

let chosenDate;
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
      chosenDate = selectedDates[0];
    } else {
      startBtn.disabled = true;
      Notiflix.Report.warning('Please choose a date in the future');
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
  //   startBtn.disabled = true;
  //   dateTimeInput.disabled = true;
  timerId = setInterval(() => {
    let timer = chosenDate - Date.now();
    if (timer >= 0) {
      let data = convertMs(timer);
      //   console.log(data);
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
  Notiflix.Notify.success('Time run out');
}

function addLeadingZero(value) {
  const stringValue = String(value);
  return stringValue.padStart(2, '0');
  //   return value < 10 ? '0' + value : value;
}
