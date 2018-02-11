import React from 'react';
import PropTypes from 'prop-types';

import RaceGroupListItem from './RaceGroupListItem';
import RaceGroupListItemEdit from './RaceGroupListItemEdit';

const RaceGroupList = ({ raceGroups, onDelete, onEnableEdit, onCancelEdit, onUpdate }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Distance</th>
        <th>Distance Units</th>
      </tr>
    </thead>
    <tbody>
      {
        raceGroups.map((raceGroup) => {
          if (raceGroup.isEditting) {
            return (<RaceGroupListItemEdit
              key={raceGroup.id}
              raceGroup={raceGroup}
              onCancelEdit={onCancelEdit}
              onUpdateRaceGroup={onUpdate}
            />);
          }
          return (<RaceGroupListItem
            key={raceGroup.id}
            onDelete={onDelete}
            onEnableEdit={onEnableEdit}
            raceGroup={raceGroup}
          />);
        })
      }
    </tbody>
  </table>
);

RaceGroupList.propTypes = {
  raceGroups: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEnableEdit: PropTypes.func.isRequired,
  onCancelEdit: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default RaceGroupList;
