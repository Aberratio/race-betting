## Introduction

Web-based application for entering bets on races based on two views: 
1. A list of all races with the ability to filter by whether a race is active. In addition, for each race, there is a brief information about whether the user has placed a bet for it. Clicking on race direct the user to the second view.
2. The view of a single race and its participants with the current status of our bet, the possibility to change the stake and the possibility to change your betting. 

## Technologies 

The application was written in React.js with TypeScript. Material UI and Emotion were used for the UI. 
 
## Fetching data

The dates used in the application are taken from https://my-json-server.typicode.com/hdjfye/bet-api 
1. Race data: 
    - all races: [GET] https://my-json-server.typicode.com/hdjfye/bet-api/races
    - single race: [GET] https://my-json-server.typicode.com/hdjfye/bet-api/races/1
2. Participants data:  
    - all participants: [GET] https://my-json-server.typicode.com/hdjfye/bet-api/participants
    - single participant: [GET] https://my-json-server.typicode.com/hdjfye/bet-api/participants/1

## Rules 

1. Places and participants can be bet as you wish. If a new place or a participants conflicts with a previous selection, the previous one is overwritten with the new changes. 
2. New selections are saved in the application memory only after the save button is pressed. 
3. The reset button clears only the visual layer - to keep the changes (cleared bet) you have to press "SAVE CHANGES". 
4. The save button is active when:
    - all fields filled in (correctly!),
    - all fields are empty and the previous state of the application contained a bet for that race.
5. The reset button is active whenever at least one race field is filled in. 

### Notes 
The application stores data in local storage.