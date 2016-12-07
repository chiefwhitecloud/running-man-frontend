import React from 'react'

const RaceGroupList = ({raceGroups}) => {
  return <div>
    {raceGroups.map(function(raceGroup){
      return <div key={raceGroup.id}>{raceGroup.name} - {raceGroup.distance}</div>
    })}
  </div>;
};
RaceGroupList.propTypes = { years: React.PropTypes.array };

export default RaceGroupList;
