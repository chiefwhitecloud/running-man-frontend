import React from 'react'
import xhr from './../../xhr'
import YearComponent from './YearComponent'
import DayComponent from './DayComponent'
import LinkComponent from './LinkComponent'
import { GetRaceMapByYear } from './../../RaceFeedConverter'
import Loading from './../Loading'

let raceMapCached = null;

export default class extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
      raceMap: new Map(),
      isFetching: false
    };
  }
  componentDidMount() {
    this.setState({isFetching : true});
    if (raceMapCached != null){
      this.setState({
        raceMap: raceMapCached,
        isFetching: false
      });
    }
    else{
      xhr.get('/feed/races').then((result) => {
        raceMapCached = GetRaceMapByYear(result["races"]);
        this.setState({
          raceMap: raceMapCached,
          isFetching: false
        });
      });
    }
  }
  render() {

    if (this.state.isFetching){
      return <Loading />;
    }
    else if (this.state.raceMap.size > 0){
      let racesDay = [];

      for (var [year, raceDateMap] of this.state.raceMap) {
        racesDay.push(<YearComponent key={year} year={year} />);
        //sort the date ascending
        var mapAsc = new Map([...raceDateMap.entries()].sort());
        for (var [date, val] of mapAsc) {
          let races = val.map(LinkComponent);
          racesDay.push(<DayComponent key={date} raceDate={date}>{races}</DayComponent>)
        }
        racesDay.push(<div key={"clearFix" + year} style={{clear:"both"}}/>);
      }
      return <div>{racesDay}</div>;
    }
    else{
      return <div>No race items</div>
    }
  }
}
