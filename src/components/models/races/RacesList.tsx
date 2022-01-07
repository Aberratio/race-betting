import * as React from 'react';
import { BetDetails } from '../../interfaces/BetDetails';
import RaceSummary from './RaceSummary';
import { makeStyles } from '@mui/styles';
import { RaceDto } from '../../dto/RaceDto';

const useStyles = makeStyles({
    RacesList: {
      width:'60%',
      display: 'block',
    },
  });

interface RacesListProps {
  races: RaceDto[],
  bets: BetDetails[],
  filter?: (race: RaceDto) => boolean,
}

const RacesList = (props: RacesListProps) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className={classes.RacesList}>
      {props.races.map(race => 
        { if(props.filter) {
          return props.filter(race) ? 
            <RaceSummary 
              key={race.id} 
              race={race} 
              expanded={expanded} 
              handleChange={handleChange} 
              bet={props.bets.find(x => x.id === race.id)} 
            /> 
          : null;
        } else {
          return <RaceSummary 
                    key={race.id} 
                    race={race} 
                    expanded={expanded} 
                    handleChange={handleChange} 
                    bet={props.bets.find(x => x.id === race.id)} 
                  />;
        } }
      )}
    </div>
  );
}

export default RacesList;