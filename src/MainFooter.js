import React, {Fragment} from "react";
import styled, {css} from "styled-components"
import { backgroundColor } from './layout_styles.js';
import {notesGood} from './returnNotes'

class Footer extends React.Component  {
    constructor(props) {
      super(props);
      let defaultUrl = "https://www.youtube.com/watch?v=5d4f8-WTd0U";
      this.state = {enteredUrl:defaultUrl, defaultUrl, buttonText:'Go'}
      this._getNotesFromUrlHandler = this._getNotesFromUrlHandler.bind(this);
      this._pressGoButton = this._pressGoButton.bind(this);
      this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
    };

    _getNotesFromUrlHandler(e) {
        e.preventDefault();
        this.setState({notes: notesGood.notes});
        this.props._updateNotes(notesGood.notes);
        // fetch(`${this.props.serverUrl}/api/get_notes?link=${this.state.enteredUrl.split("watch?v=")[1]}`)
        // .then(res => res.json())
        // .then((data) => {
        //     console.log(data);
        //     this.setState({ notes: data });
        //     this.props._updateNotes(data);
        // })
        // .catch(console.log);
    }
    
    _pressGoButton(e){
        this._getNotesFromUrlHandler(e);
        this.props._updateIsPlottingPitch(!this.props.isPlottingPitch);
        this.setState({buttonText:this.state.buttonText==='Go'?'Stop':'Go'})
    }

    async _handleTextFieldChange(e){
        await this.setState({
            enteredUrl: e.target.value
        });
        console.log(this.state.enteredUrl);
    }
    render() {
        return(
            <Fragment>
                <RedFooter/>
                <SongTextField value={this.state.enteredUrl} onChange={this._handleTextFieldChange} />
                <GetLinkButton onClick={this._pressGoButton}> {this.state.buttonText} </GetLinkButton>
                {/* <ShareBtn 
                    url="https://www.facebook.com/sharer/sharer.php?u=https://hit-the-notes.herokuapp.com"
                    text="Share to facebook!"
                    className='ib'
                    displayText='Share'
                /> */}
                {/* <fbButton><a href="https://www.facebook.com/sharer/sharer.php?u=https://hit-the-notes.herokuapp.com">Share to FB!</a></fbButton> */}
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

const GetLinkButton = styled(Button)`
    left: 65%;
`;

const fbButton = styled(Button)`
    left: 80%;
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
    text-align: center;
    vertical-align: middle;
    width: 40%;
    left: 25%;
    height: 70%;
    top: 15%;
    placeholder: "Youtube URL";

    border: 1px solid white;
    box-sizing: border-box;
    border-radius: 10px 0px 0px 10px;
`;

export default Footer;