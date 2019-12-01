import React, {Component} from 'react';
import Quadrant from './Quadrant'
import Marble from './Marble'

export default class Board extends Component{
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
        return(
            <div style={boardStyle}>
                <Quadrant dotArray={this.state.tlQuad} position="topLeft" margin="0% 2.5% 2.5% 0%"/>
                <Quadrant dotArray={this.state.trQuad}position="topRight" margin="0% 0% 2.5% 2.5%"/>
                <Quadrant dotArray={this.state.blQuad}position="bottomLeft" margin="2.5% 2.5% 0% 0%"/>
                <Quadrant dotArray={this.state.brQuad}position="bottomRight" margin="2.5% 0% 0% 2.5%"/>
            </div>
        );
    }
}