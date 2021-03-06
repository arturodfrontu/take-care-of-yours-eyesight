import React from "react";
import { render } from "react-dom";

class App extends React.Component {
  state = {
    status: "off",
    time: 0,
    timer: null,
  };

  formatTime = (time) => {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    min = min.toString().padStart(2, "0");
    sec = sec.toString().padStart(2, "0");

    return `${min}:${sec}`;
  };

  step = () => {
    this.setState({ time: this.state.time - 1 });
    
    let stateToSet = { status: "rest", time: 20 };
    
    if (this.state.time != 0) {return;}
    
    if (this.state.status === "rest") {
      stateToSet = { status: "work", time: 1200 };
    }
    
    this.setState(stateToSet);
    this.playBell();
  }

  startTimer = () => {
    this.setState({
      timer: setInterval(this.step, 1000),
      time: 1200,
      status: "work",
    });
  };

  stopTimer = () => {
    this.setState({
      time: 0,
      timer: clearInterval(this.step),
      status: "off",
    });
  };

  closeApp = () => {
    window.close();
  };

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  render() {
    const { status } = this.state;
    return (
      <div>
        <h1>Protect your eyes</h1>
        {status === "off" && (
          <div>
            <p>
              According to optometrists in order to save your eyes, you should
              follow the 20/20/20. It means you should to rest your eyes every
              20 minutes for 20 seconds by looking more than 20 feet away.
            </p>
            <p>
              This app will help you track your time and inform you when it's
              time to rest.
            </p>
          </div>
        )}
        {status === "work" && <img src="./images/work.png" />}
        {status === "rest" && <img src="./images/rest.png" />}
        {status != "off" && (
          <div className="timer">{this.formatTime(this.state.time)}</div>
        )}

        {status === "off" && (
          <button className="btn" onClick={this.startTimer}>
            Start
          </button>
        )}

        {status !== "off" && (
          <button className="btn" onClick={this.stopTimer}>
            {" "}
            Stop
          </button>
        )}

        <button className="btn btn-close" onClick={this.closeApp}>
          {" "}
          X{" "}
        </button>
      </div>
    );
  }
}

render(<App />, document.querySelector("#app"));
