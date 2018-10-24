/*global chrome*/

import React, { Component } from 'react';
import './pcb-selector.css';

class PCBSelector extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    createSelector = () => {
        let selector = [];

        selector = this.props.AvailablePCBs.map( pcb => {

            if (pcb == this.props.selectedPCB) {
                return <option selected value={pcb}>{pcb}</option>;
            }

            return <option value={pcb}>{pcb}</option>;
        });
        return selector;
    }

    handleChange(event) {

        chrome.runtime.sendMessage({ type: 'availablePCBs', data: ['ea', 'oa', 'iu'] }, 
          function(response) {});
    } 

    render() {
        let selected = (this.props.selectedPCB)?false:true;

        return (
            <select onChange={this.handleChange}>
                <option disabled selected={selected} value>Select a PCB</option>
                {this.createSelector()}
                <option value="addNewPCB">Add new PCB...</option>
            </select>
        );
    }
}

export default PCBSelector;