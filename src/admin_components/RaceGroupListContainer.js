import React from 'react';
import xhr from './../xhr';
import Loading from './../components/Loading';
import RaceGroupAdd from './RaceGroupAdd';
import RaceGroupList from './RaceGroupList';
import { store } from './Store';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.onStoreChange = this.onStoreChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      raceGroups: null,
      isFetching: true,
    };
  }

  componentDidMount() {
    store.fetchRaceGroups();
    store.addRaceGroupsChangeListener(this.onStoreChange);
  }

  componentWillUnmount() {
    store.removeRaceGroupsChangeListener(this.onStoreChange);
  }

  onStoreChange() {
    if (store.getRaceGroups()) {
      this.setState({
        isFetching: false,
        raceGroups: store.getRaceGroups(),
      });
    }
  }

  handleDelete(raceGroup) {
    debugger;
    console.log(raceGroup);
  }

  render() {
    if (this.state.isFetching) {
      return <Loading />;
    } else if (this.state.raceGroups !== null) {
      return (<div>
        <RaceGroupAdd addRaceGroup={store.createRaceGroup} />
        <RaceGroupList raceGroups={this.state.raceGroups} onDeleteItem={this.handleDelete} />
      </div>);
    }
    return null;
  }
}
