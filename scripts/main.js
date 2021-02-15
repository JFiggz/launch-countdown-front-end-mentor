
//Calculate and return the difference in time between the selected time and current time
const calcTimeDifference = (endTime) => {
     const currentTime = new Date();
     const timeDifference = endTime - currentTime;

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
     panel[panelNum].classList.toggle('animate');
};

//Set time on panels
const setPanelTime = (timeObj) => {
     const backTextDays = document.querySelectorAll('.text-back-days');
     const frontTextDays = document.querySelectorAll('.text-front-days');
     const backTextHr = document.querySelectorAll('.text-back-hrs');
     const frontTextHr = document.querySelectorAll('.text-front-hrs');
     const backTextMin = document.querySelectorAll('.text-back-min');
     const frontTextMin = document.querySelectorAll('.text-front-min');
     const backTextSec = document.querySelectorAll('.text-back-sec');
     const frontTextSec = document.querySelectorAll('.text-front-sec');

     if (frontTextDays[0] !== timeObj.days) {
          backTextDays.forEach(e => e.innerText = timeObj.days - 1 <= 0 ? 0 : timeObj.days - 1);
          frontTextDays.forEach(e => e.innerText = timeObj.days <= 0 ? 0 : timeObj.days);
     };

     if (frontTextHr[0] !== timeObj.hours) {
          backTextHr.forEach(e => e.innerText = timeObj.hours - 1 <= 0 ? 0 : timeObj.hours - 1);
          frontTextHr.forEach(e => e.innerText = timeObj.hours <= 0 ? 0 : timeObj.hours);
     };

     if (frontTextMin[0] !== timeObj.minutes) {
          backTextMin.forEach(e => e.innerText = timeObj.minutes - 1 <= 0 ? 0 : timeObj.minutes - 1);
          frontTextMin.forEach(e => e.innerText = timeObj.minutes <= 0 ? 0 : timeObj.minutes);
     };

     if (frontTextSec[0] !== timeObj.seconds) {
          backTextSec.forEach(e => e.innerText = timeObj.seconds - 1 <= 0 ? 0 : timeObj.seconds - 1);
          frontTextSec.forEach(e => e.innerText = timeObj.seconds <= 0 ? 0 : timeObj.seconds);
     };

};

document.querySelector('.form').addEventListener('submit', (e) => {
     e.preventDefault();

     //Retrieve values from events
     const dateString = e.target.date.value;
     const timeString = e.target.time.value;

     //Split string into individual components
     const dateArr = dateString.split('-');
     const timeArr = timeString.split(':');

     const fullDate = new Date();

     fullDate.setFullYear(dateArr[0], dateArr[1] - 1, dateArr[2]);
     fullDate.setHours(timeArr[0], timeArr[1]);


     setPanelTime(calcTimeDifference(fullDate));
});

