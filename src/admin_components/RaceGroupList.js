import React from 'react';

import RaceGroupListItem from './RaceGroupListItem';

const RaceGroupList = ({ raceGroups, onDeleteItem }) => {
  const tableStyle = {
    fontFamily: 'sans-serif',
    fontSize: '12px',
  };

  return (
    <table style={tableStyle}>
      <tbody>
        {
          raceGroups.map(raceGroup => <RaceGroupListItem
            key={raceGroup.id}
            onDelete={onDeleteItem}
            raceGroup={raceGroup}
          />)
        }
      </tbody>
    </table>
  );
};

RaceGroupList.propTypes = {
  raceGroups: React.PropTypes.array.isRequired,
  onDeleteItem: React.PropTypes.func.isRequired,
};

export default RaceGroupList;
