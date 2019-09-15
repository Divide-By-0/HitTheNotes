import React, {Fragment} from "react";
import styled, {css} from "styled-components"
import { backgroundColor } from './layout_styles.js';
import NoteLine from './NoteLine'
import pitchAnalyser from 'pitch-analyser';
var hash = require('object-hash');
 
class Notes extends React.Component  {
    constructor(props) {
      super(props);

      this.state = {
            last100Frequencies: [],
            notes: [
                "A", 
                "A#", 
                "B",
                "C",
                "C#",
                "D",
                "D#",
                "E",
                "F",
                "F#",
                "G",
                "G#"],    
            analyser: null,
            noteOffset: 800
        }
        this.analyserCallback = this.analyserCallback.bind(this);
    };

    async analyserCallback(payload) {
        let newFreqList = this.state.last100Frequencies.concat([payload.frequency]);
        console.log(payload.frequency)
        if(this.state.last100Frequencies.length > 100){
          newFreqList.shift();
        //   newFreqList = newFreqList.slice(1);
        }
        await this.setState({last100Frequencies: newFreqList});
        if(this.props.isPlottingPitch){
            this.setState({noteOffset:this.state.noteOffset-1});
        }
    }

    componentDidMount(){
        let analyserOptions = {
          callback: this.analyserCallback,
          returnNote: true,
          returnCents: true,
          decimals: 2,
        }
        this.setState({analyser: new pitchAnalyser(analyserOptions)});
    }

    componentWillUnmount() {
        this.state.analyser.close();
    }

    render() {
        const noteLines = [];
        let noteNum = 12;
        for (let i = noteNum-1; i >= 0; i--){
            noteLines.push(
                <NotesLine 
                    rank={noteNum-i-1}
                    key={this.state.notes[i]}
                    name={this.state.notes[i]}
                />)
        }

        const noteTexts = [];
        for (let i = noteNum-1; i >= 0; i--){
            noteTexts.push(
                <NotesText 
                    rank={noteNum-i-1}
                    key={this.state.notes[i]}
                    name={this.state.notes[i]}
                >{this.state.notes[i]}</NotesText>)
        }

        let noteList = [];
        if(this.props.songNotes && Object.keys(this.props.songNotes).length > 0){
            this.props.songNotes.notes.forEach(note => {
                // console.log('note', note, this.state.notes.indexOf(note.pitch.slice(0, -1)))
                noteList.push(
                    <Note
                        rank={noteNum - 1 - note.pitch}
                        duration={note.end-note.start}
                        timeStart={note.start}
                        key={hash(note)}
                        offset={this.state.noteOffset}
                    />)
            });
            console.log('noteList', noteList, this.props.songNotes.notes);
        }
        return(
            <Fragment>
                <NoteLine
                    isPlottingPitch={this.props.isPlottingPitch}
                    last100Frequencies={this.state.last100Frequencies}
                />
                {noteList}
                {noteLines}
                {noteTexts}
            </Fragment>
        );
    }
}

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

    background: #C4C4C4;
    border: 1px solid #E5E5E5;
`
// z-index: 1000;

export const Text = styled.span`
    font-size: 0.9em;
    font-face: Gill Sans;
    color: white;
    font-weight: bold;

    position: absolute;
    width: 5%;
    top: 30%;
    left: 2%;
    text-align: center;
    vertical-align: middle;

    background: ${backgroundColor.color};
    border-radius: 10px;
`
const NotesText = styled(Text)`
    top: ${props => headerHeight - (height/4) + (height) * (props.rank)}%;
    position: absolute;
    left: 90%;
    z-index: 500;
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

let pxPerTimeStep = 15;
let percentPerTimeStep = 5;

const Note = styled.div`
    position: absolute;
    width: ${props => pxPerTimeStep * props.duration}px;
    left: ${props => props.timeStart * pxPerTimeStep + props.offset}px;
    top: ${props => headerHeight + (height * 3 / 4) + (height) * (props.rank)}%;
    height: ${height/2}%;

    background: #D02000;
    border-radius: 10px;
    z-index: 300;
`;

export default Notes;