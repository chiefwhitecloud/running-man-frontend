import React from 'react';

const RaceGroupListItem = ({ raceGroup, onDelete, onEnableEdit }) => (
  <tr>
    <td>{raceGroup.name}</td>
    <td>{raceGroup.distance}</td>
    <td>{raceGroup.distanceUnit}</td>
    <td><button onClick={() => onDelete(raceGroup.self)}>Delete</button></td>
    <td><button onClick={() => onEnableEdit(raceGroup.self)}>Edit</button></td>
  </tr>
);

RaceGroupListItem.propTypes = {
  raceGroup: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    distance: React.PropTypes.string.isRequired,
  }).isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onEnableEdit: React.PropTypes.func.isRequired,
};

export default RaceGroupListItem;
