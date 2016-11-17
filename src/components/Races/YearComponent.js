import React from 'react'

const YearComponent = ({ year }) => {
  return <div style={{position:"relative", width:"388px", height:"90px", boxSizing:"border-box", fontFamily: "sans-serif", margin:"2px", fontSize: "14px", backgroundColor:"#f5f5f5", float: "left"}}>
    <div style={{position:"absolute", fontSize:"40px", left:"50%", top:"50%", transform: "translate(-50%,-50%)"}}>{year}</div>
  </div>;
};
YearComponent.propTypes = { year: React.PropTypes.string };

export default YearComponent;
