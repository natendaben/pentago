import React, {Component} from 'react';
import Quadrant from './Quadrant'
import Marble from './Marble'

export default class Board extends Component{
    constructor(props){
        super(props);
    }
    render(){
    	var bigBoard = {
    		display: "flex",
    		backgroundColor: "#cbe5e4",
    		padding: "20px"
    	};

    	var boardStyle = {
    		width: "700px",
    		height: "700px",
    		backgroundColor: "#fbd0d3",
    		display: "grid",
    		gridTemplateRows: "1fr 1fr",
    		gridTemplateColumns: "1fr 1fr",
    	};
        return(
        	<div style = {bigBoard}>
        		<h1>Hello from board file!</h1>
        		<div style = {boardStyle}>
	        		<Quadrant />
	        		<Quadrant />
	        		<Quadrant />
	        		<Quadrant />
	        	</div>
        	</div>
        	)
    }
}