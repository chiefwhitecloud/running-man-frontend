import React from 'react';
import PropTypes from 'prop-types';

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
  raceGroup: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    distance: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEnableEdit: PropTypes.func.isRequired,
};

export default RaceGroupListItem;
