import React, {Component} from 'react';
import p1 from './images/p1.png';
import p2 from './images/p2.png';
import empty from './images/empty.png';
import hover from './images/hover.png';

export default class Marble extends Component{
    constructor(props){
        super(props);
        this.state={
            type: this.props.type,
        }
        // if(this.props.type=="0"){
        //     this.state={
        //         imageSource: empty,
        //     }
        // } else if(this.props.type=="1"){
        //     this.state={
        //         imageSource: p1,
        //     }
        // } else if(this.props.type=="2"){
        //     this.state={
        //         imageSource: p2,
        //     }
        // } else { //default
        //     this.state={
        //         imageSource: empty,
        //     }
        // }

        // BINDING HELPER FUNCTIONS
        this.handleHover = this.handleHover.bind(this);
        this.handleRestore = this.handleRestore.bind(this);
        this.placeMarble = this.placeMarble.bind(this);
        this.checkForState = this.checkForState.bind(this);
    }

    // HOVER EFFECTS FOR EMPTY SPACES
    handleHover(){
        if(this.state.type == "0"){
            this.setState({
                type: "3",
            });
        }
    }
    handleRestore(){
        if(this.state.type == "3"){
            this.setState({
                type: "0",
            });
        }
    }


    placeMarble(){
        if(this.state.type == "3"){ //if marble space hasn't been taken yet
            this.props.onPlaceMarble(this.props.id); //call placeMarble function in Quadrant
            setTimeout(this.checkForState, 5); //delay, otherwise props doesn't update quickly enough and user has to click twice
        } else {
            //do nothing, a valid marble space was not clicked
        }
    }

    // GET MARBLES TO RE-RENDER AFTER BEING PLACED
    // called from placeMarble
    checkForState(){
        if(this.props.type=="1"){
            this.setState({
                type: "1",
            });
        } else if(this.props.type=="2"){
            this.setState({
                type: "2",
            })
        } else{
            this.setState({
                type: "0",
            })
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.type !== this.props.type){
            this.setState({          
                type: this.props.type,
            });
        }
    }

    render(){
        var marbleStyle={
            maxWidth: "50px",
        };
        if(this.state.type==="1"){
        	return <img style={marbleStyle} src={p1} alt="Marble" onMouseEnter={this.handleHover} onMouseLeave={this.handleRestore} onClick={this.placeMarble} ></img>
        }else if(this.state.type=="2"){
        	return <img style={marbleStyle} src={p2} alt="Marble" onMouseEnter={this.handleHover} onMouseLeave={this.handleRestore} onClick={this.placeMarble}></img>
        }else if(this.state.type=="3"){
            return <img style={marbleStyle} src={hover} alt="Marble" onMouseEnter={this.handleHover} onMouseLeave={this.handleRestore} onClick={this.placeMarble}></img>
        } else{
        	return <img style={marbleStyle} src={empty} alt="Marble" onMouseEnter={this.handleHover} onMouseLeave={this.handleRestore} onClick={this.placeMarble}></img>
        }
    }
}