import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/ui/Header';
import Home from './components/ui/Home';
import { Routes, Route } from "react-router-dom";
import BetPage from './components/models/bets/BetPage';
import { RaceDto } from './components/dto/RaceDto';
import { ParticipantDto } from './components/dto/ParticipantDto';
import { BetDetails } from './components/interfaces/BetDetails';
import { GET_PARTICIPANTS_URL, GET_RACES_URL } from './components/tools/UrlBuilder';
import { HOME_PATH, RACE_PATH } from './components/global/consts';

const App = () => {
  const BETS = "bets";
  const [races, setRaces] = useState<RaceDto[]>([]);
  const [bets, setBets] = useState<BetDetails[]>([]);
  const [participants, setPrticipants] = useState<ParticipantDto[]>([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedRaces = await axios(GET_RACES_URL);
      const fetchedParticipants = await axios(GET_PARTICIPANTS_URL);

      setRaces(fetchedRaces.data);
      setPrticipants(fetchedParticipants.data);
      setIsLoading(false);

      var storedBets: BetDetails[] = [];
      if(localStorage.getItem(BETS)) {
        storedBets = JSON.parse(localStorage.getItem(BETS));
      } else {
      (fetchedRaces.data as BetDetails[]).forEach(race => {
        storedBets.push({
          id: race.id,
        });
      })

    }
      setBets(storedBets);
    }
    fetchItems();
  }, [])

  const onBetsChange = (betDetails: BetDetails) => {

    const bet = bets.find(a => a.id === betDetails.id);
    bet.firstId = betDetails.firstId;
    bet.secondId = betDetails.secondId;
    bet.thirdId = betDetails.thirdId;
    bet.betAmount = betDetails.betAmount;

    setBets(bets);
    localStorage.setItem(BETS, JSON.stringify(bets));
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path={HOME_PATH} element={<Home isLoading={isLoading} races={races} bets={bets} />} />
        <Route path={`${RACE_PATH}:id`} element={<BetPage isLoading={isLoading} races={races} participants={participants} onBetsChange={onBetsChange} bets={bets} />} />
      </Routes>
    </>
  );
}

export default App;
