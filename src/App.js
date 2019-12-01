import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './Board'
import Player from './Player'

function App() {
  var gridLayout = {
    display: 'grid',
    gridTemplateColumns: '1fr 4fr 1fr',
  };
  var flexLayout = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
  return (
    <div style={flexLayout}>
      <h1>Pentago</h1>
      <div style={gridLayout}>
        <Player name="Player 1"/>
        <Board />
        <Player name="Player 2"/>
      </div>
    </div>
  );
}

export default App;
