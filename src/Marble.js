import React, {Component} from 'react';
import p1 from './images/p1.png';
import p2 from './images/p2.png';
import empty from './images/empty.png';
import hover from './images/hover.png';

export default class Marble extends Component{
    constructor(props){
        super(props);
    }

    renderEmptyMarble(){
        return(
            <img style={{ width: "75px" }} src={empty} alt="Empty"></img>
        );
    }
    renderP1Marble(){
        return(
            <img style={{ width: "75px" }} src={p1} alt="Player One"></img>
        );
    }
    renderP2Marble(){
        return(
            <img style={{ width: "75px" }} src={p2} alt="Player Two"></img>
        );
    }
    renderHoverMarble(){
        return(
            <img style={{ width: "75px" }} src={hover} alt="Hover"></img>
        );
    }
    render(){
        var marbleStyle={
            margin: "10px",
        };
        if(this.props.type=="p1"){
            return <img style={{ width: "75px" }} src={p1} alt="Player One"></img>;
        } else if(this.props.type=="p2"){
            return <img style={{ width: "75px" }} src={p2} alt="Player Two"></img>;
        } else if(this.props.type=="empty"){
            return <img style={{ width: "75px" }} src={empty} alt="Player Two"></img>;
        } else if(this.props.type=="hover"){
            return <img style={{ width: "75px" }} src={hover} alt="Player Two"></img>;
        }
    }
}