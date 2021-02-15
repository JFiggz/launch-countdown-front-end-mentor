//Global Variables
let fullDate, countdownTimer;

//Calculate and return the difference in time between the selected time and current time
const calcTimeDifference = (endTime) => {
     const currentTime = Date.now();
     const timeDifference = endTime - currentTime;

     if (timeDifference <= 0) {
          clearInterval(countdownTimer);
     }

     const differenceObj = {
          days: Math.floor(timeDifference / 86400000),
          hours: Math.floor((timeDifference % 86400000) / 3600000),
          minutes: Math.floor(((timeDifference % 86400000) % 3600000) / 60000),
          seconds: Math.floor((((timeDifference % 86400000) % 3600000) % 60000) / 1000),
     };

     return differenceObj;
};

//Pass in the panel to trigger the animation on
const triggerAnimate = (panelNum) => {
     const panel = document.querySelectorAll('.flip-panel');
     panel[panelNum].classList.add('animate-card');
     setTimeout(() => { panel[panelNum].classList.remove('animate-card'); }, 750);
};

//Set time on panels and trigger animation for panels that have changed
const setPanelTime = (timeObj) => {
     const backTextDays = document.querySelectorAll('.text-back-days');
     const frontTextDays = document.querySelectorAll('.text-front-days');
     const backTextHr = document.querySelectorAll('.text-back-hrs');
     const frontTextHr = document.querySelectorAll('.text-front-hrs');
     const backTextMin = document.querySelectorAll('.text-back-min');
     const frontTextMin = document.querySelectorAll('.text-front-min');
     const backTextSec = document.querySelectorAll('.text-back-sec');
     const frontTextSec = document.querySelectorAll('.text-front-sec');

     if (parseInt(frontTextDays[0].innerText) !== timeObj.days) {
          backTextDays.forEach(e => e.innerText = timeObj.days <= 0 ? 0 : timeObj.days);
          triggerAnimate(0);
          setTimeout(() => { frontTextDays.forEach(e => e.innerText = timeObj.days <= 0 ? 0 : timeObj.days) }, 375);
     };

     if (parseInt(frontTextHr[0].innerText) !== timeObj.hours) {
          backTextHr.forEach(e => e.innerText = timeObj.hours <= 0 ? 0 : timeObj.hours);
          triggerAnimate(1);
          setTimeout(() => { frontTextHr.forEach(e => e.innerText = timeObj.hours <= 0 ? 0 : timeObj.hours) }, 375);
     };

     if (parseInt(frontTextMin[0].innerText) !== timeObj.minutes) {
          backTextMin.forEach(e => e.innerText = timeObj.minutes <= 0 ? 0 : timeObj.minutes);
          triggerAnimate(2);
          setTimeout(() => { frontTextMin.forEach(e => e.innerText = timeObj.minutes <= 0 ? 0 : timeObj.minutes) }, 375);
     };

     if (parseInt(frontTextSec[0].innerText) !== timeObj.seconds) {
          backTextSec.forEach(e => e.innerText = timeObj.seconds <= 0 ? 0 : timeObj.seconds);
          triggerAnimate(3);
          setTimeout(() => { frontTextSec.forEach(e => e.innerText = timeObj.seconds <= 0 ? 0 : timeObj.seconds) }, 375);
     };
};

//Animate the slider for setting date, set ARIA attributes and slide up/down based on current position
const triggerSlide = () => {
     const setTimeSlide = document.querySelector('.set-time');
     const ddArrows = document.querySelectorAll('.set-time__img');
     const toggleButton = document.querySelector('.set-time__toggle-view');

     if (!setTimeSlide.classList.contains("animate-dd-up")) {
          setTimeSlide.classList.remove("animate-dd-down");
          setTimeSlide.classList.add("animate-dd-up");
          ddArrows.forEach(e => e.setAttribute("src", "./images/icon-expand-down.svg"));
          setTimeSlide.setAttribute("aria-expanded", "false");
          return;
     }

     setTimeSlide.classList.remove("animate-dd-up");
     setTimeSlide.classList.add("animate-dd-down");
     ddArrows.forEach(e => e.setAttribute("src", "./images/icon-expand-up.svg"));
     setTimeSlide.setAttribute("aria-expanded", "true");

};

document.querySelector('.form').addEventListener('submit', (e) => {
     e.preventDefault();
     clearInterval(countdownTimer);

     //Retrieve values from events
     const dateString = e.target.date.value;
     const timeString = e.target.time.value;

     //Split string into individual components
     const dateArr = dateString.split('-');
     const timeArr = timeString.split(':');

     fullDate = new Date();
     fullDate.setFullYear(dateArr[0], dateArr[1] - 1, dateArr[2]);
     fullDate.setHours(timeArr[0], timeArr[1]);

     countdownTimer = setInterval(() => { setPanelTime(calcTimeDifference(fullDate)) }, 1000);
     triggerSlide();
});


document.querySelector('.set-time__toggle-view').addEventListener('click', (e) => {
     triggerSlide();
});






