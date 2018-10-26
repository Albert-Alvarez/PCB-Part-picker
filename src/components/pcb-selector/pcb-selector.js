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
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class PCBSelector extends Component {
    constructor(props) {
        super(props);
        this.onPcbSelected = this.onPcbSelected.bind(this);
    }

    createSelector = () => {
        let selector = [];

        selector = this.props.pcbs.map((pcb, index) => {
            return <MenuItem value={index}>{pcb}</MenuItem>;
        });
        return selector;
    }

    onPcbSelected(event) {
        this.props.onChange(event);
    }

    render() {
        const { classes } = this.props;
        return (

            <form className={classes.root} autoComplete="off">
                <FormControl className={classes.formControl}>
                    <InputLabel shrink htmlFor="pcb-selector">PCB name</InputLabel>
                    <Select
                        value={this.props.selectedPcb}
                        onChange={event => this.onPcbSelected(event)}
                        inputProps={{
                            name: 'pcb-selector',
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