/*global chrome*/

import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedPCB: "Caca"
    };
  }

  closeIframe() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { "type": "closeModal" });
    });
  }

  render() {
    return (
      <div className="App">
        <header>
          <img id="logo" src="assets/img/logo.svg"/> 
          <h1>PCB Part picker</h1>
          <a href="#" id="closeBtn" onClick={this.closeIframe}><img id="close" src="assets/img/right-arrow.svg"/></a>
        </header>
        {/* <PCBselector></PCBselector>
        <PartList></PartList>
        <PickPart></PickPart>
        <ExportBOM></ExportBOM> */}
        <a class="about" target="_blank" href="https://albertalvarezcarulla.com/PCB-Part-picker">About</a>
      </div>
    );
  }
}

export default App;
