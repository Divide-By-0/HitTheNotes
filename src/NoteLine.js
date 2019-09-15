import React, {Fragment} from "react";
import styled, {css} from "styled-components"
import { backgroundColor } from './layout_styles.js';
import { Line } from 'react-lineto';
// var hash = require('object-hash');
 
class NoteLine extends React.Component  {
    constructor(props) {
      super(props);
      this.state = {
          notes: [
            'A', 
            'A#', 
            'B',
            'C',
            'C#',
            'D',
            'D#',
            'E',
            'F',
            'F#',
            'G',
            'G#'] 
      }
    };
    map(freq, aLoc, gsLoc){
        while(freq > 880){
            freq = freq / 2;
        }
        while(freq < 440){
            freq = freq * 2;
        }
        let loc = aLoc + (gsLoc - aLoc) * Math.log((freq * 1.0 / 440)) / Math.log((2));
        return loc;
    }
    render() {
        console.log("AUIAYISADKJN", this.props.isPlottingPitch)
        const lineList = [];
        let upperBound = 44;
        let lowerBound = 573;
        let aLoc = 70;
        let gsLoc = 535;
        if(this.props.isPlottingPitch){
            for (let i = 1; i < 100; i++){
                lineList.push(
                    <Line
                        x0={100+i} y0={this.map(this.props.last100Frequencies[i-1], aLoc, gsLoc)} x1={100+i+1} y1={this.map(this.props.last100Frequencies[i], aLoc, gsLoc)}
                    />)
            }
        }
        // <Line x0={0} y0={0} x1={10} y1={10} />
        return(
            <Fragment>
                {lineList}
            </Fragment>
        );
    }
}

let headerHeight = 5;
let height = 8;
let percentPerTimeStep = 5;

export default NoteLine;