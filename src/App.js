/*global chrome*/

import React, { Component } from 'react';
import './App.css';
import PCBSelector from './components/pcb-selector/pcb-selector';
import RemovePCB from './components/remove-pcb/remove-pcb';
import AddPart from './components/add-part/add-part';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedPcb: '',
      pcbs: [],
      productAvailable: false
    };
    this.getLastUpdates = this.getLastUpdates.bind(this);
    this.getPcbs = this.getPcbs.bind(this);
    this.getIfProductAvailable = this.getIfProductAvailable.bind(this);
    this.onPcbSelected = this.onPcbSelected.bind(this);
    this.removePcb = this.removePcb.bind(this);
    this.addPart = this.addPart.bind(this);

    chrome.storage.local.get({ pcbs: [] }, this.getPcbs);
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, { target: 'extension', type: 'availableProduct' }, this.getIfProductAvailable);
    });
  }

  getIfProductAvailable(response){
    this.setState({ productAvailable: response.productAvailable });
  }

  getPcbs(result) {
    let pcbs = result.pcbs.map(function (pcb) {
      return pcb.name;
    });
    this.setState({ pcbs: pcbs });
  }

  componentDidMount() {
    chrome.storage.onChanged.addListener(this.getLastUpdates);
  }

  removePcb () {
    let confirmation = window.confirm("Do you really want to delete '" + this.state.pcbs[this.state.selectedPcb] + "'? " + 
                                      "This action will delete its BOM permanently.");
    if(confirmation) {
      chrome.runtime.sendMessage({ type: 'removePCB', oldPcb: this.state.selectedPcb });
    }
  }

  addPart () {
    alert("hola");
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
    const disableRemovePCB = (this.state.selectedPcb === '');
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
          <AddPart
            disabled={!this.state.productAvailable}
            onClickHandler={this.addPart}
          >
          </AddPart>
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
