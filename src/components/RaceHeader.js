import React from 'react';
import PropTypes from 'prop-types';

import { LongDateFormat, Year } from './../DateFormatter';

const RaceHeader = (props) => {
  const containerStyle = {
    backgroundColor: '#c6dae2',
    borderBottom: '2px solid #a2a2a2',
    borderSizing: 'border-box',
    padding: '50px',
    marginTop: '50px',
  };

  const nameStyle = {
    fontSize: '36px',
    fontFamily: 'sans-serif',
    float: 'left',
  };

  const yearStyle = {
    fontSize: '36px',
    fontFamily: 'sans-serif',
    float: 'right',
  };

  const dateStyle = {
    fontSize: '14px',
    fontFamily: 'sans-serif',
  };

  return (
    <div style={containerStyle}>
      <div>
        <div style={nameStyle}>{props.name}</div>
        <div style={yearStyle}>{Year(props.date)}</div>
        <div style={{ clear: 'both' }} />
      </div>
      <div style={dateStyle}>{LongDateFormat(props.date)}</div>
      <div>
        {props.children}
      </div>
    </div>);
};

RaceHeader.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default RaceHeader;
