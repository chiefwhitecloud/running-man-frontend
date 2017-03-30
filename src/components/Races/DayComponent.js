import React from 'react'
import { DayOfMonth, ShortMonthName, Year } from './../../DateFormatter'

const DayComponent = ({ raceDate, children }) => {
  return <div style={{width:"388px", height:"90px", boxSizing:"border-box", fontFamily: "sans-serif", margin:"2px", fontSize: "14px", backgroundColor:"#f5f5f5", float: "left"}}>
    <div style={{float:"left", width:"50px", textAlign:"center", boxSizing:"border-box", padding:"8px", fontFamily:"sans-serif"}}>
      <div style={{fontSize:"14px"}}>{ShortMonthName(raceDate).toUpperCase()}</div>
      <div style={{fontSize:"24px"}}>{DayOfMonth(raceDate)}</div>
      <div style={{fontSize:"12px", color:"#777777"}}>{Year(raceDate)}</div>
    </div>
    <div style={{float:"right", width:"338px", boxSizing:"border-box", padding:"10px"}}>{children}</div>
    <div style={{clear:"both"}} />
  </div>;
};
DayComponent.propTypes = { raceDate: React.PropTypes.string };

export default DayComponent;
