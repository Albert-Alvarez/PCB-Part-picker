/*global chrome*/

import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import './pcb-selector.css';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class PCBSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    createSelector = () => {
        let selector = [];

        selector = this.props.AvailablePCBs.map(pcb => {
            return <MenuItem value={pcb}>{pcb}</MenuItem>;
        });
        return selector;
    }

    handleChange(event) {
        if(event.target.value == 'addNewPCB') {
            let newPcb = prompt("Please, enter the name of your new PCB:", "Prototype's name...");

            if (newPcb != null) {
                chrome.runtime.sendMessage({ type: 'addNewPCB', data: newPcb });
            }
        } else {
            this.setState({ value: event.target.value });
            // chrome.runtime.sendMessage({ type: 'availablePCBs', data: ['ea', 'oa', 'iu'] });
        }
    }

    render() {
        let selected = (this.props.selectedPCB) ? false : true;
        const { classes } = this.props;
        return (

            <form className={classes.root} autoComplete="off">
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="pc -selector">PCB name</InputLabel>
                    <Select
                        value={this.state.value}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'PCB Selector',
                            id: 'pcb-selector',
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {this.createSelector()}
                        <MenuItem value="addNewPCB">Add new PCB...</MenuItem>
                    </Select>
                </FormControl>
            </form>
        );
    }
}

PCBSelector.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PCBSelector);