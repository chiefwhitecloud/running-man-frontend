import React from 'react';

const RaceHeader = (props) => {
  var containerStyle = {
  }
  var clearStyle ={
    clear: "both"
  }
  var nameStyle = {
    maxWidth: "400px",
    float: "left"
  }
  var dateStyle = {
    maxWidth: "400px",
    float: "right"
  }
  return  <div style={containerStyle}>
    <div style={nameStyle}>{props.name}</div>
    <div style={dateStyle}>{props.date}</div>
    <div style={clearStyle} />
  </div>
};

RaceHeader.propTypes = {
  name: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired
};

export default RaceHeader;
