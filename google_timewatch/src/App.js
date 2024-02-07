// src/App.js
import React, { Component } from 'react';
import Timer from './components/Timer';
import Stopwatch from './components/Stopwatch';

class App extends Component {
  render() {
    return (
      <div>
        <Timer />
        <Stopwatch />
      </div>
    );
  }
}

export default App;
