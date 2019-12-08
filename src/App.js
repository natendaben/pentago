import React, {Component} from 'react';
import './App.css';
import Quadrant from './Quadrant'
import Player from './Player'

import p1 from './images/p1.png';
import p2 from './images/p2.png';
import empty from './images/empty.png';
import hover from './images/hover.png';

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
        instructionText: "Player 1, your turn first",

        // BOOLEANS FOR GAME STATE

        firstAlertShown: false,
        player1turn: true,
        timeToPlaceMarble: true,
        winnerExists: false,
    };

    // BINDING HELPER FUNCTIONS
    this.updatePlayer1Name = this.updatePlayer1Name.bind(this);
    this.updatePlayer2Name = this.updatePlayer2Name.bind(this);
    this.marblePlaced = this.marblePlaced.bind(this);
    this.removePlayerMarble = this.removePlayerMarble.bind(this);
    this.calculateWinner = this.calculateWinner.bind(this);
    this.helpCalculate = this.helpCalculate.bind(this);
    this.rotateQuadrant = this.rotateQuadrant.bind(this);
    this.checkForState2 = this.checkForState2.bind(this);
    this.dismissAlert = this.dismissAlert.bind(this);
  }

  // THE BIG KAHUNA - RUNS WHEN MARBLE IS PLACED ON BOARD
  // called from individual Marble components
  marblePlaced(marbleId, quadrantId){
    if(this.state.timeToPlaceMarble==true){
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

      this.setState({
        timeToPlaceMarble: false,
      });
    } else {
      if(this.state.player1turn){ //If player1's turn
        alert(this.state.player1name + ", time to rotate a quadrant!")
      } else { //Otherwise
        alert(this.state.player2name + ", time to rotate a quadrant!")
      }
    }

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

    //get given quadrant and rotation direction
    // get state of every Marble in the array
    if(this.state.timeToPlaceMarble==false){
    // let direction = rotationDirection.id;

      let bigArray = [...this.state.masterQuadArray]; 
      let quadArray = bigArray[quadrantId];

      let new0Marble = {...quadArray[0]}; //Extract desired marble from quadrant array
      let new1Marble = {...quadArray[1]}; //Extract desired marble from quadrant array
      let new2Marble = {...quadArray[2]}; //Extract desired marble from quadrant array
      let new3Marble = {...quadArray[3]}; //Extract desired marble from quadrant array
      let new4Marble = {...quadArray[4]}; //Extract desired marble from quadrant array
      let new5Marble = {...quadArray[5]}; //Extract desired marble from quadrant array
      let new6Marble = {...quadArray[6]}; //Extract desired marble from quadrant array
      let new7Marble = {...quadArray[7]}; //Extract desired marble from quadrant array
      let new8Marble = {...quadArray[8]}; //Extract desired marble from quadrant array

      let temp0state = new0Marble.type;
      let temp1state = new1Marble.type;
      let temp2state = new2Marble.type;
      let temp3state = new3Marble.type;
      let temp4state = new4Marble.type;
      let temp5state = new5Marble.type;
      let temp6state = new6Marble.type;
      let temp7state = new7Marble.type;
      let temp8state = new8Marble.type;

      if(rotationDirection == "0"){ // ROTATE COUNTER CLOCKWISE
        // replace marble state with that of the marble that rotates into its spot
        // 0 --> 6
        quadArray[0].type = temp6state;
        // 1 --> 3
        quadArray[1].type = temp3state;
        // 2 --> 0
        quadArray[2].type = temp0state;
        // 3 --> 7
        quadArray[3].type = temp7state;
        // 4 --> 4
        quadArray[4].type = temp4state;
        // 5 --> 1
        quadArray[5].type = temp1state;
        // 6 --> 8
        quadArray[6].type = temp8state;
        // 7 --> 5
        quadArray[7].type = temp5state;
        // 8 -->  2
        quadArray[8].type = temp2state;
    
      } else if(rotationDirection){ // ROTATE CLOCKWISE
        // replace marble state with that of the marble that rotates into its spot
        // 0 --> 2
        quadArray[0].type = temp2state;
        // 1 --> 5
        quadArray[1].type = temp5state;
        // 2 --> 8
        quadArray[2].type = temp8state;
        // 3 --> 1
        quadArray[3].type = temp1state;
        // 4 --> 4
        quadArray[4].type = temp4state;
        // 5 --> 7
        quadArray[5].type = temp7state;
        // 6 --> 0
        quadArray[6].type = temp0state;
        // 7 --> 3
        quadArray[7].type = temp3state;
        // 8 --> 6
        quadArray[8].type = temp6state;

      }
      setTimeout(this.checkForState2, 5);

      //Change whose turn it is and update text
      if(this.state.player1turn){ //If player1's turn
        //this.calculateWinner();
        this.setState({instructionText: this.state.player2name + ", your turn",}); //It is now player2's turn
      } else { //Otherwise
        //this.calculateWinner();
        this.setState({instructionText: this.state.player1name + ", your turn",}); //It is now player1's turn
      }
      this.setState({
        player1turn: !this.state.player1turn, //Officially change boolean that keeps track of turn
        timeToPlaceMarble: true,
      });
      
      // call calculateWinner at the end
    } else {
      if(this.state.player1turn){ //If player1's turn
        alert(this.state.player1name + ", time to place a marble!")
      } else { //Otherwise
        alert(this.state.player2name + ", time to place a marble!")
      }
    }

    setTimeout(
      function() {
          this.helpCalculate("1");
      }
      .bind(this),
      500
    );
    setTimeout(
      function() {
          this.helpCalculate("2");
      }
      .bind(this),
      500
    );
  }

    // GET MARBLES TO RE-RENDER AFTER BEING ROTATED
    // called from rotateQuadrant
    checkForState2(){
        if(this.props.type=="1"){
            this.setState({
                imageSource: p1,
            });
        } else if(this.props.type=="2"){
            this.setState({
                imageSource: p2,
            })
        } else{
        	this.setState({
        		imageSource: empty,
        	})
        }
    }

    helpCalculate(playerNum){
      this.calculateWinner(playerNum);
    }

  // CALCULATE WINNER FUNCTION
  // called at the end of rotateQuadrant
  calculateWinner(playerNum){
      let playerArray = [...this.state.playerArrays]; //Copy master array of players
      // extract marbles and their states
      let bigArray = [...this.state.masterQuadArray]; 
      let quad0 = bigArray[0];
      let quad1 = bigArray[1];
      let quad2 = bigArray[2];
      let quad3 = bigArray[3];
      let playerType = playerNum;

      // save all 36 marbles :)
      let q0m0 = {...quad0[0]};
      let q0m1 = {...quad0[1]};
      let q0m2 = {...quad0[2]};
      let q0m3 = {...quad0[3]};
      let q0m4 = {...quad0[4]};
      let q0m5 = {...quad0[5]};
      let q0m6 = {...quad0[6]};
      let q0m7 = {...quad0[7]};
      let q0m8 = {...quad0[8]};

      let q1m0 = {...quad1[0]};
      let q1m1 = {...quad1[1]};
      let q1m2 = {...quad1[2]};
      let q1m3 = {...quad1[3]};
      let q1m4 = {...quad1[4]};
      let q1m5 = {...quad1[5]};
      let q1m6 = {...quad1[6]};
      let q1m7 = {...quad1[7]};
      let q1m8 = {...quad1[8]};

      let q2m0 = {...quad2[0]};
      let q2m1 = {...quad2[1]};
      let q2m2 = {...quad2[2]};
      let q2m3 = {...quad2[3]};
      let q2m4 = {...quad2[4]};
      let q2m5 = {...quad2[5]};
      let q2m6 = {...quad2[6]};
      let q2m7 = {...quad2[7]};
      let q2m8 = {...quad2[8]};

      let q3m0 = {...quad3[0]};
      let q3m1 = {...quad3[1]};
      let q3m2 = {...quad3[2]};
      let q3m3 = {...quad3[3]};
      let q3m4 = {...quad3[4]};
      let q3m5 = {...quad3[5]};
      let q3m6 = {...quad3[6]};
      let q3m7 = {...quad3[7]};
      let q3m8 = {...quad3[8]};

      // check each scenario
      // HORIZONTAL WINS
      if((q0m0.type  === playerType) && (q0m1.type === playerType) && (q0m2.type === playerType) && (q1m0.type === playerType) && (q1m1.type === playerType)){
        // player wins!
        if(q0m0.type === "1"){
          alert(this.state.player1name + ", you win! Ready for a new game?");
          window.location.reload();
        }else{
          alert(this.state.player2name + ", you win! Ready for a new game?");
          window.location.reload();
        }
        // start new game?
      } else if((q0m1.type  === playerType) && (q0m2.type === playerType) && (q1m0.type === playerType) && (q1m1.type === playerType) && (q1m2.type === playerType)){
        // player wins!
        if(q0m1.type === "1"){
          alert(this.state.player1name + ", you win! Ready for a new game?");
          window.location.reload();
        }else{
          alert(this.state.player2name + ", you win! Ready for a new game?");
          window.location.reload();
        }
        // start new game?
      } else if((q0m3.type  === playerType) && (q0m4.type === playerType) && (q0m5.type === playerType) && (q1m3.type === playerType) && (q1m4.type === playerType)){
        // player wins!
        if(q0m3.type === "1"){
          alert(this.state.player1name + ", you win! Ready for a new game?");
          window.location.reload();
        }else{
          alert(this.state.player2name + ", you win! Ready for a new game?");
          window.location.reload();
        }
        // start new game?
      } else if((q0m4.type  === playerType) && (q0m5.type === playerType) && (q1m3.type === playerType) && (q1m4.type === playerType) && (q1m5.type === playerType)){
        // player wins!
        if(q0m4.type === "1"){
          alert(this.state.player1name + ", you win! Ready for a new game?");
          window.location.reload();
        }else{
          alert(this.state.player2name + ", you win! Ready for a new game?");
          window.location.reload();
        }
        // start new game?
      } else if((q0m6.type  === playerType) && (q0m7.type === playerType) && (q0m8.type === playerType) && (q1m6.type === playerType) && (q1m7.type === playerType)){
        // player wins!
        if(q0m6.type === "1"){
          alert(this.state.player1name + ", you win! Ready for a new game?");
          window.location.reload();
        }else{
          alert(this.state.player2name + ", you win! Ready for a new game?");
          window.location.reload();
        }
        // start new game?
      } else if((q0m7.type  === playerType) && (q0m8.type === playerType) && (q1m6.type === playerType) && (q1m7.type === playerType) && (q1m8.type === playerType)){
        // player wins!
        if(q0m7.type === "1"){
          alert(this.state.player1name + ", you win! Ready for a new game?");
          window.location.reload();
        }else{
          alert(this.state.player2name + ", you win! Ready for a new game?");
          window.location.reload();
        }
        // start new game?
      } else if((q2m0.type  === playerType) && (q2m1.type === playerType) && (q2m2.type === playerType) && (q3m0.type === playerType) && (q3m1.type === playerType)){
        // player wins!
        if(q2m0.type === "1"){
          alert(this.state.player1name + ", you win! Ready for a new game?");
          window.location.reload();
        }else{
          alert(this.state.player2name + ", you win! Ready for a new game?");
          window.location.reload();
        }
        // start new game?
      } else if((q2m1.type  === playerType) && (q2m2.type === playerType) && (q3m0.type === playerType) && (q3m1.type === playerType) && (q3m2.type === playerType)){
        // player wins!
        if(q2m1.type === "1"){
          alert(this.state.player1name + ", you win! Ready for a new game?");
          window.location.reload();
        }else{
          alert(this.state.player2name + ", you win! Ready for a new game?");
          window.location.reload();
        }
        // start new game?
      } else if((q2m3.type  === playerType) && (q2m4.type === playerType) && (q2m5.type === playerType) && (q3m3.type === playerType) && (q3m4.type === playerType)){
        // player wins!
        if(q2m3.type === "1"){
          alert(this.state.player1name + ", you win! Ready for a new game?");
          window.location.reload();
        }else{
          alert(this.state.player2name + ", you win! Ready for a new game?");
          window.location.reload();
        }
        // start new game?
      } else if((q2m4.type  === playerType) && (q2m5.type === playerType) && (q3m3.type === playerType) && (q3m4.type === playerType) && (q3m5.type === playerType)){
        // player wins!
        if(q2m4.type === "1"){
          alert(this.state.player1name + ", you win! Ready for a new game?");
          window.location.reload();
        }else{
          alert(this.state.player2name + ", you win! Ready for a new game?");
          window.location.reload();
        }
        // start new game?
      } else if((q2m6.type  === playerType) && (q2m7.type === playerType) && (q2m8.type === playerType) && (q3m6.type === playerType) && (q3m7.type === playerType)){
        // player wins!
        if(q2m6.type === "1"){
          alert(this.state.player1name + ", you win! Ready for a new game?");
          window.location.reload();
        }else{
          alert(this.state.player2name + ", you win! Ready for a new game?");
          window.location.reload();
        }
        // start new game?
      } else if((q2m7.type  === playerType) && (q2m8.type === playerType) && (q3m6.type === playerType) && (q3m7.type === playerType) && (q3m8.type === playerType)){
        // player wins!
        if(q2m7.type === "1"){
          alert(this.state.player1name + ", you win! Ready for a new game?");
          window.location.reload();
        }else{
          alert(this.state.player2name + ", you win! Ready for a new game?");
          window.location.reload();
        }
        // start new game?
      }
      // VERTICAL WINS
      else if((q0m0.type  === playerType) && (q0m3.type === playerType) && (q0m6.type === playerType) && (q2m0.type === playerType) && (q2m3.type === playerType)){
        // player wins!
        if(q0m0.type === "1"){
          alert(this.state.player1name + ", you win! Ready for a new game?");
          window.location.reload();
        }else{
          alert(this.state.player2name + ", you win! Ready for a new game?");
          window.location.reload();
        }
        // start new game?
      } else if((q0m3.type  === playerType) && (q0m6.type === playerType) && (q2m0.type === playerType) && (q2m3.type === playerType) && (q2m6.type === playerType)){
        // player wins!
        if(q0m3.type === "1"){
          alert(this.state.player1name + ", you win! Ready for a new game?");
          window.location.reload();
        }else{
          alert(this.state.player2name + ", you win! Ready for a new game?");
          window.location.reload();
        }
        // start new game?
      } else if((q0m1.type  === playerType) && (q0m4.type === playerType) && (q0m7.type === playerType) && (q2m1.type === playerType) && (q2m4.type === playerType)){
        // player wins!
        if(q0m1.type === "1"){
          alert(this.state.player1name + ", you win! Ready for a new game?");
          window.location.reload();
        }else{
          alert(this.state.player2name + ", you win! Ready for a new game?");
          window.location.reload();
        }
        // start new game?
      } else if((q0m4.type  === playerType) && (q0m7.type === playerType) && (q2m1.type === playerType) && (q2m4.type === playerType) && (q2m7.type === playerType)){
        // player wins!
        if(q0m4.type === "1"){
          alert(this.state.player1name + ", you win! Ready for a new game?");
          window.location.reload();
        }else{
          alert(this.state.player2name + ", you win! Ready for a new game?");
          window.location.reload();
        }
        // start new game?
      } else if((q0m2.type  === playerType) && (q0m5.type === playerType) && (q0m8.type === playerType) && (q2m2.type === playerType) && (q2m5.type === playerType)){
        // player wins!
        if(q0m2.type === "1"){
          alert(this.state.player1name + ", you win! Ready for a new game?");
          window.location.reload();
        }else{
          alert(this.state.player2name + ", you win! Ready for a new game?");
          window.location.reload();
        }
        // start new game?
      } else if((q0m5.type  === playerType) && (q0m8.type === playerType) && (q2m2.type === playerType) && (q2m5.type === playerType) && (q2m8.type === playerType)){
        // player wins!
        if(q0m5.type === "1"){
          alert(this.state.player1name + ", you win! Ready for a new game?");
          window.location.reload();
        }else{
          alert(this.state.player2name + ", you win! Ready for a new game?");
          window.location.reload();
        }
        // start new game?
      } else if((q1m0.type  === playerType) && (q1m3.type === playerType) && (q1m6.type === playerType) && (q3m0.type === playerType) && (q3m3.type === playerType)){
        // player wins!
        if(q1m0.type === "1"){
          alert(this.state.player1name + ", you win! Ready for a new game?");
          window.location.reload();
        }else{
          alert(this.state.player2name + ", you win! Ready for a new game?");
          window.location.reload();
        }
        // start new game?
      } else if((q1m3.type  === playerType) && (q1m6.type === playerType) && (q3m0.type === playerType) && (q3m3.type === playerType) && (q3m6.type === playerType)){
        // player wins!
        if(q1m3.type === "1"){
          alert(this.state.player1name + ", you win! Ready for a new game?");
          window.location.reload();
        }else{
          alert(this.state.player2name + ", you win! Ready for a new game?");
          window.location.reload();
        }
        // start new game?
      } else if((q1m1.type  === playerType) && (q1m4.type === playerType) && (q1m7.type === playerType) && (q3m1.type === playerType) && (q3m4.type === playerType)){
        // player wins!
        if(q1m1.type === "1"){
          alert(this.state.player1name + ", you win! Ready for a new game?");
          window.location.reload();
        }else{
          alert(this.state.player2name + ", you win! Ready for a new game?");
          window.location.reload();
        }
        // start new game?
      } else if((q1m4.type  === playerType) && (q1m7.type === playerType) && (q3m1.type === playerType) && (q3m4.type === playerType) && (q3m7.type === playerType)){
        // player wins!
        if(q1m4.type === "1"){
          alert(this.state.player1name + ", you win! Ready for a new game?");
          window.location.reload();
        }else{
          alert(this.state.player2name + ", you win! Ready for a new game?");
          window.location.reload();
        }
        // start new game?
      } else if((q1m2.type  === playerType) && (q1m5.type === playerType) && (q1m8.type === playerType) && (q3m2.type === playerType) && (q3m5.type === playerType)){
        // player wins!
        if(q1m2.type === "1"){
          alert(this.state.player1name + ", you win! Ready for a new game?");
          window.location.reload();
        }else{
          alert(this.state.player2name + ", you win! Ready for a new game?");
          window.location.reload();
        }
        // start new game?
      } else if((q1m5.type  === playerType) && (q1m8.type === playerType) && (q3m2.type === playerType) && (q3m5.type === playerType) && (q3m8.type === playerType)){
        // player wins!
        if(q1m5.type === "1"){
          alert(this.state.player1name + ", you win! Ready for a new game?");
          window.location.reload();
        }else{
          alert(this.state.player2name + ", you win! Ready for a new game?");
          window.location.reload();
        }
        // start new game?
      }
      // DIAGONAL WINS
      else if((q2m3.type  === playerType) && (q2m1.type === playerType) && (q0m8.type === playerType) && (q1m3.type === playerType) && (q1m1.type === playerType)){
        // player wins!
        if(q2m3.type === "1"){
          alert(this.state.player1name + ", you win! Ready for a new game?");
          window.location.reload();
        }else{
          alert(this.state.player2name + ", you win! Ready for a new game?");
          window.location.reload();
        }
        // start new game?
      } else if((q2m6.type  === playerType) && (q2m4.type === playerType) && (q2m2.type === playerType) && (q1m6.type === playerType) && (q1m4.type === playerType)){
        // player wins!
        if(q2m6.type === "1"){
          alert(this.state.player1name + ", you win! Ready for a new game?");
          window.location.reload();
        }else{
          alert(this.state.player2name + ", you win! Ready for a new game?");
          window.location.reload();
        }
        // start new game?
      } else if((q2m4.type  === playerType) && (q2m2.type === playerType) && (q1m6.type === playerType) && (q1m4.type === playerType) && (q1m2.type === playerType)){
        // player wins!
        if(q2m4.type === "1"){
          alert(this.state.player1name + ", you win! Ready for a new game?");
          window.location.reload();
        }else{
          alert(this.state.player2name + ", you win! Ready for a new game?");
          window.location.reload();
        }
        // start new game?
      } else if((q2m7.type  === playerType) && (q2m5.type === playerType) && (q3m0.type === playerType) && (q1m7.type === playerType) && (q1m5.type === playerType)){
        // player wins!
        if(q2m7.type === "1"){
          alert(this.state.player1name + ", you win! Ready for a new game?");
          window.location.reload();
        }else{
          alert(this.state.player2name + ", you win! Ready for a new game?");
          window.location.reload();
        }
        // start new game?
      } else if((q0m3.type  === playerType) && (q0m7.type === playerType) && (q0m2.type === playerType) && (q3m3.type === playerType) && (q3m7.type === playerType)){
        // player wins!
        if(q0m3.type === "1"){
          alert(this.state.player1name + ", you win! Ready for a new game?");
          window.location.reload();
        }else{
          alert(this.state.player2name + ", you win! Ready for a new game?");
          window.location.reload();
        }
        // start new game?
      } else if((q0m0.type  === playerType) && (q0m4.type === playerType) && (q0m8.type === playerType) && (q3m0.type === playerType) && (q3m4.type === playerType)){
        // player wins!
        if(q0m0.type === "1"){
          alert(this.state.player1name + ", you win! Ready for a new game?");
          window.location.reload();
        }else{
          alert(this.state.player2name + ", you win! Ready for a new game?");
          window.location.reload();
        }
        // start new game?
      } else if((q0m4.type  === playerType) && (q0m8.type === playerType) && (q3m0.type === playerType) && (q3m4.type === playerType) && (q3m8.type === playerType)){
        // player wins!
        if(q0m4.type === "1"){
          alert(this.state.player1name + ", you win! Ready for a new game?");
          window.location.reload();
        }else{
          alert(this.state.player2name + ", you win! Ready for a new game?");
          window.location.reload();
        }
        // start new game?
      } else if((q0m1.type  === playerType) && (q0m5.type === playerType) && (q1m6.type === playerType) && (q3m1.type === playerType) && (q3m5.type === playerType)){
        // player wins!
        if(q0m1.type === "1"){
          alert(this.state.player1name + ", you win! Ready for a new game?");
          window.location.reload();
        }else{
          alert(this.state.player2name + ", you win! Ready for a new game?");
          window.location.reload();
        }
      }
      // if none of those pass
      else{
        // continue game!
        if((playerArray[0].length === 0) && (playerArray[1].length === 0)){
          alert("Looks like all the marbles are gone! Ready for a new game?");
          window.location.reload();
        }
      }
  }

  dismissAlert(){
    this.setState({
      firstAlertShown: true,
    });
  }
  // componentDidMount(){
  //   alert("Welcome to Pentago! Enter in both player's names, and get your brain ready! Try and get FIVE IN A ROW. Each turn, you are required to place one marble anywhere, then rotate any of the quadrants once.");
  // }
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
    var alertBg = {
      height: "100vh",
      width: "100vw",
      background: "hsla(323, 100%, 100%, 0.6)",
      position: "absolute",
      zIndex: "15",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
    var alertStyle = {
      background: "white",
      // width: "50%",
      // height: "60%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      border: "3px solid black",
      borderRadius: "15px",
      padding: "2% 5% 2% 5%",
    }
    var hStyle = {
      fontFamily: 'Baskerville, "Hoefler Text", Garamond, "Times New Roman", serif',
      fontSize: "200%",
      fontWeight: "bold",
      textAlign: "center",
      margin: "5% 0% 2% 0%",
    }
    var pStyle = {
      fontFamily: 'Baskerville, "Hoefler Text", Garamond, "Times New Roman", serif',
      textAlign: "center",
      margin: "0% 0% 2% 0%",
      fontSize: "125%",
    }
    var buttonStyle = {
      fontFamily: 'Baskerville, "Hoefler Text", Garamond, "Times New Roman", serif',
      textAlign: "center",
      fontSize: "125%",
      border: "2px solid black",
      borderRadius: "5px",
      background: "hsla(323, 0%, 90%, 1)",
      margin: "0% 0% 6% 0%",
      padding: "10px",
    }

    if(this.state.firstAlertShown==false){
      return (
        <div>
          <div style={alertBg}>
            <div style={alertStyle}>
              <p style={hStyle}>Welcome to Pentago!</p> 
              <p style={pStyle}>Enter in both player's names, and get your brain ready! Try and get FIVE IN A ROW.</p><p style={pStyle}>Each turn, you are required to place one marble anywhere, then rotate any of the quadrants once.</p>
              <button style={buttonStyle} onClick={this.dismissAlert}>Okay, let's go!</button>
            </div>
          </div>
          <div style={flexLayout}>
            <h1 style={headingStyle}>PENTAGO</h1>
            <div style={gridLayout}>
              <Player name={this.state.player1name} player='1' pieces={this.state.playerArrays[0]} nameChange={this.updatePlayer1Name}/>
              <div style={boardStyle}>
                    <Quadrant dotArray={this.state.masterQuadArray[0]} id={0} position="topLeft" margin="0% 2.5% 2.5% 0%" onPlaceMarble={this.marblePlaced} rotateQuadrant={this.rotateQuadrant}/>
                    <Quadrant dotArray={this.state.masterQuadArray[1]} id={1} position="topRight" margin="0% 0% 2.5% 2.5%" onPlaceMarble={this.marblePlaced} rotateQuadrant={this.rotateQuadrant}/>
                    <Quadrant dotArray={this.state.masterQuadArray[2]} id={2} position="bottomLeft" margin="2.5% 2.5% 0% 0%" onPlaceMarble={this.marblePlaced} rotateQuadrant={this.rotateQuadrant}/>
                    <Quadrant dotArray={this.state.masterQuadArray[3]} id={3} position="bottomRight" margin="2.5% 0% 0% 2.5%" onPlaceMarble={this.marblePlaced} rotateQuadrant={this.rotateQuadrant}/>
              </div>
              <Player name={this.state.player2name} player='2' pieces={this.state.playerArrays[1]} nameChange={this.updatePlayer2Name}/>
            </div>
            <h2 style={heading2Style}>{this.state.instructionText}</h2>
          </div>
        </div>
      );
    } else {
      return (
        <div style={flexLayout}>
          <h1 style={headingStyle}>PENTAGO</h1>
          <div style={gridLayout}>
            <Player name={this.state.player1name} player='1' pieces={this.state.playerArrays[0]} nameChange={this.updatePlayer1Name}/>
            <div style={boardStyle}>
                  <Quadrant dotArray={this.state.masterQuadArray[0]} id={0} position="topLeft" margin="0% 2.5% 2.5% 0%" onPlaceMarble={this.marblePlaced} rotateQuadrant={this.rotateQuadrant}/>
                  <Quadrant dotArray={this.state.masterQuadArray[1]} id={1} position="topRight" margin="0% 0% 2.5% 2.5%" onPlaceMarble={this.marblePlaced} rotateQuadrant={this.rotateQuadrant}/>
                  <Quadrant dotArray={this.state.masterQuadArray[2]} id={2} position="bottomLeft" margin="2.5% 2.5% 0% 0%" onPlaceMarble={this.marblePlaced} rotateQuadrant={this.rotateQuadrant}/>
                  <Quadrant dotArray={this.state.masterQuadArray[3]} id={3} position="bottomRight" margin="2.5% 0% 0% 2.5%" onPlaceMarble={this.marblePlaced} rotateQuadrant={this.rotateQuadrant}/>
            </div>
            <Player name={this.state.player2name} player='2' pieces={this.state.playerArrays[1]} nameChange={this.updatePlayer2Name}/>
          </div>
          <h2 style={heading2Style}>{this.state.instructionText}</h2>
    
        </div>
      );
    }
  }
}
