import React from 'react';
import ActionButton from '../../ui/utils/ActionButton';
import { Link } from "react-router-dom";
import { BetDetails } from '../../interfaces/BetDetails';
import { RACE_PATH } from '../../global/consts';

interface ShortCardProps {
  raceId: number,
  bet: BetDetails,
}


const ShortCard = (props: ShortCardProps) => {

  const betStatus = () => {
    if(props.bet.betAmount) {
      return <p>Your bet: <b>{props.bet.betAmount}$</b></p>;
    } 

    return <p>No bet on this race 😟</p>
  }

  return props.bet ? <>
    <Link to={RACE_PATH+ props.raceId}><ActionButton buttonText='Go to bet!' isActive /></Link>
    {betStatus()}
  
     
  </>
    : <p> Loading.. </p>;
}

export default ShortCard;