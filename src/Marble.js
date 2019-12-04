import React, {Component} from 'react';
import p1 from './images/p1.png';
import p2 from './images/p2.png';
import empty from './images/empty.png';
import hover from './images/hover.png';

export default class Marble extends Component{
    constructor(props){
        super(props);
        if(this.props.type=="0"){
            this.state={
                imageSource: empty,
            }
        } else if(this.props.type=="1"){
            this.state={
                imageSource: p1,
            }
        } else if(this.props.type=="2"){
            this.state={
                imageSource: p2,
            }
        } else { //default
            this.state={
                imageSource: empty,
            }
        }
        this.handleHover = this.handleHover.bind(this);
        this.handleRestore = this.handleRestore.bind(this);
        this.placeMarble = this.placeMarble.bind(this);
        this.checkForState = this.checkForState.bind(this);
    }

    //HOVER EFFECTS FOR EMPTY SPACES
    handleHover(){
        if(this.state.imageSource == empty){
            this.setState({
                imageSource: hover,
            });
        }
    }
    handleRestore(){
        if(this.state.imageSource == hover){
            this.setState({
                imageSource: empty,
            });
        }
    }

    placeMarble(){
        if(this.state.imageSource == hover){
            this.props.onPlaceMarble(this.props.id);
            setTimeout(this.checkForState, 5); //otherwise props doesn't update clickly enough
        } else {
            //do nothing
        }
    }

    checkForState(){
        if(this.props.type=="1"){
            this.setState({
                imageSource: p1,
            });
        } else if(this.props.type=="2"){
            this.setState({
                imageSource: p2,
            })
        }
    }

    render(){
        var marbleStyle={
            maxWidth: "50px",
            // margin: "10%"
        };
        return <img style={marbleStyle} src={this.state.imageSource} alt="Marble" onMouseEnter={this.handleHover} onMouseLeave={this.handleRestore} onClick={this.placeMarble}></img>;
    }
}