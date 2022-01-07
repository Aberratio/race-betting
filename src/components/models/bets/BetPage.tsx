import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { RaceDetails } from '../../interfaces/RaceDetails';
import { ParticipantDto } from '../../dto/ParticipantDto';
import { RaceDto } from '../../dto/RaceDto';
import { BetDetails } from '../../interfaces/BetDetails';
import BetTable from './BetTable';
import ActionButton from '../../ui/utils/ActionButton';
import IconNumberInput from '../../ui/utils/IconNumberInput';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { makeStyles } from '@mui/styles';
import Breadcrumb from '../../ui/utils/Breadcrumb';
import StatusIcon from '../../ui/utils/StatusIcon';
import { RaceStatus } from '../../interfaces/RaceStatus';

const useStyles = makeStyles({
  betPageContainer: {
    padding: 20,
  },
  betDetailsContainer: {
    maxWidth: 1000,
    margin: 'auto',
  },
  actionBar: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'sticky',
    bottom: 0,
    paddingBottom: 10,
    background: '#fff'
  },
  buttonGroupWrapper: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: 350,
    margin: 'auto'
  }
});

interface BetPageProps {
  participants: ParticipantDto[],
  races: RaceDto[],
  isLoading: boolean,
  bets: BetDetails[],
  onBetsChange: (bet: BetDetails) => void;
}

const BetPage = (props: BetPageProps) => {
  const classes = useStyles();
  let { id } = useParams();

  const [raceDetails, setRaceDetails] = useState<RaceDetails>(null);
  const [betAmount, setBetAmount] = useState<number>(null);
  const [first, setFirst] = useState<number>(null);
  const [second, setSecond] = useState<number>(null);
  const [third, setThird] = useState<number>(null);
  const [newChanges, setNewChanges] = useState<boolean>(false);

  useEffect(() => {
    const allDependenciesLoaded = () => {
      return props.participants.length > 0 && props.races.length > 0 && props.bets.length > 0 && id;
    };

    const getParticipant = (index: number) => {
      return props.participants.find(participant => participant.id === index);
    };

    if (allDependenciesLoaded()) {
      const currentRace = props.races.find(race => { return race.id.toString() === id; });
      setRaceDetails({
        ...currentRace,
        participants: currentRace.participants.map(participant => getParticipant(participant))
      });

      var currentBet = props.bets.find(bet => bet.id === Number(id));
      currentBet.firstId && setFirst(currentBet.firstId);
      currentBet.secondId && setSecond(currentBet.secondId);
      currentBet.thirdId && setThird(currentBet.thirdId);
      currentBet.betAmount && setBetAmount(currentBet.betAmount);
    }
  }, [props, id])

  const onFirstClick = (id: number) => {
    unsetBet(id);
    setFirst(id);
  };

  const onSecondClick = (id: number) => {
    unsetBet(id);
    setSecond(id);
  };

  const onThirdClick = (id: number) => {
    unsetBet(id);
    setThird(id);
  };

  const unsetBet = (id: number) => {
    if (id === first) {
      setFirst(null);
    } else if (id === second) {
      setSecond(null);
    } else if (id === third) {
      setThird(null);
    } else if (!newChanges) {
      setNewChanges(true);
    }
  };

  const hadSavedBetDetailsBeforeReset = () => {
    return props.bets.find(bet => bet.id === Number(id)).firstId;
  }

  const unsetBetDetails = () => {
    setFirst(null);
    setSecond(null);
    setThird(null);
    setBetAmount(null);
    if(hadSavedBetDetailsBeforeReset()) {
      setNewChanges(true);
    } else {
      setNewChanges(false); 
    }
  };

  const onSaveBetClick = () => {
    props.onBetsChange({
      id: Number(id),
      firstId: first,
      secondId: second,
      thirdId: third,
      betAmount: betAmount
    });
    setNewChanges(false);
  };

  const onResetClick = () => {
    unsetBetDetails();
  };

  const onBetValueChange = (betAmount: number) => {
    setBetAmount(betAmount);
    if (!newChanges) {
      setNewChanges(true);
    }
  };

  const changedBetDetailsValid = () => {
    return (first && second && third && betAmount && newChanges && true) ||
      (!first && !second && !third && !betAmount && newChanges && true);
  };

  const someBetDetailsFilled = () => {
    return (first || second || third || betAmount) && true;
  };

  return props.isLoading ? (<h1>Loading...</h1>) : (
    <div className={classes.betPageContainer}>
      <Breadcrumb label={raceDetails && raceDetails.name} />
      <h1><StatusIcon status={raceDetails && raceDetails.active ? RaceStatus.ACTIVE : RaceStatus.INACTIVE} /> {raceDetails && raceDetails.name}</h1>
      <div className={classes.betDetailsContainer}>
        <IconNumberInput value={betAmount} onChange={onBetValueChange} icon={<AttachMoneyIcon />} label={"Bet amount"} />
        <BetTable
          raceDetails={raceDetails}
          first={first}
          second={second}
          third={third}
          onFirstClick={onFirstClick}
          onSecondClick={onSecondClick}
          onThirdClick={onThirdClick} />
      </div>
      <div className={classes.actionBar}>
        <div className={classes.buttonGroupWrapper}>
          <ActionButton buttonText='Reset' isActive={someBetDetailsFilled()} onClick={onResetClick} />
          <ActionButton buttonText='Save changes' isActive={changedBetDetailsValid()} onClick={onSaveBetClick} />
        </div>
      </div>
    </div>
  );
}

export default BetPage;