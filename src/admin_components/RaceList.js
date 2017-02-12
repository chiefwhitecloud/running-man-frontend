import React from 'react';
import RaceListItem from './RaceListItem';

const RaceList = ({ races, raceGroups, onRaceGroupChange, onRaceDelete }) => (
  <div>
    <table style={{ width: '80%' }}>
      <tbody>
        {
        races.map(race => (
          <RaceListItem
            key={race.id}
            race={race}
            raceGroups={raceGroups}
            onRaceGroupChange={onRaceGroupChange}
            onRaceDelete={onRaceDelete}
          />))
        }
      </tbody>
    </table>
  </div>
);

RaceList.propTypes = {
  races: React.PropTypes.array.isRequired,
  raceGroups: React.PropTypes.array.isRequired,
  onRaceGroupChange: React.PropTypes.func.isRequired,
  onRaceDelete: React.PropTypes.func.isRequired,
};

export default RaceList;
