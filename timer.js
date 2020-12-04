class Timer {
  //constructor recibe 3 query selectrom from DOM ELEMTENTS (input,playbutton,stopButton).
  constructor(durationInput, startButton, pauseButton, callback) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    if (callback) {
      this.onStart = callback.onStart;
      this.onTick = callback.onTick;
      this.onComplete = callback.onComplete;
    }
    //method than runs each time a button play is pressed.
    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
  }
  //add this line
  //we use arrow function bc we alwaus want to point to this inside class.is wen doesnt want
  //to usea rrow fucnion we can use bind(this ) after this.start in the adddeventlistener.
  start = () => {
    //only if callback (onStart) has  a parameter passed in.
    if (this.onStart) {
      this.onStart();
    }
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
    //if time got 0 stop the ticked down.
    if (this.timeRemaining === 0) {
      this.pause();
      //after time is done callback complete is executed.
      if (this.onComplete) {
        this.onComplete();
      }
      //not 0 yet.sibstract -1.
    } else {
      this.timeRemaining = this.timeRemaining - 1;
      //after substract 1.each time callback onTick is called.
      if (this.onTick) {
        this.onTick();
      }
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
