import React from 'react'
import xhr from './../xhr'
import Loading from './../components/Loading'
import RaceGroupAdd from './RaceGroupAdd'
import RaceGroupList from './RaceGroupList'

export default class extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
      raceGroups: null,
      isFetching: false
    };
  }
  componentDidMount() {
    this.setState({isFetching : true});
    xhr.get('/feed/racegroups').then((result) => {
      this.setState({
          raceGroups: result.raceGroups,
          isFetching: false
        });
    });
  }
  addNewRaceGroup(name, distance){
    xhr.post('/feed/racegroup', {
      "headers" : {
        "Content-Type" : "application/json"
      },
      "data" :
        {
          "name": name,
          "distance": distance
        }
      }).then((result) => {
      console.log(result);
    });
  }
  render() {

    if (this.state.isFetching){
      return <Loading />;
    }
    else if (this.state.raceGroups != null){
      return <div>
        <RaceGroupAdd addRaceGroup={this.addNewRaceGroup.bind(this)} />
        <RaceGroupList raceGroups={this.state.raceGroups} />
      </div>;
    }
    else{
      return null;
    }
  }
}
