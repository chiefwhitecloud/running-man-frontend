import React from 'react'
import RaceHeader from './RaceHeader'
import RacerResult from './RacerResult'
import RacerDetail from './RacerDetail'
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
    let raceMeta;
    xhr.get('/feed/racer/' + props.params.racerId).then((racer) => {
      this.racer_ = racer;
      return racer;
    }).then((race) => {
      raceMeta = race;
      return xhr.get(race["profile"]);
    }).then((racerProfile) => {
      this.racerProfile_ = racerProfile;
      return xhr.get(this.racer_["results"]);
    }).then((results) => {
      this.setState({
        racerProfile: this.racerProfile_,
        races: results["races"],
        results: results["results"],
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

    let createItem = (item) => {
      return <div key={item.raceId}>
          <RaceHeader key={item.raceId} name={this.state.races[item.raceId].name}  date={this.state.races[item.raceId].date} />
          <RacerResult key={item.raceId + item.racerId} racerResult={item} race={this.state.races[item.raceId]} />
        </div>;
    };

    if (this.state.isLoading){
      return <div>Loading</div>;
    }
    else{
      return <div>
          <RacerDetail name={this.state.racerProfile.name} />
          {this.state.results.map(createItem)}
      </div>;
    }
  }
}
