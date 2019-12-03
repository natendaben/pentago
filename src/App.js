import React from 'react';
import './App.css';
import Board from './Board'
import Player from './Player'

function App() {
  var gridLayout = {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    width: "100%",
    justifySelf: "center",
    alignSelf: "center",
  };
  var flexLayout = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };
  var headingStyle = {
    fontFamily: 'Baskerville, "Hoefler Text", Garamond, "Times New Roman", serif',
    fontSize: "300%",
    fontWeight: "400",
    borderBottom: "3px solid black",
    letterSpacing: ".7em",
    textIndent: ".7em",
    margin: "2% 0% 2% 0%",
  }
  var heading2Style = {
    fontFamily: 'Baskerville, "Hoefler Text", Garamond, "Times New Roman", serif',
    fontSize: "200%",
    fontWeight: "700",
    margin: "4% 0% 1% 0%",
  } 

  return (

    <div style={flexLayout}>
      <h1 style={headingStyle}>PENTAGO</h1>
      <div style={gridLayout}>
        <Player name="Nate" player='1'/>
        <Board />
        <Player name="Elsa" player='2'/>
      </div>
      <h2 style={heading2Style}>Elsa, it is your turn!</h2>

    </div>
  );
}

export default App;
