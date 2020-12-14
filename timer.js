class Timer {
  //constructor recibe 3 query selectrom from DOM ELEMTENTS (input,playbutton,stopButton).
  constructor(
    durationInput,
    startButton,
    pauseButton,
    resetButton,
    paused,
    callback
  ) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    this.resetButton = resetButton;
    this.paused = paused; //intace if timer has been paused.
    //if callback was passed trought.
    if (callback) {
      this.onStart = callback.onStart;
      this.onTick = callback.onTick;
      this.onComplete = callback.onComplete;
      this.onPause = callback.onPause;
      this.onResume = callback.onResume;
      this.onReset = callback.onReset;
    }
    //method than runs each time a button play is pressed.
    this.startButton.addEventListener("click", this.onCheckStatus);
    this.pauseButton.addEventListener("click", this.pause);
    this.resetButton.addEventListener("click", () => {
      console.log(this);
      this.onReset();
      this.startButton.disabled = false;
      this.pauseButton.disabled = false;
      this.durationInput.disabled = false;
    });
  }
  //add this line
  //we use arrow function bc we alwaus want to point to this inside class.is wen doesnt want
  //to usea rrow fucnion we can use bind(this ) after this.start in the adddeventlistener.

  //check if button was paused pressed for dont star from begining.
  onCheckStatus = () => {
    if (this.paused) {
      this.onResume();
      this.startButton.disabled = true;
      this.pauseButton.disabled = false;
    } else if (!this.paused) {
      this.start();
    }
  };
  //start timer method.
  start = () => {
    //only if callback (onStart) has  a parameter passed in.

    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }
    //i need to call it manually bc is a timer. it will ha a delay of 1000ms later than expected when got called it.
    this.tick();
    //when i press play button i need to call tick each second.
    //setIntervel return a idvalue for cancel the call.
    //we need to saved as this intead of const or let for call it in another method inside the class.
    this.interval = setInterval(this.tick, 20); //remove 1000 replace from 50 ms
    this.startButton.disabled = true;
    this.pauseButton.disabled = false;
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
      this.timeRemaining = this.timeRemaining - 0.02; //substrac -.0.05 bc we susbstrait 50ms.
      //after substract 1.each time callback onTick is called.
      if (this.onTick) {
        this.onTick();
      }
    }
  };
  //pause method for stop the time
  pause = () => {
    if (this.onPause) {
      this.paused = true;
      this.onPause();
    }
    clearInterval(this.interval);
    this.durationInput.disabled = true; //desable input while pressed button

    //this.OnPause(this.timeRemaining);
    this.startButton.disabled = false;
    this.pauseButton.disabled = true;
  };

  get timeRemaining() {
    //return float from dom input value
    return parseFloat(this.durationInput.value);
  }
  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2); //save just 2 last units.
  }

  get pausedStart() {
    return this.pauseButton;
  }
  set pausedStart(button) {
    this.pauseButton = button;
  }
}
