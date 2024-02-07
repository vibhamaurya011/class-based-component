import React, { Component } from 'react';

class Stopwatch extends Component {
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

  tick = () => {
    this.setState((prevState) => ({
      seconds: prevState.seconds + 1,
    }));
  };

  render() {
    const { seconds, isRunning } = this.state;

    return (
      <div>
        <h2>Stopwatch</h2>
        <button onClick={this.handleStartStop}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button onClick={this.handleReset} disabled={seconds === 0}>
          Reset
        </button>
        <p>Elapsed Time: {seconds} seconds</p>
      </div>
    );
  }
}

export default Stopwatch;
