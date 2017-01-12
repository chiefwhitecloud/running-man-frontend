import React from 'react'
import RaceHeader from './RaceHeader'
import RacerResult from './RacerResult'
import RacerDetail from './RacerDetail'
import { getRacer, doRequests, getRaceGroups } from './FetchData'
import { GetRacesSortedRaceGroup, GetRaceMapByYear } from './../RaceFeedConverter'
import xhr from './../xhr'

export default class Racer extends React.Component {
  constructor(props) {
   super(props);
   this.racer_ = {};
   this.racerProfile_ = {};
   this.state = {
      racer: {},
      results: [],
      isLoading: true
   };
   this.doRaceFecthing_(this.props);
  }
  doRaceFecthing_(props){
    getRacer(props.params.racerId).then((racer) => {
      this.racer_ = racer;
      return racer;
    }).then((racer) => {
      return doRequests([racer["profile"], racer["results"], getRaceGroups]);
    }).then((results) => {
      let [racerProfile, racerResults, raceGroupList] = results;

      //convert from object to array.
      let raceItems = Object.keys(racerResults["races"]).map((k) => racerResults["races"][k]);

      let raceGroups = GetRacesSortedRaceGroup(raceGroupList["raceGroups"], raceItems);

      this.setState({
        racerProfile: racerProfile,
        races: racerResults["races"],
        results: racerResults["results"],
        raceGroups: raceGroups,
        isLoading: false
      })
    });
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.params.racerId != this.props.params.racerId){
      this.setState({
        isLoading: true
      });
      this.doRaceFecthing_(nextProps);
    }
  }
  render() {

    let raceGroups = [];

    if (this.state.raceGroups){
      for (var [raceGroupId, raceGroup] of this.state.raceGroups) {
        let races = raceGroup.races.map((race) => {
          let result = this.state.results.find(function(result){
            return result["raceId"] == race["id"];
          });
          return <div key={race["id"]}>{race["date"]} {race["name"]} {result["position"]} {result["time"]}</div>
        });
        raceGroups.push(<div key={raceGroupId}>
          <div>{raceGroup.raceGroup["name"]} {raceGroup.raceGroup["distance"]}</div>
          {races}
        </div>);
      }
    }

    if (this.state.isLoading){
      return <div>Loading</div>;
    }
    else{
      return <div>
          <RacerDetail name={this.state.racerProfile.name} />
          {raceGroups}
      </div>;
    }
  }
}
