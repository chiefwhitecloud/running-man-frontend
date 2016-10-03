import React from 'react'
import RaceResults from './RaceResults'
import xhr from './../xhr'

export default class RacerResult extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
      race: {},
      results: [],
      isLoading: true
   };
   let raceMeta;
   xhr.get(this.props.race["results"]).then((raceResults) => {

     let racePos1 = 1;
     let racePos2 = 1;

     if (this.props.racerResult.position <= 10){
       racePos1 = 1;
       racePos2 = this.props.racerResult.position + 10;
     }
     else{
       racePos1 = this.props.racerResult.position - 10;
       racePos2 = this.props.racerResult.position + 10;
     }

     let filteredResults = raceResults["results"].filter(raceResult => raceResult.position >= racePos1 && raceResult.position <= racePos2);

     this.setState({
       results : filteredResults,
       isLoading: false
     });
   });
  }
  render() {

    if (this.state.isLoading){
      return <div>Loading</div>;
    }
    else{
      return <div>
        <RaceResults results={this.state.results} selectedRacerId={this.props.racerResult["racerId"]} />
      </div>
    }

  }
}
