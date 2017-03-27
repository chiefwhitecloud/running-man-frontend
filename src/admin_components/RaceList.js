import React from 'react';
import RaceListItem from './RaceListItem';

const RaceList = ({ races, raceGroups, onRaceGroupChange, onRaceDelete }) => (
  <div>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Name</th>
          <th>Race Group</th>
        </tr>
      </thead>
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
