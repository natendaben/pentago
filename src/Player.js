import React, {Component} from 'react';
import Marble from './Marble';
import p1 from './images/p1.png';

export default class Player extends Component{
    constructor(props){
        super(props);
    }
    render(){
        var playerStyle = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '0px 40px 0px 40px',
        };
        var marbleArsenalStyle = {
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
        }
        if(this.props.name=="Player 1"){
            return(
                <div style={playerStyle}>
                    <h1>{this.props.name}</h1>
                    <div style={marbleArsenalStyle}>
                        <Marble type="p1"/>
                        <Marble type="p1"/>
                        <Marble type="p1"/>
                        <Marble type="p1"/>
                        <Marble type="p1"/>
                        <Marble type="p1"/>
                        <Marble type="p1"/>
                        <Marble type="p1"/>
                        <Marble type="p1"/>
                        <Marble type="p1"/>
                        <Marble type="p1"/>
                        <Marble type="p1"/>
                        <Marble type="p1"/>
                        <Marble type="p1"/>
                        <Marble type="p1"/>
                        <Marble type="p1"/>
                    </div>
                </div>
            );
        } else if(this.props.name=="Player 2"){
            return(
                <div style={playerStyle}>
                    <h1>{this.props.name}</h1>
                    <div style={marbleArsenalStyle}>
                        <Marble type="p2"/>
                        <Marble type="p2"/>
                        <Marble type="p2"/>
                        <Marble type="p2"/>
                        <Marble type="p2"/>
                        <Marble type="p2"/>
                        <Marble type="p2"/>
                        <Marble type="p2"/>
                        <Marble type="p2"/>
                        <Marble type="p2"/>
                        <Marble type="p2"/>
                        <Marble type="p2"/>
                        <Marble type="p2"/>
                        <Marble type="p2"/>
                        <Marble type="p2"/>
                        <Marble type="p2"/>
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