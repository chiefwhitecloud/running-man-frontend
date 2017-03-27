import React from 'react';
import Loading from './../components/Loading';
import RaceGroupAdd from './RaceGroupAdd';
import RaceGroupList from './RaceGroupList';
import { store } from './Store';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.onStoreChange = this.onStoreChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleEnableEdit = this.handleEnableEdit.bind(this);
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
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

  handleDelete(raceGroupSelf) {
    store.deleteRaceGroup(raceGroupSelf);
  }

  handleUpdate(raceGroupSelf, name, distance, distanceUnit) {
    store.updateRaceGroup(raceGroupSelf, { name, distance, distanceUnit });
  }

  handleEnableEdit(raceGroupSelf) {
    store.enableEditRaceGroup(raceGroupSelf);
  }

  handleCancelEdit(raceGroupSelf) {
    store.cancelEditRaceGroup(raceGroupSelf);
  }

  render() {
    if (this.state.isFetching) {
      return <Loading />;
    } else if (this.state.raceGroups !== null) {
      return (<div>
        <RaceGroupAdd addRaceGroup={store.createRaceGroup} />
        <RaceGroupList
          raceGroups={this.state.raceGroups}
          onDelete={this.handleDelete}
          onUpdate={this.handleUpdate}
          onEnableEdit={this.handleEnableEdit}
          onCancelEdit={this.handleCancelEdit}
        />
      </div>);
    }
    return null;
  }
}
