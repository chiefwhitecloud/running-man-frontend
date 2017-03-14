import React from 'react';
import Loading from './../components/Loading';
import RaceList from './RaceList';
import FilterComponent from './RaceListFilterComponent';
import { GetRaceMapByYear } from './../RaceFeedConverter';
import { store } from './Store';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.onStoreChange = this.onStoreChange.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.state = {
      races: null,
      raceGroups: null,
      isFetching: true,
      filter: 'all',
    };
  }
  componentDidMount() {
    store.fetchRaces();
    store.fetchRaceGroups();
    store.addRacesChangeListener(this.onStoreChange);
    store.addRaceGroupsChangeListener(this.onStoreChange);
  }

  componentWillUnmount() {
    store.removeRacesChangeListener(this.onStoreChange);
    store.removeRaceGroupsChangeListener(this.onStoreChange);
  }

  onStoreChange() {
    if (store.getRaces() && store.getRaceGroups()) {
      this.setState({
        isFetching: false,
        races: store.getRaces(),
        raceGroups: store.getRaceGroups(),
      });
    }
  }

  onRaceGroupChange(raceGroupSelf, raceId) {
    store.addRaceToRaceGroup(raceGroupSelf, raceId);
  }

  onFilterChange(filter) {
    this.setState({
      filter,
    });
  }

  onRaceDelete(raceSelf) {
    store.deleteRace(raceSelf);
  }

  render() {
    if (this.state.isFetching) {
      return <Loading />;
    } else if (this.state.races != null && this.state.raceGroups != null) {
      const mapByYears = GetRaceMapByYear(this.state.races);

      let races = this.state.races;

      if (this.state.filter === 'noracegroup') {
        races = races.filter(race => race.raceGroup === undefined);
      } else if (this.state.filter.startsWith('year-')) {
        const year = this.state.filter.substr(-4);
        races = races.filter(race => race.date.startsWith(year));
      }

      return (<div>
        <FilterComponent years={[...mapByYears.keys()]} onSelectionChange={this.onFilterChange} />
        <RaceList
          races={races}
          raceGroups={this.state.raceGroups}
          onRaceGroupChange={this.onRaceGroupChange}
          onRaceDelete={this.onRaceDelete}
        />
      </div>);
    }
    return null;
  }
}
