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
//draw the full circle
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
      //calculate currentofset for matching for each tick.
      currentOffset = (perimeter * timer.timeRemaining) / duration - perimeter;
      //set limit to 3/4 of pertimer and if currentoffset is grather than 70% perimter change color to navy-blue
      let limit = perimeter * 0.7;
      if (Math.abs(currentOffset) > limit) {
        circle.setAttribute("stroke", "#12263a");
      }

      //set atribute to stroke-dashoffset with current stroke-dashoffset.
      circle.setAttribute("stroke-dashoffset", currentOffset);
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
