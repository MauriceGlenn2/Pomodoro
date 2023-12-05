//using querySelector need to use the const variable
const timerMilliSeconds = document.querySelector(".timer__milliseconds");
const timerSeconds = document.querySelector(".timer__seconds");
const timerMinutes = document.querySelector(".timer__minutes");
const startButton = document.querySelector(".stopwatch__start");
const stopButton = document.querySelector(".stopwatch__stop");
const resetButton = document.querySelector(".stopwatch__reset");

let cancelId;
let startTime;
let savedTime = 0;
//need to start from 25 min converted into milliseconds
const countDown = 5 * 1000;

function startTimer() {
  //enable the buttons 
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = false; 


  startTime = Date.now(); //date.now() returns the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC.
  requestAnimationFrame(updateTimer);
  cancelId = requestAnimationFrame(updateTimer);

}

function stopTimer() {
  //enable the buttons
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false; 
  savedTime = Date.now() - startTime + savedTime; //gets the time elapsed since the start and stop of the timer
    if (cancelId) {
      cancelAnimationFrame(cancelId);
      cancelId = null; // set cancelId to null after cancelling animation frame
    }
}

function resetTimer() {
  startTime = Date.now(); //makes the reset button work when its running
  savedTime = 0; //resets the saved time to 0

  timerMilliSeconds.innerHTML = "000";
  timerSeconds.innerHTML = "05";
  timerMinutes.innerHTML = "01";
}

function updateTimer() {
  let millisElapsed = Date.now() - startTime + savedTime;

  // countDown from 25min coverted to milliseconds
  let millisLeft = countDown - millisElapsed; //gets milliseconds left, everything is calculated from millisLeft
  //stop the timer when it reaches 0
  if (millisLeft < 0) {
    millisLeft = 0;
    cancelAnimationFrame(cancelId);
    cancelId = null;
  }

  let secondsLeft = millisLeft / 1000; //gets seconds
  let minutesLeft = secondsLeft / 60; //gets minutes

  let millisText = millisLeft % 1000; //gets last 3 digits of milliseconds
  let secondsText = Math.floor(secondsLeft) % 60; //gets seconds and rounds down
  let minutesText = Math.floor(minutesLeft) % 60; //gets minutes and rounds down

  //placing 0 in front of single digit numbers
  if (minutesText.toString().length < 2) {
    minutesText = minutesText.toString().padStart(2, "0"); //2 digits and adds "0" to the left of the number
  }
  if (secondsText.toString().length < 2) {
    secondsText = secondsText.toString().padStart(2, "0");
  }
  if (millisText.toString().length < 3) {
    millisText = millisText.toString().padStart(3, "0");
  }

  timerMilliSeconds.innerHTML = millisText;
  timerSeconds.innerHTML = secondsText;
  timerMinutes.innerHTML = minutesText;

  //stop the timer when it reaches 0, if cancleId is existent, call animation frame
  if (cancelId) {
    cancelId = requestAnimationFrame(updateTimer);
  }
}
