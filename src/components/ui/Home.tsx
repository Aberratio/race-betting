import React from 'react'
import { BetDetails } from '../interfaces/BetDetails';
import { RaceDto } from '../dto/RaceDto';
import RacesList from '../models/races/RacesList';
import { makeStyles } from '@mui/styles';
import { RaceStatus } from '../interfaces/RaceStatus';
import IconLabelButton from './utils/IconLabelButton';
import StatusIcon from './utils/StatusIcon';

const useStyles = makeStyles({
    actionContainer: {
      width:'30%',
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      height: '25vh',
    },
    betListContainer: {
        padding: 30,
        maxWidth: 1000,
        display: 'flex',
        justifyContent: 'space-around',
        margin: 'auto',
    },
    filtersHeader: {
      marginTop: 0,
      paddingTop: 0,
    }
  });

interface HomeProps {
    races: RaceDto[],
    isLoading: boolean,
    bets: BetDetails[],
}

const Home = (props: HomeProps) => {
    const classes = useStyles();
    const [expectedStatus, setExpectedStatus] = React.useState<RaceStatus>(RaceStatus.ALL);

    const filterFunction = (race: RaceDto) => {
        return expectedStatus === RaceStatus.ALL ? true : expectedStatus === (race.active ? RaceStatus.ACTIVE : RaceStatus.INACTIVE) ;  
    }

    return props.isLoading ? (<h1>Loading...</h1>) : (<section className={classes.betListContainer}>
        <div className={classes.actionContainer}>
            <h2 className={classes.filtersHeader}>Filters</h2>
            <IconLabelButton icon={<StatusIcon status={RaceStatus.INACTIVE} /> } label={"inactive"} onClick={() => setExpectedStatus(RaceStatus.INACTIVE)}/>
            <IconLabelButton icon={<StatusIcon status={RaceStatus.ACTIVE} /> } label={"active"} onClick={() => setExpectedStatus(RaceStatus.ACTIVE)}/>
            <IconLabelButton label={"all"} onClick={() => setExpectedStatus(RaceStatus.ALL)}/>
        </div>
        <RacesList races={props.races} bets={props.bets} filter={filterFunction} />
    </section>);
}

export default Home 
