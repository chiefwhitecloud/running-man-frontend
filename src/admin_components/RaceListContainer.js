import React from 'react';
import Loading from './../components/Loading';
import RaceList from './RaceList';
import { store } from './Store';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.onStoreChange = this.onStoreChange.bind(this);
    this.state = {
      races: null,
      raceGroups: null,
      isFetching: true,
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

  onRaceGroupSelectionChange(raceGroupSelf, raceId) {
    store.addRaceToRaceGroup(raceGroupSelf, raceId);
  }

  render() {
    if (this.state.isFetching) {
      return <Loading />;
    } else if (this.state.races != null && this.state.raceGroups != null) {
      return (<div>
        <RaceList
          races={this.state.races}
          raceGroups={this.state.raceGroups}
          onRaceGroupSelectionChange={this.onRaceGroupSelectionChange}
        />
      </div>);
    }
    return null;
  }
}
