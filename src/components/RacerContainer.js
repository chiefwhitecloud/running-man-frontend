import React from 'react';
import RaceHeader from './RaceHeader';
import RacerResult from './RacerResult';
import RacerDetail from './RacerDetail';
import { getRacer, doRequests, getRaceGroups } from './FetchData';
import { GetRacesSortedRaceGroup, GetRaceMapByYear } from './../RaceFeedConverter';

export default class RacerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.racer = {};
    this.racerProfile = {};
    this.handleRaceResultExpanded = this.handleRaceResultExpanded.bind(this);
    this.state = {
      racer: {},
      results: [],
      isLoading: true,
      expandedResults: [],
    };
  }

  componentDidMount() {
    this.doRaceFetching(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.racerId !== this.props.params.racerId) {
      this.setState({
        isLoading: true,
        expandedResults: [],
      });
      this.doRaceFetching(nextProps);
    }
  }

  handleRaceResultExpanded(raceId) {
    if (this.state.expandedResults.includes(raceId)) {
      const expanded = this.state.expandedResults.filter(item => item !== raceId);
      this.setState({
        expandedResults: expanded,
      });
    } else {
      const expanded = this.state.expandedResults;
      expanded.push(raceId);
      this.setState({
        expandedResults: expanded,
      });
    }
  }

  doRaceFetching(props) {
    getRacer(props.params.racerId).then((racer) => {
      this.racer = racer;
      return racer;
    })
    .then(racer => doRequests([racer.profile, racer.results, getRaceGroups]))
    .then((results) => {
      const [racerProfile, racerResults, raceGroupList] = results;

      const raceItems = Object.keys(racerResults.races).map(k => racerResults.races[k]);

      const raceGroups = GetRacesSortedRaceGroup(raceGroupList.raceGroups, raceItems);

      this.setState({
        racerProfile: racerProfile,
        races: racerResults.races,
        results: racerResults.results,
        raceGroups: raceGroups,
        isLoading: false,
      });
    });
  }

  render() {
    const raceGroups = [];

    if (this.state.raceGroups) {
      this.state.raceGroups.forEach((raceGroupItem) => {
        const races = [];
        raceGroupItem.races.forEach((race) => {
          const foundResult = this.state.results.find(result => result.raceId === race.id);
          const expandedItem = this.state.expandedResults.find(expandedId => expandedId === race.id);

          races.push(
            <tr key={race.id}>
              <td>{race.date}</td>
              <td>{race.name}</td>
              <td>{foundResult.position}</td>
              <td>{foundResult.time}</td>
              <td style={{ textAlign: 'right' }}>
                <button onClick={() => this.handleRaceResultExpanded(race.id)}>
                  { expandedItem === undefined ? 'Show Details' : 'Hide Details' }
                </button>
              </td>
            </tr>);

          if (expandedItem !== undefined) {
            races.push(
              <tr key={`expanded${race.id}`}>
                <td colSpan="5">
                  <RacerResult racerResult={foundResult} race={race} />
                </td>
              </tr>);
          }
        });

        raceGroups.push(
          <div key={raceGroupItem.raceGroup.id}>
            <div>{raceGroupItem.raceGroup.name}</div>
            <table style={{ width: '100%' }}>
              <tbody>
                {races}
              </tbody>
            </table>
          </div>);
      });
    }

    if (this.state.isLoading) {
      return <div>Loading</div>;
    }

    return (<div style={{ fontFamily: 'monospace', fontSize: '14px' }}>
      <RacerDetail name={this.state.racerProfile.name} />
      {raceGroups}
    </div>);
  }
}
