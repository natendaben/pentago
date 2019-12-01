import React, {Component} from 'react';
import p1 from './images/p1.png';
import p2 from './images/p2.png';
import empty from './images/empty.png';
import hover from './images/hover.png';

export default class Marble extends Component{
    constructor(props){
        super(props);
    }

    render(){
        var marbleStyle={
            maxWidth: "50px",
            // margin: "10%"
        };

        if(this.props.type=="1"){
            return <img style={marbleStyle} src={p1} alt="Player One"></img>;
        } else if(this.props.type=="2"){
            return <img style={marbleStyle} src={p2} alt="Player Two"></img>;
        } else if(this.props.type=="0"){
            return <img style={marbleStyle} src={empty} alt="Empty"></img>;
        } else if(this.props.type=="3"){
            return <img style={marbleStyle} src={hover} alt="Hover"></img>;
        } else {
            return <img style={marbleStyle} src={empty} alt="Empty"></img>;
        }
    }
}