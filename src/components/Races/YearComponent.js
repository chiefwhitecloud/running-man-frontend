import React from 'react';
import PropTypes from 'prop-types';

const YearComponent = ({ year }) => {
  return <div style={containerStyle}>
    <div style={yearPositioningStyle}>{year}</div>
  </div>;
};
YearComponent.propTypes = { year: PropTypes.string.isRequired };

const containerStyle = {
  position:"relative",
  width:"388px",
  height:"90px",
  boxSizing:"border-box",
  fontFamily: "sans-serif",
  margin:"2px",
  fontSize: "14px",
  backgroundColor:"#f5f5f5",
  float: "left"
};

const yearPositioningStyle = {
  position:"absolute",
  fontSize:"40px",
  left:"50%",
  top:"50%",
  transform: "translate(-50%,-50%)"
};

export default YearComponent;
