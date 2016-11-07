import React from 'react';
import { LongDateFormat, Year } from './../DateFormatter'

const RaceHeader = (props) => {
  var containerStyle = {
    backgroundColor: "#c6dae2",
    borderBottom: "2px solid #a2a2a2",
    borderSizing: "border-box",
    padding: "50px",
    marginTop: "50px"
  }

  var nameStyle = {
    fontSize: "36px",
    fontFamily: "sans-serif",
    float: "left"
  };

  var yearStyle = {
    fontSize: "36px",
    fontFamily: "sans-serif",
    float: "right"
  };

  var dateStyle = {
    fontSize: "14px",
    fontFamily: "sans-serif"
  };

  return  <div style={containerStyle}>
    <div>
      <div style={nameStyle}>{props.name}</div>
      <div style={yearStyle}>{Year(props.date)}</div>
      <div style={{clear:"both"}}></div>
    </div>
    <div style={dateStyle}>{LongDateFormat(props.date)}</div>
    <div>
      {props.children}
    </div>
  </div>
};

RaceHeader.propTypes = {
  name: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired
};

export default RaceHeader;
