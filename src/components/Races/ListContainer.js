import React from 'react'
import xhr from './../../xhr'
import YearComponent from './YearComponent'
import DayComponent from './DayComponent'
import LinkComponent from './LinkComponent'

export default class extends React.Component {
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

    for (var [year, raceDateMap] of raceMap) {
      racesDay.push(<YearComponent key={year} year={year} />);
      //sort the date ascending
      var mapAsc = new Map([...raceDateMap.entries()].sort());
      for (var [date, val] of mapAsc) {
        let races= val.map(LinkComponent);
        racesDay.push(<DayComponent key={date} raceDate={date}>{races}</DayComponent>)
      }
      racesDay.push(<div key={"clearFix" + year} style={{clear:"both"}}/>);
    }

    return <div>{racesDay}</div>;
  }
}
