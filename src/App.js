import React, {Component} from 'react';
import './App.css';
import Quadrant from './Quadrant'
import Player from './Player'

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
        arrays: [
          [
            {type: "0", id: 0},
            {type: "0", id: 1},
            {type: "0", id: 2},
            {type: "0", id: 3},
            {type: "0", id: 4},
            {type: "0", id: 5},
            {type: "0", id: 6},
            {type: "0", id: 7},
            {type: "0", id: 8},
          ],
          [
            {type: "0", id: 0},
            {type: "0", id: 1},
            {type: "0", id: 2},
            {type: "0", id: 3},
            {type: "0", id: 4},
            {type: "0", id: 5},
            {type: "0", id: 6},
            {type: "0", id: 7},
            {type: "0", id: 8},
          ],
          [
            {type: "0", id: 0},
            {type: "0", id: 1},
            {type: "0", id: 2},
            {type: "0", id: 3},
            {type: "0", id: 4},
            {type: "0", id: 5},
            {type: "0", id: 6},
            {type: "0", id: 7},
            {type: "0", id: 8},
          ],
          [
            {type: "0", id: 0},
            {type: "0", id: 1},
            {type: "0", id: 2},
            {type: "0", id: 3},
            {type: "0", id: 4},
            {type: "0", id: 5},
            {type: "0", id: 6},
            {type: "0", id: 7},
            {type: "0", id: 8},
          ]
        ],

        player1name: "Player 1",
        player2name: "Player 2",

        instructionText: "Black, your turn first",
        player1turn: true,
        timeToPlaceMarble: true,
        timeToRotateQuadrant: false,
        winnerExists: false,
    };
    this.updatePlayer1Name = this.updatePlayer1Name.bind(this);
    this.updatePlayer2Name = this.updatePlayer2Name.bind(this);
    this.marblePlacedInQuad = this.marblePlacedInQuad.bind(this);
  }

  marblePlacedInQuad(marbleId, quadrantId){
    let bigArray = [...this.state.arrays]; //copy arrays from state
    let quadArray = bigArray[quadrantId];
    let changedMarble = {...quadArray[marbleId]};
    if(this.state.player1turn){
      changedMarble.type = '1';
    } else {
      changedMarble.type = '2';
    }
    quadArray[marbleId] = changedMarble;
    bigArray[quadrantId] = quadArray;
    this.setState({arrays: bigArray});
    this.setState({
      player1turn: !this.state.player1turn,
    });
    if(this.state.player1turn){
      this.setState({
        instructionText: this.state.player2name + ", your turn",
      });
    } else {
      this.setState({
        instructionText: this.state.player1name + ", your turn",
      });
    }
  }

  //UPDATE PLAYER NAMES
  updatePlayer1Name(event){
    this.setState({
      player1name: event.target.value,
    });
    if(this.state.player1turn){
      this.setState({
        instructionText: event.target.value + ", your turn"
      });
    }
  }
  updatePlayer2Name(event){
    this.setState({
      player2name: event.target.value,
    });
    if(!this.state.player1turn){
      this.setState({
        instructionText: event.target.value + ", your turn"
      });
    }
  }

  render(){
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
    var boardStyle = {
      background: "white",
      border: "3px solid black",
      borderRadius: "10px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr 1fr",
      justifySelf: "center",
      alignSelf: "center",
      padding: "3%",
      marginTop: "8%",
    };

    return (
      <div style={flexLayout}>
        <h1 style={headingStyle}>PENTAGO</h1>
        <div style={gridLayout}>
          <Player name={this.state.player1name} player='1' nameChange={this.updatePlayer1Name}/>
          <div style={boardStyle}>
                <Quadrant dotArray={this.state.arrays[0]} id={0} position="topLeft" margin="0% 2.5% 2.5% 0%" onPlaceMarble={this.marblePlacedInQuad} />
                <Quadrant dotArray={this.state.arrays[1]} id={1} position="topRight" margin="0% 0% 2.5% 2.5%" onPlaceMarble={this.marblePlacedInQuad} />
                <Quadrant dotArray={this.state.arrays[2]} id={2} position="bottomLeft" margin="2.5% 2.5% 0% 0%" onPlaceMarble={this.marblePlacedInQuad} />
                <Quadrant dotArray={this.state.arrays[3]} id={3} position="bottomRight" margin="2.5% 0% 0% 2.5%" onPlaceMarble={this.marblePlacedInQuad} />
          </div>
          <Player name={this.state.player2name} player='2' nameChange={this.updatePlayer2Name}/>
        </div>
        <h2 style={heading2Style}>{this.state.instructionText}</h2>
  
      </div>
    );
  }
}
