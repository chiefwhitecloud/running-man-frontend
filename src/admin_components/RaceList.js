import React from 'react';
import PropTypes from 'prop-types';

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
  races: PropTypes.array.isRequired,
  raceGroups: PropTypes.array.isRequired,
  onRaceGroupChange: PropTypes.func.isRequired,
  onRaceDelete: PropTypes.func.isRequired,
};

export default RaceList;
