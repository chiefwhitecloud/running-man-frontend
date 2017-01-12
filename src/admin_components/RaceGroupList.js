import React from 'react'

const RaceGroupList = ({raceGroups, onDeleteItem}) => {
  return <div>
    {raceGroups.map(function(raceGroup){
      return <div key={raceGroup.id}>{raceGroup.name} - {raceGroup.distance} <button onClick={onDeleteItem.bind(raceGroup.id)}>Delete</button></div>
    })}
  </div>;
};
RaceGroupList.propTypes = { years: React.PropTypes.array };

export default RaceGroupList;
