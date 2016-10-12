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

   let querystringStartPos = 1;

   if (this.props.racerResult.position <= 10){
     querystringStartPos = 1;
   }
   else{
     querystringStartPos = this.props.racerResult.position - 10;
   }

   xhr.get(this.props.race["results"] + "?startPos=" + querystringStartPos + "&num=" + 20).then((raceResults) => {

     this.setState({
       results : raceResults["results"],
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
