import React from 'react';
import PropTypes from 'prop-types';

const SelectYearComponent = ({years}) => {
  return <div>
    {years.map(function(year){
      return <div>{year}</div>
    })}
  </div>;
};
SelectYearComponent.propTypes = { years: PropTypes.array };

export default SelectYearComponent;
