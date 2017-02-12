import React from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.handleRaceGroupChange = this.handleRaceGroupChange.bind(this);
    this.handleRaceDelete = this.handleRaceDelete.bind(this);
  }

  handleRaceGroupChange(event) {
    event.preventDefault();
    this.props.onRaceGroupChange(event.target.value, this.props.race.id);
  }

  handleRaceDelete(event) {
    event.preventDefault();
    this.props.onRaceDelete(this.props.race.self);
  }

  render() {

    let selectedValue;
    if (this.props.race.raceGroup){
      selectedValue = this.props.race.raceGroup;
    }
    return (
      <tr>
        <td style={{ width: '10%' }}>{this.props.race.date}</td>
        <td style={{ width: '60%' }}>{this.props.race.name}</td>
        <td style={{ width: '20%' }}>
          <form>
            <label>
              <select onChange={this.handleRaceGroupChange} value={selectedValue}>
                <option key="notfound" ></option>
                {this.props.raceGroups.map(function(raceGroup){
                  return <option value={raceGroup.self} key={raceGroup.id} >{raceGroup["name"]} - {raceGroup["distance"]}</option>
                })}
              </select>
            </label>
          </form>
        </td>
        <td style={{ width: '10%' }}><button onClick={this.handleRaceDelete}>Delete</button></td>
      </tr>
    );
  }
}
