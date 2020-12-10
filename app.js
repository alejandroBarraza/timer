//declare the three querySelector from play,stop and input.
const durationInput = document.querySelector("#duration"); //select the input from timer.
const startButton = document.querySelector("#start"); //select the start button
const pauseButton = document.querySelector("#pause"); //select the pause botton
const resetButton = document.querySelector("#reset"); //select the pause botton

const circle = document.querySelector("circle"); //select the svg circle.
//perimeter from the radious
const perimeter = 2 * Math.PI * circle.getAttribute("r");

circle.setAttribute("stroke-dasharray", perimeter);

//inicialize a new timer
//constructor recibe this three varibales from DOM .
let duration = 0;
let currentOffset = 0;
let paused = false;
console.log("pase por aki"); //draw the full circle
const timer = new Timer(
  durationInput,
  startButton,
  pauseButton,
  resetButton,
  paused,
  {
    onStart(timeStart) {
      duration = timeStart;
    },
    onTick() {
      //calculate currentofset for matching with each tick.
      //console.log(currentOffset);
      currentOffset = (perimeter * timer.timeRemaining) / duration - perimeter;
      let alert = perimeter * 0.25;

      if (currentOffset > alert) {
        circle.setAttribute("stroke", "red");
      }
      console.log(`bengo despues ${currentOffset}`);
      circle.setAttribute("stroke-dashoffset", currentOffset);

      //menos un pixel cada tick
      //went strat we want dasharay=perimeter and at finish dashoffset = perimeter *-1

      //console.log("timer has ticked down. (callback)");
    },
    onComplete() {
      console.log("time has complete.");
      //circle.setAttribute("stroke-dasharray", perimeter);
      //circle.setAttribute("stroke-dashoffset", 0);
    },
    onPause() {
      console.log("stop  timer");
    },
    onResume() {
      timer.tick();
      this.interval = setInterval(this.tick, 20);
    },
    onReset() {
      //quick fix about strange behavior stroke-dashoffset cvs at reset.
      location.reload(); //reload the page.
    },
  }
);
