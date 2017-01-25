import React from 'react';
import RaceListItem from './RaceListItem';

const RaceList = ({ races, raceGroups, onRaceGroupSelectionChange }) => (
  <div>
    <h2>Race List</h2>
    <table>
      <tbody>
        {
        races.map(race => (
          <RaceListItem
            key={race.id}
            race={race}
            raceGroups={raceGroups}
            onRaceGroupSelectionChange={onRaceGroupSelectionChange}
          />))
        }
      </tbody>
    </table>
  </div>
);

RaceList.propTypes = {
  races: React.PropTypes.array.isRequired,
  raceGroups: React.PropTypes.array.isRequired,
  onRaceGroupSelectionChange: React.PropTypes.func.isRequired,
};

export default RaceList;
