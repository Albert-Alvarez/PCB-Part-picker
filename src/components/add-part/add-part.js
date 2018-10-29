import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceICon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

function AddPart(props) {
  const { classes } = props;
  return (
      <Button disabled={props.disabled} onClick={props.onClickHandler} variant="contained" color="primary" className={classes.button}>
        Add part
        <AddIcon className={classes.rightIcon} />
      </Button>
  );
}

AddPart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddPart);