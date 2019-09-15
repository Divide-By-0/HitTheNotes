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
    render() {
        if(this.props.isPlottingPitch){
            
        }
        // <Line x0={0} y0={0} x1={10} y1={10} />
        return(
            <Fragment>
                <Line x0={200} y0={44} x1={200} y1={573} />
            </Fragment>
        );
    }
}

let headerHeight = 5;
let height = 8;
let percentPerTimeStep = 5;

export default NoteLine;