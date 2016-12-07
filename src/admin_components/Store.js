import xhr from './../xhr'
import {EventEmitter} from 'events';

class Store extends EventEmitter {
  constructor(props) {
    super(props);
    this._state = {
      raceGroups : [],
      races : []
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

  addRaceToRaceGroup(raceGroupSelf, raceId){
    const raceGroup = this._state.raceGroups.find(raceGroup => raceGroup.self == raceGroupSelf);
    xhr.post(raceGroup["races"], {
        "headers" : {
          "Content-Type" : "application/json"
        },
        "data" : {
          "raceId": raceId.toString()
        }
      }).then((result) => {
        if (result["success"]){
          this.fetchRaces();
        }
    });
  }

  fetchRaceGroups(){
    xhr.get('/feed/racegroups').then((result) => {
      this._state.raceGroups = result["raceGroups"];
      this.emitRaceGroupsChange();
    });
  }

  fetchRaces(){
    xhr.get('/feed/races').then((result) => {
      this._state.races = result["races"];
      this.emitRacesChange();
    });
  }

  getRaces(){
    return this._state.races;
  }

  getRaceGroups(){
    return this._state.raceGroups;
  }
}

export let store = new Store();
