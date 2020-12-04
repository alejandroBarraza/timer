class Timer {
  //constructor recibe 3 query selectrom from DOM ELEMTENTS (input,playbutton,stopButton).
  constructor(durationInput, startButton, pauseButton) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    //method than runs each time a button play is pressed.
    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
  }
  //add this line
  //we use arrow function bc we alwaus want to point to this inside class.is wen doesnt want
  //to usea rrow fucnion we can use bind(this ) after this.start in the adddeventlistener.
  start = () => {
    //i need to call it manually bc is a timer. it will ha a delay of 1000ms later than expected when got called it.
    this.tick();
    //when i press play button i need to call tick each second.
    //setIntervel return a idvalue for cancel the call.
    //we need to saved as this intead of const or let for call it in another method inside the class.
    this.interval = setInterval(this.tick, 1000);
    this.startButton.disabled = true;
  };
  //tick method will check time that has gone.
  tick = () => {
    //read html value and substract -1 and store it in the html back
    //we use passfloat becahse we take the value from a html value and want to substract 1
    //const timeRemaining = parseFloat(this.durationInput.value);
    //get back value to input value with -1 each time is called
    //this.durationInput.value = timeRemaining - 1;

    //doing it with setter and getters.
    if (this.timeRemaining === 0) {
      this.pause();
    } else {
      this.timeRemaining = this.timeRemaining - 1;
    }
  };
  //pause method for stop the time
  pause = () => {
    clearInterval(this.interval);
    this.startButton.disabled = false;
  };

  get timeRemaining() {
    //return float from dom input value
    return parseFloat(this.durationInput.value);
  }
  set timeRemaining(time) {
    this.durationInput.value = time;
  }
}
//declare the three querySelector from play,stop and input.
const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

//inicialize a new timer
//constructor recibe this three varibales from DOM .
const timer = new Timer(durationInput, startButton, pauseButton);
