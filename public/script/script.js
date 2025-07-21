document.addEventListener('DOMContentLoaded', function() {

const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');


const targetdate = new Date("august 1, 2025 10:00:00").getTime();
  function timer (){
    const currentdate = new Date().getTime();
    const distance = targetdate - currentdate;

    const Days = Math.floor(distance /1000/60/60/24);
    const Hours = Math.floor(distance /1000/60/60)%24;
    const Minutes = Math.floor(distance /1000/60)%60;
    const Seconds = Math.floor(distance /1000)%60;

   days.innerHTML = Days;
   hours.innerHTML = Hours;
   minutes.innerHTML = Minutes;
   seconds.innerHTML = Seconds;

   if(distance < 0){
    days.innerHTML = "00";
    hours.innerHTML = "00";
    minutes.innerHTML = "00";
    seconds.innerHTML = "00";
   }
}

  setInterval(timer,1000)

});
