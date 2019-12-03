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
        }
        if(this.props.player=='1'){
            return(
                <div style={playerStyle}>
                    <h2 style={heading2Style}>{this.props.name}</h2>
                    <div style={marbleArsenalStyle}>
                        <Marble type="1"/>
                        <Marble type="1"/>
                        <Marble type="1"/>
                        <Marble type="1"/>
                        <Marble type="1"/>
                        <Marble type="1"/>
                        <Marble type="1"/>
                        <Marble type="1"/>
                        <Marble type="1"/>
                        <Marble type="1"/>
                        <Marble type="1"/>
                        <Marble type="1"/>
                        <Marble type="1"/>
                        <Marble type="1"/>
                        <Marble type="1"/>
                        <Marble type="1"/>
                    </div>
                </div>
            );
        } else if(this.props.player=='2'){
            return(
                <div style={playerStyle}>
                    <h2 style={heading2Style}>{this.props.name}</h2>
                    <div style={marbleArsenalStyle}>
                        <Marble type="2"/>
                        <Marble type="2"/>
                        <Marble type="2"/>
                        <Marble type="2"/>
                        <Marble type="2"/>
                        <Marble type="2"/>
                        <Marble type="2"/>
                        <Marble type="2"/>
                        <Marble type="2"/>
                        <Marble type="2"/>
                        <Marble type="2"/>
                        <Marble type="2"/>
                        <Marble type="2"/>
                        <Marble type="2"/>
                        <Marble type="2"/>
                        <Marble type="2"/>
                    </div>
                </div>
            );
        }
        return(
        <div style={playerStyle}>
            <h1>{this.props.name}</h1>
            <div style={marbleArsenalStyle}>
                <Marble type="p1"/>
                <Marble type="p2"/>
                <Marble type="empty"/>
                <Marble type="empty"/>
                <Marble type="hover"/>
            </div>
        </div>
        )
    }
}