import React, {Component} from 'react';
import './App.css';
import Quadrant from './Quadrant'
import Player from './Player'

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {

        // ARRAYS
        masterQuadArray: [ //array of master quadrant arrays
          [ //top left quadrant
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
          [ //top right quadrant
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
          [ //bottom left quadrant
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
          [ //bottom right quadrant
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

        playerArrays: [ //array of player marble arrays
          [ //player one marbles, starts with 16
            {type: "1", id: 0},
            {type: "1", id: 1},
            {type: "1", id: 2},
            {type: "1", id: 3},
            {type: "1", id: 4},
            {type: "1", id: 5},
            {type: "1", id: 6},
            {type: "1", id: 7},
            {type: "1", id: 8},
            {type: "1", id: 9},
            {type: "1", id: 10},
            {type: "1", id: 11},
            {type: "1", id: 12},
            {type: "1", id: 13},
            {type: "1", id: 14},
            {type: "1", id: 15},
          ],
          [ //player two marbles, starts with 16
            {type: "2", id: 0},
            {type: "2", id: 1},
            {type: "2", id: 2},
            {type: "2", id: 3},
            {type: "2", id: 4},
            {type: "2", id: 5},
            {type: "2", id: 6},
            {type: "2", id: 7},
            {type: "2", id: 8},
            {type: "2", id: 9},
            {type: "2", id: 10},
            {type: "2", id: 11},
            {type: "2", id: 12},
            {type: "2", id: 13},
            {type: "2", id: 14},
            {type: "2", id: 15},
          ]
        ],

        // PLAYER NAMES
        player1name: "Player 1",
        player2name: "Player 2",

        // INSTRUCTIONS AT BOTTOM OF SCREEN
        instructionText: "Black, your turn first",

        // BOOLEANS FOR GAME STATE
        player1turn: true,
        timeToPlaceMarble: true,
        timeToRotateQuadrant: false,
        winnerExists: false,
    };

    // BINDING HELPER FUNCTIONS
    this.updatePlayer1Name = this.updatePlayer1Name.bind(this);
    this.updatePlayer2Name = this.updatePlayer2Name.bind(this);
    this.marblePlaced = this.marblePlaced.bind(this);
    this.removePlayerMarble = this.removePlayerMarble.bind(this);
  }

  // THE BIG KAHUNA - RUNS WHEN MARBLE IS PLACED ON BOARD
  // called from individual Marble components
  marblePlaced(marbleId, quadrantId){

    //Change out marble type in master array
    let bigArray = [...this.state.masterQuadArray]; //Copy master array of quadrant arrays
    let quadArray = bigArray[quadrantId]; //Extract desired quadrant array from big array
    let changedMarble = {...quadArray[marbleId]}; //Extract desired marble from quadrant array
    if(this.state.player1turn){ //If player1's turn
      changedMarble.type = '1'; //Change marble to player1 type
      this.removePlayerMarble(0); //Take marble off player1 arsenal
    } else { //If player2's turn
      changedMarble.type = '2'; //Change marble to player2 type
      this.removePlayerMarble(1); //Take marble off player2 arsenal
    }
    quadArray[marbleId] = changedMarble; //Replace old marble with new one
    bigArray[quadrantId] = quadArray; //Replace old quadrant with new quadrant
    this.setState({masterQuadArray: bigArray}); //Set state with new master array

    //Change whose turn it is and update text
    if(this.state.player1turn){ //If player1's turn
      this.setState({instructionText: this.state.player2name + ", your turn",}); //It is now player2's turn
    } else { //Otherwise
      this.setState({instructionText: this.state.player1name + ", your turn",}); //It is now player1's turn
    }
    this.setState({player1turn: !this.state.player1turn,}); //Officially change boolean that keeps track of turn

    //TODO: change timeToPlaceMarble to false and timeToRotateQuadrant to true to enable rotate buttons
  }

  // REMOVE PLAYER MARBLE FROM ARSENAL AFTER PLACED
  // called in marblePlaced
  removePlayerMarble(player){
    let playerArray = [...this.state.playerArrays]; //Copy master array of players
    let pArray = playerArray[player]; //Extract desired player array from copy of master
    pArray.splice(-1, 1); //Delete one item from the end of array
    playerArray[player] = pArray; //Replace old player array with new one
    this.setState({
      playerArrays: playerArray, //Set state with new master array
    });
  }

  // UPDATE PLAYER NAMES
  // called from Player components for input onChange
  updatePlayer1Name(event){
    this.setState({
      player1name: event.target.value, //Update master player1 name
    });
    if(this.state.player1turn){ //If player1's turn
      this.setState({instructionText: event.target.value + ", your turn"}); //Also update the instruction text
    }
  }
  updatePlayer2Name(event){
    this.setState({
      player2name: event.target.value, //Update master player2 name
    });
    if(!this.state.player1turn){ //If player2's turn
      this.setState({
        instructionText: event.target.value + ", your turn" //Also update the instruction text
      });
    }
  }

  // ROTATE QUADRANT FUNCTION
  // called when rotate button is pushed 
  // passed to each quadrant as props
  rotateQuadrant(quadrantId, rotationDirection){
    //feel free to change those parameters
    //do stuff

    //eventually call calculateWinner at the end
  }

  // CALCULATE WINNER FUNCTION
  // called at the end of rotateQuadrant
  calculateWinner(){
    //add stuff
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
          <Player name={this.state.player1name} player='1' pieces={this.state.playerArrays[0]} nameChange={this.updatePlayer1Name}/>
          <div style={boardStyle}>
                <Quadrant dotArray={this.state.masterQuadArray[0]} id={0} position="topLeft" margin="0% 2.5% 2.5% 0%" onPlaceMarble={this.marblePlaced} />
                <Quadrant dotArray={this.state.masterQuadArray[1]} id={1} position="topRight" margin="0% 0% 2.5% 2.5%" onPlaceMarble={this.marblePlaced} />
                <Quadrant dotArray={this.state.masterQuadArray[2]} id={2} position="bottomLeft" margin="2.5% 2.5% 0% 0%" onPlaceMarble={this.marblePlaced} />
                <Quadrant dotArray={this.state.masterQuadArray[3]} id={3} position="bottomRight" margin="2.5% 0% 0% 2.5%" onPlaceMarble={this.marblePlaced} />
          </div>
          <Player name={this.state.player2name} player='2' pieces={this.state.playerArrays[1]} nameChange={this.updatePlayer2Name}/>
        </div>
        <h2 style={heading2Style}>{this.state.instructionText}</h2>
  
      </div>
    );
  }
}
