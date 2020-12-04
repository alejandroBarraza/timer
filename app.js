//declare the three querySelector from play,stop and input.
const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

//inicialize a new timer
//constructor recibe this three varibales from DOM .
const timer = new Timer(durationInput, startButton, pauseButton, {
  onStart() {
    console.log("timer has started(callback)");
  },
  onTick() {
    console.log("timer has ticked down. (callback)");
  },
  onComplete() {
    console.log("times has Finish");
  },
});
