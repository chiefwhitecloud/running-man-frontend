import React from 'react'
import xhr from './../xhr'
import { DayOfMonth, ShortMonthName, Year } from './../DateFormatter'
import HeroComponent from './HeroComponent'
import { Link } from 'react-router'

export default class RaceList extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
      items: []
    };
   xhr.get('/feed/races').then((result) => {
     this.setState({
       items: result["races"]
     });
   });
  }
  render() {

    let raceMap = new Map();
    let yearRegEx = /^\d{4}/;

    for (var value of this.state.items) {
      let results = yearRegEx.exec(value["date"])
      if (results.length == 1){
        if (raceMap.get(results[0]) == undefined){
          raceMap.set(results[0], [value]);
        }
        else{
          let v = raceMap.get(results[0]);
          v.push(value);
          raceMap.set(results[0], v);
        }
      }
    }

    //group same races on same day
    for (var [year, value] of raceMap) {
      let races = raceMap.get(year);
      let raceYearMap = new Map();
      let prevDate = undefined;
      let newRaceList = [];
      for (var race of races){
        if (prevDate != race["date"]){
          //new entry;
          raceYearMap.set(race["date"], [race]);
        }
        else{
          //same day;
          let v = raceYearMap.get(race["date"]);
          v.push(race);
          raceYearMap.set(race["date"], v);
        }
        prevDate = race["date"];
      }
      raceMap.set(year, raceYearMap);
    }

    let racesDay = [];

    for (var [year, value] of raceMap) {
      racesDay.push(<YearContainer key={year} year={year} />);
      for (var [date, val] of value) {
        let races= val.map(RaceLink);
        racesDay.push(<RaceDayContainer key={date} raceDate={date}>{races}</RaceDayContainer>)
      }
    }

    racesDay.push(<div key={"clearFix"} style={{clear:"both"}}/>);

    return <div>
      <HeroComponent/>
      <div>{racesDay}</div>
    </div>;
  }
}

const YearContainer = ({ year }) => {
  return <div style={{position:"relative", width:"388px", height:"90px", boxSizing:"border-box", fontFamily: "sans-serif", margin:"2px", fontSize: "14px", backgroundColor:"#f5f5f5", float: "left"}}>
    <div style={{position:"absolute", fontSize:"40px", left:"50%", top:"50%", transform: "translate(-50%,-50%)"}}>{year}</div>
  </div>;
};
YearContainer.propTypes = { year: React.PropTypes.string };


const RaceDayContainer = ({ raceDate, children }) => {
  return <div style={{width:"388px", height:"90px", boxSizing:"border-box", fontFamily: "sans-serif", margin:"2px", fontSize: "14px", backgroundColor:"#f5f5f5", float: "left"}}>
    <div style={{float:"left", width:"50px", textAlign:"center", boxSizing:"border-box", padding:"8px", fontFamily:"sans-serif"}}>
      <div style={{fontSize:"14px"}}>{ShortMonthName(raceDate).toUpperCase()}</div>
      <div style={{fontSize:"24px"}}>{DayOfMonth(raceDate)}</div>
      <div style={{fontSize:"12px", color:"#777777"}}>{Year(raceDate).toUpperCase()}</div>
    </div>
    <div style={{float:"right", width:"338px", boxSizing:"border-box", padding:"10px"}}>{children}</div>
    <div style={{clear:"both"}} />
  </div>;
};
RaceDayContainer.propTypes = { raceDate: React.PropTypes.string };

const RaceLink = (item) => {
  return <div key={item.id}>
    <Link to={"/race/" + item.id} style={{textDecoration: "none", display: "block", marginBottom: "5px"}}>{item.name}</Link>
  </div>;
};
