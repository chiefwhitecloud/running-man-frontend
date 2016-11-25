import React from 'react'

const SelectYearComponent = ({years}) => {
  return <div>
    {years.map(function(year){
      return <div>{year}</div>
    })}
  </div>;
};
SelectYearComponent.propTypes = { years: React.PropTypes.array };

export default SelectYearComponent;
