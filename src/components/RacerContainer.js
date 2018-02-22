import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import RacerResult from './RacerResult';
import RacerDetail from './RacerDetail';
import ExpandButton from './ExpandButton';
import { GetPace } from './../RaceTimeConverter';
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
    getRacer(props.match.params.racerId).then((racer) => {
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
          foundResult.pace = GetPace(foundResult.time, raceGroupItem.raceGroup['distance']);
          const expandedItem = this.state.expandedResults.find(expandedId => expandedId === race.id);

          races.push(
            <tr className="rrtable__row" key={race.id}>
              <td className="rrtable__cell">{race.date}</td>
              <td className="rrtable__cell"><Link to={`/race/${race.id}`}>{race.name}</Link></td>
              <td className="rrtable__cell">{foundResult.position}</td>
              <td className="rrtable__cell">{foundResult.time}</td>
              <td className="rrtable__cell">{foundResult.pace}</td>
              <td className="rrtable__cell" style={{ textAlign: 'right' }}>
                <ExpandButton handleClick={this.handleRaceResultExpanded} raceId={race.id} />
              </td>
            </tr>);

          if (expandedItem !== undefined) {
            races.push(
              <tr key={`expanded${race.id}`}>
                <td className="rrtable__cell" colSpan="6">
                  <RacerResult racerResult={foundResult} race={race} />
                </td>
              </tr>);
          }
        });

        raceGroups.push(
          <tr className="rrtable__row" key={`raceGroup-${raceGroupItem.raceGroup.id}`}>
            <td className="rrtable__cell rrtable__cell--race-group-name" colSpan="6">{raceGroupItem.raceGroup.name}</td>
          </tr>);

        raceGroups.push(
          <tr className="rrtable__row" key={`raceGroupHeader-${raceGroupItem.raceGroup.id}`}>
            <td className="rrtable__header">Date</td>
            <td className="rrtable__header">Race Name</td>
            <td className="rrtable__header">Place</td>
            <td className="rrtable__header">Time</td>
            <td className="rrtable__header">Pace</td>
            <td className="rrtable__header">&nbsp;</td>
          </tr>);

        races.map(race => raceGroups.push(race));
      });
    }

    if (this.state.isLoading) {
      return <div>Loading</div>;
    }

    return (<div>
      <RacerDetail name={this.state.racerProfile.name} />
      <table className="rrtable rrtable--racer-results">
        <tbody>
          {raceGroups}
        </tbody>
      </table>
    </div>);
  }
}

RacerContainer.contextTypes = {
  router: PropTypes.object.isRequired,
};
