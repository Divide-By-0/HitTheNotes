import React, {Fragment} from "react";
import styled, {css} from "styled-components"
import { backgroundColor } from './layout_styles.js';
import NoteLine from './NoteLine'
import pitchAnalyser from 'pitch-analyser';
var hash = require('object-hash');
 
class Notes extends React.Component  {
    constructor(props) {
      super(props);
      async function analyserCallback(payload) {
          let newFreqList = this.state.last100Frequencies.concat(payload.frequency);
          if(this.state.last100Frequencies.length > 100){
            newFreqList = newFreqList.shift();
          }
          await this.setState({last100Frequencies: newFreqList});
        //   updateNote(payload.note);
        //   updateFrequency(payload.frequency);
        //   updateCents(payload.cents);
      }
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
            analyserOptions: {
                callback: analyserCallback,
                returnNote: true,
                returnCents: true,
                decimals: 2,
            },
            analyser:new pitchAnalyser(analyserOptions)
      }
    };
    // Handle error
    handleError(err) {
        throw new Error(`Opps something went wrong: ${err}`);
    }
    componentWillUnmount() {
        analyser.close();
    }
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

        const noteTexts = [];
        for (let i = noteNum-1; i >= 0; i--){
            noteTexts.push(
                <NotesText 
                    rank={i}
                    key={this.state.notes[i]}
                    name={this.state.notes[i]}
                >{this.state.notes[i]}</NotesText>)
        }

        let noteList = [];
        if(this.props.songNotes && Object.keys(this.props.songNotes).length > 0){
            this.props.songNotes.notes.forEach(note => {
                console.log('note', note, this.state.notes.indexOf(note.pitch.slice(0, -1)))
                noteList.push(
                    <Note
                        rank={this.state.notes.indexOf(note.pitch.slice(0, -1))}
                        duration={note.end-note.start}
                        timeStart={note.start}
                        key={hash(note)}
                    />)
            });
            console.log('noteList', noteList, this.props.songNotes.notes);
        }
        return(
            <Fragment>
               <NoteLine/>
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

let percentPerTimeStep = 5;

const Note = styled.div`
    position: absolute;
    width: ${props => percentPerTimeStep * props.duration}%;
    left: ${props => props.timeStart * percentPerTimeStep}%;
    top: ${props => headerHeight + (height * 3 / 4) + (height) * (props.rank)}%;
    height: ${height/2}%;

    background: #D02000;
    border-radius: 10px;
`;

export default Notes;