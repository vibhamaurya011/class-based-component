import React, { Component } from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      isRunning: false,
    };
    this.intervalId = null;
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  handleStartStop = () => {
    this.setState((prevState) => ({
      isRunning: !prevState.isRunning,
    }), () => {
      if (this.state.isRunning) {
        this.intervalId = setInterval(this.tick, 1000);
      } else {
        clearInterval(this.intervalId);
      }
    });
  };

  handleReset = () => {
    this.setState({
      seconds: 0,
      isRunning: false,
    });
    clearInterval(this.intervalId);
  };

  handleInputChange = (e) => {
    const seconds = parseInt(e.target.value, 10);
    this.setState({ seconds });
  };

  tick = () => {
    this.setState((prevState) => ({
      seconds: prevState.seconds - 1,
    }), () => {
      if (this.state.seconds === 0) {
        this.handleReset();
      }
    });
  };

  render() {
    const { seconds, isRunning } = this.state;

    return (
      <div>
        <h2>Timer</h2>
        <input
          type="number"
          placeholder="Enter seconds"
          value={seconds}
          onChange={this.handleInputChange}
          disabled={isRunning}
        />
        <button onClick={this.handleStartStop}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button onClick={this.handleReset} disabled={seconds === 0}>
          Reset
        </button>
        <p>Time Remaining: {seconds} seconds</p>
      </div>
    );
  }
}

export default Timer;
