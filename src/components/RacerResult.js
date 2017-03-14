import React from 'react';
import RaceResultsTable from './RaceResultsTable';
import xhr from './../xhr';

export default class RacerResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      race: {},
      results: [],
      isLoading: true,
    };

    let querystringStartPos = 1;

    if (this.props.racerResult.position <= 10) {
      querystringStartPos = 1;
    } else {
      querystringStartPos = this.props.racerResult.position - 10;
    }

    xhr.get(this.props.race["results"] + `?startPos=${querystringStartPos}&num=20`).then((raceResults) => {
      this.setState({
        results: raceResults["results"],
        isLoading: false,
      });
    });
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading</div>;
    }

    return (
      <div>
        <RaceResultsTable results={this.state.results} selectedRacerId={this.props.racerResult["racerId"]} />
      </div>
    );
  }
}
