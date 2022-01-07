import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { RaceDetails } from '../../interfaces/RaceDetails';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  betTable: {
    marginBottom: 20,
    maxWidth: 600,
  },
  betTableHeader: {
    backgroundColor: '#1976d2',
  },
  betTableHeaderDescription: {
    color: '#fff !important',
  }
});

interface BatTableProps {
  raceDetails: RaceDetails,
  first: number, 
  second: number,
  third: number,
  onFirstClick: (id: number) => void, 
  onSecondClick: (id: number) => void, 
  onThirdClick: (id: number) => void,
}

const BetTable = (props: BatTableProps) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.betTable}>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead className={classes.betTableHeader}>
          <TableRow>
            <TableCell className={classes.betTableHeaderDescription}>Participant</TableCell>
            <TableCell className={classes.betTableHeaderDescription}>Your bets</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.raceDetails && props.raceDetails.participants && props.raceDetails.participants.map((row) => (
            <TableRow
              key={row.id}
            >
              <TableCell component="th" scope="row">
                {row.body}
              </TableCell>
              <TableCell>
              <RadioGroup row>
                <FormControlLabel value="first" control={<Radio onClick={() => props.onFirstClick(row.id)} checked={(row.id === props.first)} /> } label="First" />
                <FormControlLabel value="second" control={<Radio  onClick={() => props.onSecondClick(row.id)} checked={(row.id === props.second)} />} label="Second" />
                <FormControlLabel value="third" control={<Radio  onClick={() => props.onThirdClick(row.id)} checked={(row.id === props.third)} />} label="Third" />
              </RadioGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BetTable;