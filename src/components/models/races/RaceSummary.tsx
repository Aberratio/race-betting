import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShortCard from '../bets/ShortCard';
import { makeStyles } from '@mui/styles';
import { BetDetails } from '../../interfaces/BetDetails';
import { RaceDto } from '../../dto/RaceDto';
import StatusIcon from '../../ui/utils/StatusIcon';
import { RaceStatus } from '../../interfaces/RaceStatus';

const useStyles = makeStyles({
  raceHeader: {
    background: '#1976d2 !important',
    color: '#fff !important',
    borderRadius: '5px !important',
    height: 20
  },
  container: {
    fontFamily: 'font-family:"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    marginBottom: 10,
  }
});

interface RaceSummaryProps {
  race: RaceDto,
  handleChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void,
  expanded: string | false,
  bet: BetDetails,
}

const RaceSummary = (props: RaceSummaryProps) => {
  const classes = useStyles();

  return (
    <Accordion expanded={props.expanded === 'panel' + props.race.id} onChange={props.handleChange('panel' + props.race.id)} className={classes.container}>
      <AccordionSummary
        className={classes.raceHeader}
        expandIcon={<ExpandMoreIcon />}
        aria-controls={'panel' + props.race.id + 'bh-content'}
        id={'panel' + props.race.id + 'bh-header'}
      >
        <Typography sx={{ width: '10%', flexShrink: 0 }} component={'span'} variant={'body2'}>
          <StatusIcon status={props.race.active ? RaceStatus.ACTIVE : RaceStatus.INACTIVE} />
        </Typography>
        <Typography component={'span'} variant={'body2'}>{props.race.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography component={'span'} variant={'body2'}>
          <ShortCard raceId={props.race.id} bet={props.bet} />
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}

export default RaceSummary
