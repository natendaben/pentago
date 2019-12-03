import React, {Component} from 'react';
import './App.css';
import Quadrant from './Quadrant'
import Player from './Player'

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
        tlQuad: Array(9).fill({type: "0"}),
        trQuad: Array(9).fill({type: "1"}),
        blQuad: Array(9).fill({type: "2"}),
        brQuad: Array(9).fill({type: "3"}),
    };
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
          <Player name="Nate" player='1'/>
          <div style={boardStyle}>
                <Quadrant dotArray={this.state.tlQuad} position="topLeft" margin="0% 2.5% 2.5% 0%"/>
                <Quadrant dotArray={this.state.trQuad} position="topRight" margin="0% 0% 2.5% 2.5%"/>
                <Quadrant dotArray={this.state.blQuad} position="bottomLeft" margin="2.5% 2.5% 0% 0%"/>
                <Quadrant dotArray={this.state.brQuad} position="bottomRight" margin="2.5% 0% 0% 2.5%"/>
            </div>
          <Player name="Elsa" player='2'/>
        </div>
        <h2 style={heading2Style}>Elsa, it is your turn!</h2>
  
      </div>
    );
  }
}
