import React, { Component, Fragment } from "react";
// import logo from './logo.svg';
import './App.css';
import Header from './MainHeader';
import Footer from './MainFooter';
import Notes from './MusicArea';
import { layoutStyles } from './layout_styles.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songNotes: [],
      isPlottingPitch: false,
      serverUrl: "http://localhost:3001", 
    };
    this._updateNotes = newNotes => {
      this.setState({ songNotes: newNotes });
    };
    this._updateIsPlottingPitch = val => {
      this.setState({ isPlottingPitch: val });
    };
  }
  
  async componentDidMount() {
    console.log("Mounting App.js");
    // EXAMPLE NODE CALL
    // var res = await fetch(`/get_username`);
    // res = await res.json();
    // console.log(`Unique id: ${res["id"]}.`);

    // TODO: REPLACE WITH ACTUAL ENDPOINTS
    // CURRENTLY POPULATED WITH RANDOM EXAMPLE SHIT, 
    // THIS STUFF NEEDS TO BE SET NOT IN DIDMOUNT BUT ON SOME METHOD CALLED POSTLOGIN
    // this.login();
  }

  render() {
    if (this.state.display === "initial") return <h1>Loading...</h1>; 
    if(this.state.display === "login"){
        // loginOverlay = (<LoginOverlay><</LoginOverlay>) // adam to fill out
    }
    console.log("rendering app.js with state", this.state);
    console.log(layoutStyles)
    return (
      <Fragment>
        <div style={layoutStyles.header}>
          <Header/>
        </div>
        <div style={layoutStyles.notesArea}>
          <Notes
            songNotes={this.state.songNotes}
            isPlottingPitch={this.state.isPlottingPitch}
          />
        </div>
        <div style={layoutStyles.footer}>
          <Footer
            isPlottingPitch={this.state.isPlottingPitch}
            _updateIsPlottingPitch={this._updateIsPlottingPitch}
            serverUrl={this.state.serverUrl}
            _updateNotes={this._updateNotes}
          />
        </div>
        <div id ='detector'></div>
        <div id ='output'></div>
        <div id ='waveform'></div>
        <div id ='pitch'></div>
        <div id ='note'></div>
        <div id ='detune'></div>
        <div id ='detune_amt'></div>
      </Fragment>
    );
	}
}
export const LeaderboardWidthPercent = 15;
export default App;
