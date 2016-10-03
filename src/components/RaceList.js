import React from 'react'
import xhr from './../xhr'
import { Link } from 'react-router'

export default class RaceList extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
      items: []
    };
   xhr.get('/feed/races').then((result) => {
     this.setState({
       items: result["races"]
     });
   });
  }
  render() {
    let createItem = (item) => {
      return <li key={item.id}><Link to={"/race/" + item.id}>{item.name}</Link></li>;
    };
    return <div>
      <ul>
        {this.state.items.map(createItem)}
      </ul>
    </div>;
  }
}
