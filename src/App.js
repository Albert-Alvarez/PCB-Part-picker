/*global chrome*/

import React, { Component } from 'react';
import './App.css';
import PCBSelector from './components/pcb-selector/pcb-selector';

class App extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      selectedPCB: null,
      AvailablePCBs: []
    };
    this.handleMessage = this.handleMessage.bind(this);
    this.getAvailablePCBs = this.getAvailablePCBs.bind(this);

    chrome.storage.local.get({ available_pcbs: [] }, this.getAvailablePCBs);

  }

  getAvailablePCBs(result) {

    this.setState({ AvailablePCBs: result.available_pcbs });
    console.log(result.available_pcbs);

  }

  componentDidMount() {
    chrome.runtime.onMessage.addListener(this.handleMessage);
  }

  componentWillUnmount() {
    chrome.runtime.onMessage.removeListener(this.handleMessage);
  }

  handleMessage(msg) {
    if (msg.target === 'app') {
      switch (msg.type) {
        case 'availablePCBs':
          this.setState({ AvailablePCBs: msg.data });
          break;
      }
    }
  }

  closeIframe() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { target: 'extension', type: 'closeModal' });
    });
  }

  render() {
    return (
      <div className="App">
        <header>
          <img id="logo" src="assets/img/logo.svg" />
          <h1>PCB Part picker</h1>
          <a href="#" id="closeBtn" onClick={this.closeIframe}><img id="close" src="assets/img/right-arrow.svg" /></a>
        </header>
        <PCBSelector selectedPCB={this.state.selectedPCB} AvailablePCBs={this.state.AvailablePCBs}></PCBSelector>
        {/* <PartList></PartList>
        <PickPart></PickPart>
        <ExportBOM></ExportBOM> */}
        <a class="about" target="_blank" href="https://albertalvarezcarulla.com/PCB-Part-picker">About</a>
      </div>
    );
  }
}

export default App;
