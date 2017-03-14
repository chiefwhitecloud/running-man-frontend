import React from 'react';

const RaceGroupListItem = ({ raceGroup, onDelete }) => (
  <tr>
    <td>{raceGroup.name}</td>
    <td>{raceGroup.distance}</td>
    <td> <button onClick={() => onDelete(raceGroup.self)}>Delete</button></td>
  </tr>
);

RaceGroupListItem.propTypes = {
  raceGroup: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    distance: React.PropTypes.string.isRequired,
  }).isRequired,
  onDelete: React.PropTypes.func.isRequired,
};

export default RaceGroupListItem;
