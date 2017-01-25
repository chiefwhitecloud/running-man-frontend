import React from 'react';

import RaceGroupListItem from './RaceGroupListItem';

const RaceGroupList = ({ raceGroups, onDeleteItem }) => (
  <div>
    {
      raceGroups.map(raceGroup => <RaceGroupListItem
        key={raceGroup.id}
        onDelete={onDeleteItem}
        raceGroup={raceGroup}
      />)
    }
  </div>
);

RaceGroupList.propTypes = {
  raceGroups: React.PropTypes.array.isRequired,
  onDeleteItem: React.PropTypes.func.isRequired,
};

export default RaceGroupList;
