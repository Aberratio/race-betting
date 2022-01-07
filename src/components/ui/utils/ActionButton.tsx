import * as React from 'react';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

const useStyles = makeStyles({
  activeButton: {
    width: 150,
    backgroundColor: '#1976d2 !important',
    "&:hover": {
      transform: 'scale(1.01) perspective(1px)',
    }
  },
  inactiveButton: {
    width: 150,
    backgroundColor: 'rgba(0, 0, 0, 0.12) !important',
    color: 'rgba(0, 0, 0, 0.26) !important'
  },
});

interface ActionButtonProps {
  buttonText: string,
  onClick?: () => void,
  isActive: boolean,
}

const ActionButton = (props: ActionButtonProps) => {
  const classes = useStyles();
  return (
    <Button 
      variant="contained" 
      disableElevation 
      onClick={props.onClick} 
      disabled={!props.isActive} 
      className={clsx(classes.activeButton, {[classes.inactiveButton]: !props.isActive})}
    >
      {props.buttonText} 
    </Button>
  );
}

export default ActionButton;