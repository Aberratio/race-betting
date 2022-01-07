import * as React from 'react';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  button: {
    width: 140,
    display: 'flex !important',
    justifyContent: 'flex-start !important',
  },
});


interface IconLabelButtonProps {
  icon?: JSX.Element,
  label: string, 
  onClick?: () => void,
}

const IconLabelButton = (props: IconLabelButtonProps) => {
  const classes = useStyles();

  return (
      <Button variant="contained" startIcon={props.icon} onClick={props.onClick} className={classes.button}>
        {props.label}
      </Button>
  );
}

export default IconLabelButton;