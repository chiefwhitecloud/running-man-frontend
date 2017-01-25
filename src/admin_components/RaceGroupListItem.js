import React from 'react';

const RaceGroupListItem = ({ raceGroup, onDelete }) => (
  <div>
    <div>{raceGroup.name} - {raceGroup.distance}
      <button onClick={() => onDelete(raceGroup.id)}>Delete</button>
    </div>
  </div>
);

RaceGroupListItem.propTypes = {
  raceGroup: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    distance: React.PropTypes.string.isRequired,
  }).isRequired,
  onDelete: React.PropTypes.func.isRequired,
};

export default RaceGroupListItem;
