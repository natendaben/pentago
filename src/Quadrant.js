import React, {Component} from 'react';
import rotateLeft from './images/rotateLeft.png';
import rotateRight from './images/rotateRight.png';
import leftHov from './images/leftHov.png';
import rightHov from './images/rightHov.png';
import Marble from './Marble'

// 

export default class Quadrant extends Component{
    constructor(props){
        super(props);
        this.state={
            leftRotateImageSrc: rotateLeft,
            rightRotateImageSrc: rotateRight,
        };
        
        // BINDING HELPER FUNCTIONS
        this.handleLeftHover = this.handleLeftHover.bind(this);
        this.handleLeftRestore = this.handleLeftRestore.bind(this);
        this.handleRightHover = this.handleRightHover.bind(this);
        this.handleRightRestore = this.handleRightRestore.bind(this);
        this.placeMarble = this.placeMarble.bind(this);
        this.handleLeftRotate = this.handleLeftRotate.bind(this);
        this.handleRightRotate  = this.handleRightRotate.bind(this);
    }

    // HOVER EFFECTS FOR ROTATE BUTTONS
    handleLeftHover(){
        if(this.state.leftRotateImageSrc == rotateLeft){
            this.setState({
                leftRotateImageSrc: leftHov,
            });
        }
    }
    handleLeftRestore(){
        if(this.state.leftRotateImageSrc == leftHov){
            this.setState({
                leftRotateImageSrc: rotateLeft,
            });
        }
    }
    handleRightHover(){
        if(this.state.rightRotateImageSrc == rotateRight){
            this.setState({
                rightRotateImageSrc: rightHov,
            });
        }
    }
    handleRightRestore(){
        if(this.state.rightRotateImageSrc == rightHov){
            this.setState({
                rightRotateImageSrc: rotateRight,
            });
        }
    }

    // PLACE MARBLE FUNCTION
    // called from marble, but Quadrant adds its id and sends back to App
    placeMarble(marbleId){
        this.props.onPlaceMarble(marbleId, this.props.id);
    }

    handleLeftRotate(){
    	this.props.rotateQuadrant(this.props.id, 0);
    }
    handleRightRotate(){
    	this.props.rotateQuadrant(this.props.id, 1);
    }

    render(){
        var wrapperStyle = {
            position: "relative",
        }
        var quadrantStyle = {
            background: "#E56584",
            margin: this.props.margin,
            border: "3px solid black",
            borderRadius: "10px",
            display: 'grid',
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "1fr 1fr 1fr",
            justifySelf: "center",
            alignSelf: "center",
            padding: "10px",
        };
        var rotateButtonStyle = {
            position: "absolute",
            zIndex: "10",
            maxWidth: "55px",
        };

        // STYLING FOR BUTTON PLACEMENT
        var rotateLeftButtonStyle, rotateRightButtonStyle;
        if(this.props.position == "topLeft"){
            rotateLeftButtonStyle = {
                top: "-25%",
            }
            rotateRightButtonStyle = {
                left: "-25%",
            }
        } else if (this.props.position == "topRight"){
            rotateLeftButtonStyle = {
                top: "-25%",
                right: "0%",
            }
            rotateRightButtonStyle = {
                right: "-25%",
            }
        } else if (this.props.position == "bottomLeft"){
            rotateLeftButtonStyle = {
                bottom: "-25%",
            }
            rotateRightButtonStyle = {
                left: "-25%",
                bottom: "0%",
            }
        } else if (this.props.position == "bottomRight"){
            rotateLeftButtonStyle = {
                bottom: "-25%",
                right: "0%",
            }
            rotateRightButtonStyle = {
                right: "-25%",
                bottom: "0%",
            }
        }
        return(
            <div style={wrapperStyle}>
                <img id="0" style={{...rotateButtonStyle, ...rotateLeftButtonStyle}} src={this.state.leftRotateImageSrc} onMouseEnter={this.handleLeftHover} onMouseLeave={this.handleLeftRestore} onClick={this.handleRightRotate} alt="Rotate left"></img>
                <img id="1" style={{...rotateButtonStyle, ...rotateRightButtonStyle}} src={this.state.rightRotateImageSrc} onMouseEnter={this.handleRightHover} onMouseLeave={this.handleRightRestore} onClick={this.handleLeftRotate} alt="Rotate right"></img>
                <div style={quadrantStyle}>
                    {this.props.dotArray.map(dot => <Marble key={dot.id} id={dot.id} type={dot.type} onPlaceMarble={this.placeMarble}/>)}
                </div>
            </div>
        );

    }
}