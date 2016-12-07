import React from 'react'
import RaceListItem from './RaceListItem'

const RaceList = ({races, raceGroups, onRaceGroupSelectionChange}) => {
  return <div>
    <h2>Race List</h2>

    <table>
      <tbody>
        {races.map(function(race){
          return <RaceListItem key={race.id} race={race} raceGroups={raceGroups} onRaceGroupSelectionChange={onRaceGroupSelectionChange} />
        })}
      </tbody>
    </table>
  </div>;
};

export default RaceList;
