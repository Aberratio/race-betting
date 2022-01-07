import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  iconInputContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
});

interface IconNumberInputProps {
  value?: number,
  onChange: (number: any) => void,
  label: string,
  icon: JSX.Element,
}

const IconNumberInput = (props: IconNumberInputProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.iconInputContainer}>
      {props.icon}
      <TextField
        type='number'
        value={props.value ? props.value : ""}
        InputProps={{ inputProps: { min: 0 } }} 
        label={props.label}
        variant="standard"
        onChange={e => props.onChange(e.target.value)} />
    </Box>
  );
}

export default IconNumberInput;