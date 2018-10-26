/*global chrome*/

import React, { Component } from 'react';
import './App.css';
import PCBSelector from './components/pcb-selector/pcb-selector';
import RemovePCB from './components/remove-pcb/remove-pcb';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedPcb: '',
      pcbs: []
    };
    this.handleMessage = this.handleMessage.bind(this);
    this.getLastUpdates = this.getLastUpdates.bind(this);
    this.getPcbs = this.getPcbs.bind(this);
    this.onPcbSelected = this.onPcbSelected.bind(this);
    this.removePcb = this.removePcb.bind(this);

    chrome.storage.local.get({ pcbs: [] }, this.getPcbs);

  }

  getPcbs(result) {
    let pcbs = result.pcbs.map(function (pcb) {
      return pcb.name;
    });
    this.setState({ pcbs: pcbs });
  }

  componentDidMount() {
    chrome.runtime.onMessage.addListener(this.handleMessage);
    chrome.storage.onChanged.addListener(this.getLastUpdates);
  }

  componentWillUnmount() {
    chrome.runtime.onMessage.removeListener(this.handleMessage);
  }

  handleMessage(msg) {
    // if (msg.target === 'app') {
    //   switch (msg.type) {
    //     case 'newAvailablePcb':
    //       chrome.storage.local.get({ pcbs: [] }, this.getPcbs);
    //       break;
    //   }
    // }
  }

  removePcb () {
    let confirmation = window.confirm("Do you really want to delete '" + this.state.pcbs[this.state.selectedPcb] + "'? " + 
                                      "This action will delete its BOM permanently.");
    if(confirmation) {
      chrome.runtime.sendMessage({ type: 'removePCB', oldPcb: this.state.selectedPcb });
    }
  }

  getLastUpdates(changes, namespace) {

    for (let key in changes) {
      switch (key) {
        case 'pcbs':
          chrome.storage.local.get({ pcbs: [] }, result => {
            this.getPcbs(result);
            this.setState({ selectedPcb: this.state.pcbs.length - 1 });
          });
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

  onPcbSelected(event) {
    if (event.target.value == 'addNewPCB') {
      let newPcb = prompt("Please, enter the name of your new PCB:", "Prototype's name...");
      if (newPcb != null) {
        chrome.runtime.sendMessage({ type: 'addNewPCB', newPcb: newPcb });
      }
    } else {
      this.setState({ selectedPcb: event.target.value });
    }
  }

  render() {
    let disableRemovePCB = (this.state.selectedPcb === '');
    return (
      <div className="App">
        <header>
          <img id="logo" src="assets/img/logo.svg" />
          <h1>PCB Part picker</h1>
          <a href="#" id="closeBtn" onClick={this.closeIframe}><img id="close" src="assets/img/right-arrow.svg" /></a>
        </header>
        <div>
          <PCBSelector
            selectedPcb={this.state.selectedPcb}
            pcbs={this.state.pcbs}
            onChange={this.onPcbSelected}
          >
          </PCBSelector>
          <RemovePCB
            disabled={disableRemovePCB}
            onClickHandler={this.removePcb}
          >
          </RemovePCB>
          {/* <PartList></PartList>
          <PickPart></PickPart>
          <ExportBOM></ExportBOM> */}
          <a class="about" target="_blank" href="https://albertalvarezcarulla.com/PCB-Part-picker">About</a>
        </div>
      </div>
    );
  }
}

export default App;
