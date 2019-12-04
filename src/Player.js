import React, {Component} from 'react';
import Marble from './Marble';

export default class Player extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        var playerStyle = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0% 5% 0% 5%',
        };
        var marbleArsenalStyle = {
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
        }
        var heading2Style = {
            fontFamily: 'Baskerville, "Hoefler Text", Garamond, "Times New Roman", serif',
            fontSize: "200%",
            fontWeight: "700",
            margin: "1% 0% 1% 0%",
            textAlign: "center",
            width: "80%",
        }
        return(
            <div style={playerStyle}>
                <input style={heading2Style} value={this.props.name} onChange={this.props.nameChange}></input>
                <div style={marbleArsenalStyle}>
                    {this.props.pieces.map(piece => <Marble key={piece.id} id={piece.id} type={piece.type} />)}
                </div>
            </div>
        );
    }
}