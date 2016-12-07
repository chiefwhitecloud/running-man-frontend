import React from 'react'
import Loading from './../components/Loading'
import RaceList from './RaceList'
import { store } from './Store'

export default class extends React.Component {
  constructor(props) {
   super(props);
   this._onStoreChange = this._onStoreChange.bind(this);
   this.state = {
      races: null,
      raceGroups : null,
      isFetching: false
    };
  }
  componentDidMount() {
    this.setState({isFetching : true});
    store.fetchRaces();
    store.fetchRaceGroups();
    store.addRacesChangeListener(this._onStoreChange);
    store.addRaceGroupsChangeListener(this._onStoreChange);
  }

  componentWillUnmount() {
    store.removeRacesChangeListener(this._onStoreChange);
    store.removeRaceGroupsChangeListener(this._onStoreChange);
  }

  _onStoreChange() {
    if (store.getRaces() && store.getRaceGroups()){
      this.setState({
        isFetching : false,
        races : store.getRaces(),
        raceGroups : store.getRaceGroups()
      });
    }
  }

  _onRaceGroupSelectionChange(raceGroupSelf, raceId){
    store.addRaceToRaceGroup(raceGroupSelf, raceId)
  }

  render() {
    if (this.state.isFetching){
      return <Loading />;
    }
    else if (this.state.races != null && this.state.raceGroups != null){
      return <div>
        <RaceList races={this.state.races} raceGroups={this.state.raceGroups} onRaceGroupSelectionChange={this._onRaceGroupSelectionChange} />
      </div>;
    }
    else{
      return null;
    }
  }
}
