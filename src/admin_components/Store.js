import { EventEmitter } from 'events';
import xhr from './../xhr';


class Store extends EventEmitter {
  constructor() {
    super();
    this.state = {
      raceGroups: [],
      races: [],
    };
  }

  addRacesChangeListener(callback) {
    this.on('races-change', callback);
  }

  removeRacesChangeListener(callback) {
    this.removeListener('races-change', callback);
  }

  addRaceGroupsChangeListener(callback) {
    this.on('racegroups-change', callback);
  }

  removeRaceGroupsChangeListener(callback) {
    this.removeListener('racegroups-change', callback);
  }

  emitRacesChange() {
    this.emit('races-change');
  }

  emitRaceGroupsChange() {
    this.emit('racegroups-change');
  }

  createRaceGroup(name, distance) {
    xhr.post('/feed/racegroup', {
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        name: name,
        distance: distance
      }
    }).then(() => {
        store.fetchRaceGroups();
    });
  }

  addRaceToRaceGroup(raceGroupSelf, raceId) {
    const foundRaceGroup = this.state.raceGroups.find(raceGroup =>
      raceGroup.self === raceGroupSelf);
    xhr.post(foundRaceGroup["races"], {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        raceId: raceId.toString(),
      },
    }, undefined, 200).then((result) => {
      if (result["success"]) {
        this.fetchRaces();
      }
    });
  }

  deleteRaceGroup(raceGroupSelf) {
    xhr.delete(raceGroupSelf).then(() => {
      this.fetchRaceGroups();
    });
  }

  deleteRace(raceSelf) {
    xhr.delete(raceSelf).then(() => {
      this.fetchRaces();
    });
  }

  fetchRaceGroups() {
    xhr.get('/feed/racegroups').then((result) => {
      this.state.raceGroups = result['raceGroups'];
      this.emitRaceGroupsChange();
    });
  }

  fetchRaces() {
    xhr.get('/feed/races').then((result) => {
      this.state.races = result['races'];
      this.emitRacesChange();
    });
  }

  getRaces() {
    return this.state.races;
  }

  getRaceGroups() {
    return this.state.raceGroups;
  }
}

export const store = new Store();
