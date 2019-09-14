import React, {Fragment} from "react";
import styled, {css} from "styled-components"
import { backgroundColor } from './layout_styles.js';
var hash = require('object-hash');
 
class Notes extends React.Component  {
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
        const noteLines = [];
        let noteNum = 12;
        for (let i = noteNum-1; i >= 0; i--){
            noteLines.push(
                <NotesLine 
                    rank={i}
                    key={this.state.notes[i]}
                    name={this.state.notes[i]}
                />)
        }

        let noteList = [];
        for (let note in this.props.notes){
            noteList.push(
                <Notes
                    rank={i}
                    key={hash(note)}
                    name={hash(note)}
                />)
        }

        return(
            <Fragment>
                {noteLines}
                {noteList}
            </Fragment>
        );
    }
}

const RedFooter = styled.div`
    position: absolute;
    width:100%;
    height:100%;
    background: ${backgroundColor.color};
    z-index: -1;

`;

const Button = styled.button`
    font-size: 0.9em;
    font-face: Gill Sans;
    color: white;
    font-weight: bold;
    border: 1px solid white;

    position: absolute;
    width: 10%;
    height: 70%;
    top: 15%;

    background: ${backgroundColor.color};
    border-radius: 0px 10px 10px 0px;
`;

let headerHeight = 5;
let height = 8;

const NotesLine = styled.div`
    top: ${props => headerHeight + (height) * (props.rank)}%;
    position: absolute;
    left: 7.5%;
    width: 85%;
    height: 0px;
    z-index: 1000;

    background: #C4C4C4;
    border: 1px solid #E5E5E5;
`

const GetLinkButton = styled(Button)`
    left: 60%;
`;


export const Text = styled.span`
    font-size: 0.9em;
    font-face: Gill Sans;
    color: white;
    font-weight: bold;

    position: absolute;
    width: 10%;
    top: 30%;
    left: 2%;
    text-align: center;
    vertical-align: middle;

    background: ${backgroundColor.color};
    border-radius: 10px;
`

const SongTextField = styled.input`
    position: absolute;
    font-family: Rambla;
    right: 50%;
    font-size: 0.9em;
    font-weight: bold;
    text-align: center;
    vertical-align: middle;
    width: 40%;
    left: 20%;
    height: 70%;
    top: 15%;
    placeholder: "Youtube URL";

    border: 1px solid black;
    box-sizing: border-box;
    border-radius: 10px 0px 0px 10px;
`;

let percentPerTimeStep = 5;

const Note = styled.div`
    position: absolute;
    height: 13%;
    width: ${props => percentPerTimeStep * props.duration}%;
    left: ${props => props.timeStart * percentPerTimeStep}%;
    top: ${props => headerHeight + (height) * (props.rank)}%;

    background: #D02000;
    border-radius: 20px 20px 0px 0px;
`;

export default Notes;